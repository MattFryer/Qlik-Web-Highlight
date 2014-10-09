var hljs = new function() {

  /* Utility functions */

  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index == 0;
  }

  function blockLanguage(block) {
    var classes = (block.className + ' ' + (block.parentNode ? block.parentNode.className : '')).split(/\s+/);
    classes = classes.map(function(c) {return c.replace(/^lang(uage)?-/, '');});
    return classes.filter(function(c) {return getLanguage(c) || /no(-?)highlight/.test(c);})[0];
  }

  function inherit(parent, obj) {
    var result = {};
    for (var key in parent)
      result[key] = parent[key];
    if (obj)
      for (var key in obj)
        result[key] = obj[key];
    return result;
  };

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == 3)
          offset += child.nodeValue.length;
        else if (child.nodeType == 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset != highlighted[0].offset) {
        return (original[0].offset < highlighted[0].offset) ? original : highlighted;
      }

      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:

      if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;

      ... which is collapsed to:
      */
      return highlighted[0].event == 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {return ' ' + a.nodeName + '="' + escape(a.value) + '"';}
      result += '<' + tag(node) + Array.prototype.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event == 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substr(processed, stream[0].offset - processed));
      processed = stream[0].offset;
      if (stream == original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream == original && stream.length && stream[0].offset == processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event == 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }

  /* Initialization */

  function compileLanguage(language) {

    function reStr(re) {
        return (re && re.source) || re;
    }

    function langRe(value, global) {
      return RegExp(
        reStr(value),
        'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
      );
    }

    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;

      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords) {
        var compiled_keywords = {};

        var flatten = function(className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }
          str.split(' ').forEach(function(kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
          });
        };

        if (typeof mode.keywords == 'string') { // string
          flatten('keyword', mode.keywords);
        } else {
          Object.keys(mode.keywords).forEach(function (className) {
            flatten(className, mode.keywords[className]);
          });
        }
        mode.keywords = compiled_keywords;
      }
      mode.lexemesRe = langRe(mode.lexemes || /\b[A-Za-z0-9_]+\b/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin)
          mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (!mode.end && !mode.endsWithParent)
          mode.end = /\B|\b/;
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance === undefined)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      var expanded_contains = [];
      mode.contains.forEach(function(c) {
        if (c.variants) {
          c.variants.forEach(function(v) {expanded_contains.push(inherit(c, v));});
        } else {
          expanded_contains.push(c == 'self' ? mode : c);
        }
      });
      mode.contains = expanded_contains;
      mode.contains.forEach(function(c) {compileMode(c, mode);});

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      var terminators =
        mode.contains.map(function(c) {
          return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
        })
        .concat([mode.terminator_end, mode.illegal])
        .map(reStr)
        .filter(Boolean);
      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function(s) {return null;}};
    }

    compileMode(language);
  }

  /*
  Core highlighting function. Accepts a language name, or an alias, and a
  string with the code to highlight. Returns an object with the following
  properties:

  - relevance (int)
  - value (an HTML string with highlighting markup)

  */
  function highlight(name, value, ignore_illegals, continuation) {

    function subMode(lexeme, mode) {
      for (var i = 0; i < mode.contains.length; i++) {
        if (testRe(mode.contains[i].beginRe, lexeme)) {
          return mode.contains[i];
        }
      }
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function isIllegal(lexeme, mode) {
      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan    = '<span class="' + classPrefix,
          closeSpan   = leaveOpen ? '' : '</span>';

      openSpan += classname + '">';

      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      if (!top.keywords)
        return escape(mode_buffer);
      var result = '';
      var last_index = 0;
      top.lexemesRe.lastIndex = 0;
      var match = top.lexemesRe.exec(mode_buffer);
      while (match) {
        result += escape(mode_buffer.substr(last_index, match.index - last_index));
        var keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      if (top.subLanguage && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }
      var result = top.subLanguage ? highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) : highlightAuto(mode_buffer);
      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Usecase in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (top.subLanguageMode == 'continuous') {
        continuations[top.subLanguage] = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      return top.subLanguage !== undefined ? processSubLanguage() : processKeywords();
    }

    function startNewMode(mode, lexeme) {
      var markup = mode.className? buildSpan(mode.className, '', true): '';
      if (mode.returnBegin) {
        result += markup;
        mode_buffer = '';
      } else if (mode.excludeBegin) {
        result += escape(lexeme) + markup;
        mode_buffer = '';
      } else {
        result += markup;
        mode_buffer = lexeme;
      }
      top = Object.create(mode, {parent: {value: top}});
    }

    function processLexeme(buffer, lexeme) {

      mode_buffer += buffer;
      if (lexeme === undefined) {
        result += processBuffer();
        return 0;
      }

      var new_mode = subMode(lexeme, top);
      if (new_mode) {
        result += processBuffer();
        startNewMode(new_mode, lexeme);
        return new_mode.returnBegin ? 0 : lexeme.length;
      }

      var end_mode = endOfMode(top, lexeme);
      if (end_mode) {
        var origin = top;
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexeme;
        }
        result += processBuffer();
        do {
          if (top.className) {
            result += '</span>';
          }
          relevance += top.relevance;
          top = top.parent;
        } while (top != end_mode.parent);
        if (origin.excludeEnd) {
          result += escape(lexeme);
        }
        mode_buffer = '';
        if (end_mode.starts) {
          startNewMode(end_mode.starts, '');
        }
        return origin.returnEnd ? 0 : lexeme.length;
      }

      if (isIllegal(lexeme, top))
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');

      /*
      Parser should not reach this point as all types of lexemes should be caught
      earlier, but if it does due to some bug make sure it advances at least one
      character forward to prevent infinite looping.
      */
      mode_buffer += lexeme;
      return lexeme.length || 1;
    }

    var language = getLanguage(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '';
    for(var current = top; current != language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match, count, index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match)
          break;
        count = processLexeme(value.substr(index, match.index - index), match[0]);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      for(var current = top; current.parent; current = current.parent) { // close dangling modes
        if (current.className) {
          result += '</span>';
        }
      };
      return {
        relevance: relevance,
        value: result,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message.indexOf('Illegal') != -1) {
        return {
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.forEach(function(name) {
      if (!getLanguage(name)) {
        return;
      }
      var current = highlight(name, text, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value) {
    if (options.tabReplace) {
      value = value.replace(/^((<[^>]+>|\t)+)/gm, function(match, p1, offset, s) {
        return p1.replace(/\t/g, options.tabReplace);
      });
    }
    if (options.useBR) {
      value = value.replace(/\n/g, '<br>');
    }
    return value;
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result   = [prevClassName.trim()];

    if (!prevClassName.match(/(\s|^)hljs(\s|$)/)) {
      result.push('hljs');
    }

    if (language) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var language = blockLanguage(block);
    if (/no(-?)highlight/.test(language))
        return;

    var node;
    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    var text = node.textContent;
    var result = language ? highlight(language, text, true) : highlightAuto(text);

    var originalStream = nodeStream(node);
    if (originalStream.length) {
      var resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  /*
  Updates highlight.js global options with values passed in the form of an object
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    Array.prototype.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }

  var languages = {};
  var aliases = {};

  function registerLanguage(name, language) {
    var lang = languages[name] = language(this);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }

  function listLanguages() {
    return Object.keys(languages);
  }

  function getLanguage(name) {
    return languages[name] || languages[aliases[name]];
  }

  /* Interface definition */

  this.highlight = highlight;
  this.highlightAuto = highlightAuto;
  this.fixMarkup = fixMarkup;
  this.highlightBlock = highlightBlock;
  this.configure = configure;
  this.initHighlighting = initHighlighting;
  this.initHighlightingOnLoad = initHighlightingOnLoad;
  this.registerLanguage = registerLanguage;
  this.listLanguages = listLanguages;
  this.getLanguage = getLanguage;
  this.inherit = inherit;

  // Common regexps
  this.IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
  this.UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';
  this.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  this.C_NUMBER_RE = '(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
  this.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
  this.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  this.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
  };
  this.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [this.BACKSLASH_ESCAPE]
  };
  this.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [this.BACKSLASH_ESCAPE]
  };
  this.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
  };
  this.C_LINE_COMMENT_MODE = {
    className: 'comment',
    begin: '//', end: '$',
    contains: [this.PHRASAL_WORDS_MODE]
  };
  this.C_BLOCK_COMMENT_MODE = {
    className: 'comment',
    begin: '/\\*', end: '\\*/',
    contains: [this.PHRASAL_WORDS_MODE]
  };
  this.HASH_COMMENT_MODE = {
    className: 'comment',
    begin: '#', end: '$',
    contains: [this.PHRASAL_WORDS_MODE]
  };
  this.NUMBER_MODE = {
    className: 'number',
    begin: this.NUMBER_RE,
    relevance: 0
  };
  this.C_NUMBER_MODE = {
    className: 'number',
    begin: this.C_NUMBER_RE,
    relevance: 0
  };
  this.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: this.BINARY_NUMBER_RE,
    relevance: 0
  };
  this.CSS_NUMBER_MODE = {
    className: 'number',
    begin: this.NUMBER_RE + '(' +
      '%|em|ex|ch|rem'  +
      '|vw|vh|vmin|vmax' +
      '|cm|mm|in|pt|pc|px' +
      '|deg|grad|rad|turn' +
      '|s|ms' +
      '|Hz|kHz' +
      '|dpi|dpcm|dppx' +
      ')?',
    relevance: 0
  };
  this.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      this.BACKSLASH_ESCAPE,
      {
        begin: /\[/, end: /\]/,
        relevance: 0,
        contains: [this.BACKSLASH_ESCAPE]
      }
    ]
  };
  this.TITLE_MODE = {
    className: 'title',
    begin: this.IDENT_RE,
    relevance: 0
  };
  this.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: this.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
}();

hljs.registerLanguage('javascript', function(hljs) {
  return {
    aliases: ['js'],
    keywords: {
      keyword:
        'in if for while finally var new function do return void else break catch ' +
        'instanceof with throw case default try this switch continue typeof delete ' +
        'let yield const class',
      literal:
        'true false null undefined NaN Infinity',
      built_in:
        'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
        'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
        'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
        'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
        'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
        'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
        'module console window document'
    },
    contains: [
      {
        className: 'pi',
        begin: /^\s*('|")use strict('|")/,
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          { // E4X
            begin: /</, end: />;/,
            relevance: 0,
            subLanguage: 'xml'
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /\{/, excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ],
            illegal: /["'\(]/
          }
        ],
        illegal: /\[|%/
      },
      {
        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      },
      {
        begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
      }
    ]
  };
});

hljs.registerLanguage('qlikview-expression', function(hljs) {
  var QV_EXP_KEYWORDS = {
    keyword: 'All Total Distinct',
	
    built_in: 'Acos Addmonths Addyears Age Alt Applycodepage Applymap Argb Asin Atan Atan2 Attribute Author Autonumber ' +
		'Autonumberhash128 Autonumberhash256 Avg ' +
		'Bitcount Black Blackandschole Blue Brown ' +
		'Capitalize Ceil Chi2test_chi2 Chi2test_df Chi2test_p Chidist Chiinv Chr Class Clientplatform Color ' +
		'Colormaphue Colormapjet Colormix1 Colormix2 Combin Computername Concat Connectstring Converttolocaltime ' +
		'Correl Cos Cosh Count Cyan ' +
		'Darkgray Date# Date Day Dayend Daylightsaving Dayname Daynumberofquarter Daynumberofyear Daystart Div ' +
		'DocumentName DocumentPath DocumentTitle Dual ' +
		'E Evaluate Even Exists Exp ' +
		'Fabs Fact False Fdist FieldIndex FieldName FieldNumber FieldValue FieldValueCount FileBaseName FileDir ' +
		'FileExtension FileName FilePath FileSize FileTime FindOneOf Finv FirstSortedValue FirstValue FirstWorkDate ' +
		'Floor Fmod Frac Fractile Fv ' +
		'GetExtendedProperty GetFolderPath GetObjectField GetRegistryString GMT Green ' +
		'Hash128 Hash160 Hash256 Hour HSL ' +
		'if InDay InDayToTime Index InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate ' +
		'Input InputAvg InputSum InQuarter InQuarterToDate Interval Interval# InWeek InWeekToDate InYear ' +
		'InYearToDate IRR IsNull IsNum IsPartialReload IsText IterNo ' +
		'KeepChar Kurtosis ' +
		'LastValue LastWorkDate Len LightBlue LightCyan LightGray LightGreen LightMagenta LightRed LINEST_B ' +
		'LINEST_DF LINEST_F LINEST_M LINEST_R2 LINEST_SEB LINEST_SEM LINEST_SEY LINEST_SSREG LINEST_SSRESID ' +
		'LocalTime log log10 Lookup Lower LTrim LunarWeekEnd LunarWeekName LunarWeekStart ' +
		'Magenta MakeDate MakeTime MakeWeekDate MapSubString Match Max MaxString Median Mid Min MinString Minute ' +
		'MissingCount MixMatch Mod Mode Money Money# Month MonthEnd MonthName MonthsEnd MonthsName MonthsStart ' +
		'MonthStart MsgBox ' +
		'NetWorkDays NoOfFields NoOfReports NoOfRows NoOfTables NORMDIST NORMINV Now nPer NPV Null NullCount Num ' +
		'Num# NumAvg NumCount NumericCount NumMax NumMin NumSum ' +
		'Odd Only Ord OSUser ' +
		'Peek Permut Pi Pick Pmt pow Previous PurgeChar PV ' +
		'QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QvdCreateTime QvdFieldName ' +
		'QvdNoOfFields QvdNoOfRecords QvdTableName QVUser ' +
		'Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin ' +
		'RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew ' +
		'RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rate RecNo Red ReloadTime Repeat Replace ' +
		'ReportComment ReportId ReportName ReportNumber RGB Right Round RowNo RTrim ' +
		'Second SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt Stdev Sterr STEYX SubField|10 SubStringCount ' +
		'Sum SysColor ' +
		'TableName TableNumber tan tanh TDIST Text TextBetween TextCount Time Time# Timestamp Timestamp# TimeZone ' +
		'TINV Today Trim True TTest1_conf TTest1_df TTest1_dif TTest1_lower TTest1_sig TTest1_sterr TTest1_t ' +
		'TTest1_upper TTest1w_conf TTest1w_df TTest1w_dif TTest1w_lower TTest1w_sig TTest1w_sterr TTest1w_t ' +
		'TTest1w_upper TTest_conf TTest_df TTest_dif TTest_lower TTest_sig TTest_sterr TTest_t TTest_upper ' +
		'TTestw_conf TTestw_df TTestw_dif TTestw_lower TTestw_sig TTestw_sterr TTestw_t TTestw_upper ' +
		'Upper UTC ' +
		'Week WeekDay WeekEnd WeekName WeekStart WeekYear White WildMatch WildMatch5 ' +
		'XIRR XNPV ' +
		'Year Year2Date YearEnd YearName YearStart YearToDate Yellow ' +
		'ZTest_conf ZTest_dif ZTest_lower ZTest_sig ZTest_sterr ZTest_upper ZTest_z ZTestw_conf ZTestw_dif ' +
		'ZTestw_lower ZTestw_sig ZTestw_sterr ZTestw_upper ZTestw_z',
  };
  var QV_EXP_STRING_SINGLE = {
        className: 'string',
        begin: '\'', end: '\'', //Gives a string when using single quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}],
			relevance: 0
  }
  var QV_EXP_STRING_DOUBLE = {
		className: 'string',
        begin: '"', end: '"', //Gives a string when using double quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}],
			relevance: 0
  };
  var QV_EXP_VARIABLE_USE = {
	    className: 'variable',
		begin: '\\$\\(', end: '\\)', //Gives a variable when used inside $()
		illegal: '\\n',
			relevance: 10
  };
  return {
    aliases: ['qlikview-exp'],
	case_insensitive: true,
    keywords: QV_EXP_KEYWORDS, //Highlights all keywords and function names
    contains: [
      hljs.C_LINE_COMMENT_MODE, 
      hljs.C_BLOCK_COMMENT_MODE,
	  hljs.QUOTE_STRING_MODE,
	  QV_EXP_STRING_SINGLE,
	  QV_EXP_STRING_DOUBLE,
	  {
		className: 'field',
		begin: '\\[', end: '\\]', //Gives a field when using []
			relevance: 0
	  },
	  QV_EXP_VARIABLE_USE/*,
	  {
		className: 'load-statement',
        begin: '\\bload\\b', end: '\\bresident\\b',//'(\\bresident\\b|\\binline\\b|\\bfrom\\b|;\\bload\\b|;\\bsql\\b)',
        keywords: QV_KEYWORDS,
		contains: [
			hljs.C_LINE_COMMENT_MODE, //Gives a // comment
			hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
			hljs.QUOTE_STRING_MODE,
			QV_STRING_SINGLE,
			QV_STRING_DOUBLE,
			{
				className: 'field',
				begin: '\\b(\\w|\\[)', end: '(\\w|\\})\\b',
				keywords: QV_KEYWORDS
			}
		],
			relevance: 10
	  }*/
    ]
  };
});

hljs.registerLanguage('qlikview-script', function(hljs) {
  var QV_KEYWORDS = {
    keyword: 'Add Alias And As Autogenerate|10 ' +
		'Binary Buffer Bundle By ' +
		'Call Case Comment Concatenate Connect Crosstable ' +
		'Default Directory Disconnect Distinct Do Drop ' +
		'Each Else Elseif End Endif Endsub Endswitch Execute Exit ' +
		'Field Fields First For Force From ' +
		'Generic Group ' +
		'Hierarchy|10 HierarchyBelongsTo|10 ' +
		'If Image_size Info Inline Inner Inputfield|10 Intervalmatch|10 Into ' +
		'Join ' +
		'Keep ' +
		'Left Let Load Loop Loosen ' +
		'Map Mapping ' +
		'Next Noconcatenate|10 Not NullAsNull NullAsValue ' +
		'Or Outer ' +
		'Qualify ' +
		'Rename Replace Resident Right ' +
		'Sample Script Section Select Semantic Set Sleep SQL SQLColumns SQLTables SQLTypes Star Step Store Sub ' +
		'Switch ' +
		'Table Tables Tag Then To Trace ' +
		'Unless Unmap Unqualify Untag Until Using ' +
		'When Where While With',
	
    built_in: 'Acos Addmonths Addyears Age Alt Applycodepage Applymap Argb Asin Atan Atan2 Attribute Author Autonumber ' +
		'Autonumberhash128 Autonumberhash256 Avg ' +
		'Bitcount Black Blackandschole Blue Brown ' +
		'Capitalize Ceil Chi2test_chi2 Chi2test_df Chi2test_p Chidist Chiinv Chr Class Clientplatform Color ' +
		'Colormaphue Colormapjet Colormix1 Colormix2 Combin Computername Concat Connectstring Converttolocaltime ' +
		'Correl Cos Cosh Count Cyan ' +
		'Darkgray Date# Date Day Dayend Daylightsaving Dayname Daynumberofquarter Daynumberofyear Daystart Div ' +
		'DocumentName DocumentPath DocumentTitle Dual ' +
		'E Evaluate Even Exists Exp ' +
		'Fabs Fact False Fdist FieldIndex FieldName FieldNumber FieldValue FieldValueCount FileBaseName FileDir ' +
		'FileExtension FileName FilePath FileSize FileTime FindOneOf Finv FirstSortedValue FirstValue FirstWorkDate ' +
		'Floor Fmod Frac Fractile Fv ' +
		'GetExtendedProperty GetFolderPath GetObjectField GetRegistryString GMT Green ' +
		'Hash128 Hash160 Hash256 Hour HSL ' +
		'if InDay InDayToTime Index InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate ' +
		'Input InputAvg InputSum InQuarter InQuarterToDate Interval Interval# InWeek InWeekToDate InYear ' +
		'InYearToDate IRR IsNull IsNum IsPartialReload IsText IterNo ' +
		'KeepChar Kurtosis ' +
		'LastValue LastWorkDate Len LightBlue LightCyan LightGray LightGreen LightMagenta LightRed LINEST_B ' +
		'LINEST_DF LINEST_F LINEST_M LINEST_R2 LINEST_SEB LINEST_SEM LINEST_SEY LINEST_SSREG LINEST_SSRESID ' +
		'LocalTime log log10 Lookup Lower LTrim LunarWeekEnd LunarWeekName LunarWeekStart ' +
		'Magenta MakeDate MakeTime MakeWeekDate MapSubString Match Max MaxString Median Mid Min MinString Minute ' +
		'MissingCount MixMatch Mod Mode Money Money# Month MonthEnd MonthName MonthsEnd MonthsName MonthsStart ' +
		'MonthStart MsgBox ' +
		'NetWorkDays NoOfFields NoOfReports NoOfRows NoOfTables NORMDIST NORMINV Now nPer NPV Null NullCount Num ' +
		'Num# NumAvg NumCount NumericCount NumMax NumMin NumSum ' +
		'Odd Only Ord OSUser ' +
		'Peek Permut Pi Pick Pmt pow Previous PurgeChar PV ' +
		'QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QvdCreateTime QvdFieldName ' +
		'QvdNoOfFields QvdNoOfRecords QvdTableName QVUser ' +
		'Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin ' +
		'RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew ' +
		'RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rate RecNo Red ReloadTime Repeat Replace ' +
		'ReportComment ReportId ReportName ReportNumber RGB Right Round RowNo RTrim ' +
		'Second SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt Stdev Sterr STEYX SubField|10 SubStringCount ' +
		'Sum SysColor ' +
		'TableName TableNumber tan tanh TDIST Text TextBetween TextCount Time Time# Timestamp Timestamp# TimeZone ' +
		'TINV Today Trim True TTest1_conf TTest1_df TTest1_dif TTest1_lower TTest1_sig TTest1_sterr TTest1_t ' +
		'TTest1_upper TTest1w_conf TTest1w_df TTest1w_dif TTest1w_lower TTest1w_sig TTest1w_sterr TTest1w_t ' +
		'TTest1w_upper TTest_conf TTest_df TTest_dif TTest_lower TTest_sig TTest_sterr TTest_t TTest_upper ' +
		'TTestw_conf TTestw_df TTestw_dif TTestw_lower TTestw_sig TTestw_sterr TTestw_t TTestw_upper ' +
		'Upper UTC ' +
		'Week WeekDay WeekEnd WeekName WeekStart WeekYear White WildMatch WildMatch5 ' +
		'XIRR XNPV ' +
		'Year Year2Date YearEnd YearName YearStart YearToDate Yellow ' +
		'ZTest_conf ZTest_dif ZTest_lower ZTest_sig ZTest_sterr ZTest_upper ZTest_z ZTestw_conf ZTestw_dif ' +
		'ZTestw_lower ZTestw_sig ZTestw_sterr ZTestw_upper ZTestw_z',
  };
  var QV_STRING_SINGLE = {
        className: 'string',
        begin: '\'', end: '\'', //Gives a string when using single quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}],
			relevance: 0
  }
  var QV_STRING_DOUBLE = {
		className: 'string',
        begin: '"', end: '"', //Gives a string when using double quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}],
			relevance: 0
  };
  var QV_REM_COMMENT = {
		className: 'comment',
		begin: '\^rem\\b', end: ';', //Gives a REM comment. Correctly matches when it is at the start of a line only.
			relevance: 10
  };
  var QV_VARIABLE_DEF = {
	    className: 'variable',
		begin: '\\b(let|set)\\b', end: '\\w+', //Gives a variable definition when using SET or LET
		keywords: 'set let',
		illegal: '\\n',
			relevance: 0
  };
  var QV_VARIABLE_USE = {
	    className: 'variable',
		begin: '\\$\\(', end: '\\)', //Gives a variable when used inside $()
		illegal: '\\n',
			relevance: 10
  };
  return {
    aliases: ['qvs','qlikview'],
	case_insensitive: true,
    keywords: QV_KEYWORDS, //Highlights all keywords and function names
    contains: [
      hljs.C_LINE_COMMENT_MODE, 
      hljs.C_BLOCK_COMMENT_MODE,
	  hljs.QUOTE_STRING_MODE,
	  QV_STRING_SINGLE,
	  QV_STRING_DOUBLE,
	  QV_REM_COMMENT,
	  {
		className: 'field',
		begin: '\\[', end: '\\]', //Gives a field when using []
			relevance: 0
	  },
	  QV_VARIABLE_DEF,
	  QV_VARIABLE_USE/*,
	  {
		className: 'load-statement',
        begin: '\\bload\\b', end: '\\bresident\\b',//'(\\bresident\\b|\\binline\\b|\\bfrom\\b|;\\bload\\b|;\\bsql\\b)',
        keywords: QV_KEYWORDS,
		contains: [
			hljs.C_LINE_COMMENT_MODE, //Gives a // comment
			hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
			hljs.QUOTE_STRING_MODE,
			QV_STRING_SINGLE,
			QV_STRING_DOUBLE,
			{
				className: 'field',
				begin: '\\b(\\w|\\[)', end: '(\\w|\\})\\b',
				keywords: QV_KEYWORDS
			}
		],
			relevance: 10
	  }*/
    ]
  };
});

hljs.registerLanguage('sql', function(hljs) {
  var COMMENT_MODE = {
    className: 'comment',
    begin: '--', end: '$'
  };
  return {
    case_insensitive: true,
    illegal: /[<>]/,
    contains: [
      {
        className: 'operator',
        beginKeywords:
          'begin end start commit rollback savepoint lock alter create drop rename call '+
          'delete do handler insert load replace select truncate update set show pragma grant '+
          'merge describe use explain help declare prepare execute deallocate savepoint release '+
          'unlock purge reset change stop analyze cache flush optimize repair kill '+
          'install uninstall checksum restore check backup',
        end: /;/, endsWithParent: true,
        keywords: {
          keyword:
            'abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter ' +
            'analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup ' +
            'before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by ' +
            'cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length ' +
            'character_length charindex charset check checksum checksum_agg choose close coalesce ' +
            'coercibility collate collation collationproperty column columns columns_updated commit compress concat ' +
            'concat_ws concurrent connect connection connection_id consistent constraint constraints continue ' +
            'contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist ' +
            'curdate current current_date current_time current_timestamp current_user cursor curtime data database ' +
            'databases datalength date_add date_format date_sub dateadd datediff datefromparts datename ' +
            'datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear ' +
            'deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt ' +
            'des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct ' +
            'distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec ' +
            'engine engines eomonth errors escape escaped event eventdata events except exception exec execute ' +
            'exists exp explain export_set extended external extract fast fetch field fields find_in_set ' +
            'first first_value floor flush for force foreign format found found_rows from from_base64 ' +
            'from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant ' +
            'grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help ' +
            'hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore ' +
            'iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner ' +
            'innodb input insert install instr intersect into is is_free_lock is_ipv4 ' +
            'is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill ' +
            'language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level ' +
            'like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile ' +
            'logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max ' +
            'md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names ' +
            'national natural nchar next no no_write_to_binlog not now nullif nvarchar oct ' +
            'octet_length of old_password on only open optimize option optionally or ord order outer outfile output ' +
            'pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add ' +
            'period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges ' +
            'procedure procedure_analyze processlist profile profiles public publishingservername purge quarter ' +
            'query quick quote quotename radians rand read references regexp relative relaylog release ' +
            'release_lock rename repair repeat replace replicate reset restore restrict return returns reverse ' +
            'revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll ' +
            'sec_to_time second section select serializable server session session_user set sha sha1 sha2 share ' +
            'show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex ' +
            'sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache ' +
            'sql_small_result sql_variant_property sqlstate sqrt square start starting status std ' +
            'stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff ' +
            'subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset ' +
            'system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time ' +
            'time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour ' +
            'timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation ' +
            'trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress ' +
            'uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade ' +
            'upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short ' +
            'validate_password_strength value values var var_pop var_samp variables variance varp ' +
            'version view warnings week weekday weekofyear weight_string when whenever where with work write xml ' +
            'xor year yearweek zon',
          literal:
            'true false null',
          built_in:
            'array bigint binary bit blob boolean char character date dec decimal float int integer interval number ' +
            'numeric real serial smallint varchar varying int8 serial8 text'
        },
        contains: [
          {
            className: 'string',
            begin: '\'', end: '\'',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
          },
          {
            className: 'string',
            begin: '"', end: '"',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}]
          },
          {
            className: 'string',
            begin: '`', end: '`',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          hljs.C_NUMBER_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          COMMENT_MODE
        ]
      },
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE
    ]
  };
});

hljs.registerLanguage('vbscript', function(hljs) {
  return {
    aliases: ['vbs'],
    case_insensitive: true,
    keywords: {
      keyword:
        'call class const dim do loop erase execute executeglobal exit for each next function ' +
        'if then else on error option explicit new private property let get public randomize ' +
        'redim rem select case set stop sub while wend with end to elseif is or xor and not ' +
        'class_initialize class_terminate default preserve in me byval byref step resume goto',
      built_in:
        'lcase month vartype instrrev ubound setlocale getobject rgb getref string ' +
        'weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency ' +
        'conversions csng timevalue second year space abs clng timeserial fixs len asc ' +
        'isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate ' +
        'instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex ' +
        'chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim ' +
        'strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion ' +
        'scriptengine split scriptengineminorversion cint sin datepart ltrim sqr ' +
        'scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw ' +
        'chrw regexp server response request cstr err',
      literal:
        'true false null nothing empty'
    },
    illegal: '//',
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [{begin: '""'}]}),
      {
        className: 'comment',
        begin: /'/, end: /$/,
        relevance: 0
      },
      hljs.C_NUMBER_MODE
    ]
  };
});
