!function(e){var t="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):t&&(t.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return t.hljs}))}(function(e){function t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(e){return e.nodeName.toLowerCase()}function a(e,t){var r=e&&e.exec(t);return r&&0===r.index}function n(e){return C.test(e)}function i(e){var t,r,a,i,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",r=M.exec(s))return y(r[1])?r[1]:"no-highlight";for(s=s.split(/\s+/),t=0,a=s.length;a>t;t++)if(i=s[t],n(i)||y(i))return i}function s(e){var t,r={},a=Array.prototype.slice.call(arguments,1);for(t in e)r[t]=e[t];return a.forEach(function(e){for(t in e)r[t]=e[t]}),r}function o(e){var t=[];return function a(e,n){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?n+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:n,node:i}),n=a(i,n),r(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:n,node:i}));return n}(e,0),t}function l(e,a,n){function i(){return e.length&&a.length?e[0].offset!==a[0].offset?e[0].offset<a[0].offset?e:a:"start"===a[0].event?e:a:e.length?e:a}function s(e){function a(e){return" "+e.nodeName+'="'+t(e.value).replace('"',"&quot;")+'"'}u+="<"+r(e)+w.map.call(e.attributes,a).join("")+">"}function o(e){u+="</"+r(e)+">"}function l(e){("start"===e.event?s:o)(e.node)}for(var c=0,u="",d=[];e.length||a.length;){var m=i();if(u+=t(n.substring(c,m[0].offset)),c=m[0].offset,m===e){d.reverse().forEach(o);do l(m.splice(0,1)[0]),m=i();while(m===e&&m.length&&m[0].offset===c);d.reverse().forEach(s)}else"start"===m[0].event?d.push(m[0].node):d.pop(),l(m.splice(0,1)[0])}return u+t(n.substr(c))}function c(e){return e.v&&!e.cached_variants&&(e.cached_variants=e.v.map(function(t){return s(e,{v:null},t)})),e.cached_variants||e.eW&&[s(e)]||[e]}function u(e){function t(e){return e&&e.source||e}function r(r,a){return new RegExp(t(r),"m"+(e.cI?"i":"")+(a?"g":""))}function a(n,i){if(!n.compiled){if(n.compiled=!0,n.k=n.k||n.bK,n.k){var s={},o=function(t,r){e.cI&&(r=r.toLowerCase()),r.split(" ").forEach(function(e){var r=e.split("|");s[r[0]]=[t,r[1]?Number(r[1]):1]})};"string"==typeof n.k?o("keyword",n.k):N(n.k).forEach(function(e){o(e,n.k[e])}),n.k=s}n.lR=r(n.l||/\w+/,!0),i&&(n.bK&&(n.b="\\b("+n.bK.split(" ").join("|")+")\\b"),n.b||(n.b=/\B|\b/),n.bR=r(n.b),n.e||n.eW||(n.e=/\B|\b/),n.e&&(n.eR=r(n.e)),n.tE=t(n.e)||"",n.eW&&i.tE&&(n.tE+=(n.e?"|":"")+i.tE)),n.i&&(n.iR=r(n.i)),null==n.r&&(n.r=1),n.c||(n.c=[]),n.c=Array.prototype.concat.apply([],n.c.map(function(e){return c("self"===e?n:e)})),n.c.forEach(function(e){a(e,n)}),n.starts&&a(n.starts,i);var l=n.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([n.tE,n.i]).map(t).filter(Boolean);n.t=l.length?r(l.join("|"),!0):{exec:function(){return null}}}}a(e)}function d(e,r,n,i){function s(e,t){var r,n;for(r=0,n=t.c.length;n>r;r++)if(a(t.c[r].bR,e))return t.c[r]}function o(e,t){if(a(e.eR,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?o(e.parent,t):void 0}function l(e,t){return!n&&a(t.iR,e)}function c(e,t){var r=T.cI?t[0].toLowerCase():t[0];return e.k.hasOwnProperty(r)&&e.k[r]}function p(e,t,r,a){var n=a?"":I.classPrefix,i='<span class="'+n,s=r?"":R;return i+=e+'">',i+t+s}function g(){var e,r,a,n;if(!w.k)return t(C);for(n="",r=0,w.lR.lastIndex=0,a=w.lR.exec(C);a;)n+=t(C.substring(r,a.index)),e=c(w,a),e?(M+=e[1],n+=p(e[0],t(a[0]))):n+=t(a[0]),r=w.lR.lastIndex,a=w.lR.exec(C);return n+t(C.substr(r))}function f(){var e="string"==typeof w.sL;if(e&&!x[w.sL])return t(C);var r=e?d(w.sL,C,!0,N[w.sL]):m(C,w.sL.length?w.sL:void 0);return w.r>0&&(M+=r.r),e&&(N[w.sL]=r.top),p(r.language,r.value,!1,!0)}function b(){k+=null!=w.sL?f():g(),C=""}function _(e){k+=e.cN?p(e.cN,"",!0):"",w=Object.create(e,{parent:{value:w}})}function h(e,t){if(C+=e,null==t)return b(),0;var r=s(t,w);if(r)return r.skip?C+=t:(r.eB&&(C+=t),b(),r.rB||r.eB||(C=t)),_(r,t),r.rB?0:t.length;var a=o(w,t);if(a){var n=w;n.skip?C+=t:(n.rE||n.eE||(C+=t),b(),n.eE&&(C=t));do w.cN&&(k+=R),w.skip||w.sL||(M+=w.r),w=w.parent;while(w!==a.parent);return a.starts&&_(a.starts,""),n.rE?0:t.length}if(l(t,w))throw new Error('Illegal lexeme "'+t+'" for mode "'+(w.cN||"<unnamed>")+'"');return C+=t,t.length||1}var T=y(e);if(!T)throw new Error('Unknown language: "'+e+'"');u(T);var v,w=i||T,N={},k="";for(v=w;v!==T;v=v.parent)v.cN&&(k=p(v.cN,"",!0)+k);var C="",M=0;try{for(var S,E,L=0;;){if(w.t.lastIndex=L,S=w.t.exec(r),!S)break;E=h(r.substring(L,S.index),S[0]),L=S.index+E}for(h(r.substr(L)),v=w;v.parent;v=v.parent)v.cN&&(k+=R);return{r:M,value:k,language:e,top:w}}catch(D){if(D.message&&-1!==D.message.indexOf("Illegal"))return{r:0,value:t(r)};throw D}}function m(e,r){r=r||I.languages||N(x);var a={r:0,value:t(e)},n=a;return r.filter(y).forEach(function(t){var r=d(t,e,!1);r.language=t,r.r>n.r&&(n=r),r.r>a.r&&(n=a,a=r)}),n.language&&(a.second_best=n),a}function p(e){return I.tabReplace||I.useBR?e.replace(S,function(e,t){return I.useBR&&"\n"===e?"<br>":I.tabReplace?t.replace(/\t/g,I.tabReplace):""}):e}function g(e,t,r){var a=t?k[t]:r,n=[e.trim()];return e.match(/\bhljs\b/)||n.push("hljs"),-1===e.indexOf(a)&&n.push(a),n.join(" ").trim()}function f(e){var t,r,a,s,c,u=i(e);n(u)||(I.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e,c=t.textContent,a=u?d(u,c,!0):m(c),r=o(t),r.length&&(s=document.createElementNS("http://www.w3.org/1999/xhtml","div"),s.innerHTML=a.value,a.value=l(r,o(s),c)),a.value=p(a.value),e.innerHTML=a.value,e.className=g(e.className,u,a.language),e.result={language:a.language,re:a.r},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.r}))}function b(e){I=s(I,e)}function _(){if(!_.called){_.called=!0;var e=document.querySelectorAll("pre code");w.forEach.call(e,f)}}function h(){addEventListener("DOMContentLoaded",_,!1),addEventListener("load",_,!1)}function T(t,r){var a=x[t]=r(e);a.aliases&&a.aliases.forEach(function(e){k[e]=t})}function v(){return N(x)}function y(e){return e=(e||"").toLowerCase(),x[e]||x[k[e]]}var w=[],N=Object.keys,x={},k={},C=/^(no-?highlight|plain|text)$/i,M=/\blang(?:uage)?-([\w-]+)\b/i,S=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,R="</span>",I={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};return e.highlight=d,e.highlightAuto=m,e.fixMarkup=p,e.highlightBlock=f,e.configure=b,e.initHighlighting=_,e.initHighlightingOnLoad=h,e.registerLanguage=T,e.listLanguages=v,e.getLanguage=y,e.inherit=s,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.COMMENT=function(t,r,a){var n=e.inherit({cN:"comment",b:t,e:r,c:[]},a||{});return n.c.push(e.PWM),n.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),n},e.CLCM=e.COMMENT("//","$"),e.CBCM=e.COMMENT("/\\*","\\*/"),e.HCM=e.COMMENT("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e}),hljs.registerLanguage("javascript",function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:r,c:[]},i={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,i,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:r,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,i,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:t+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:t,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+t+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:t},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:t}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}}),hljs.registerLanguage("qlikview-expression",function(e){var t={function_keyword:"All Total Distinct Nodistinct",built_in:"Above acos AddMonths AddYears After Age Aggr Alt ApplyCodepage ApplyMap ARGB asin atan atan2 Author Avg Before Below BitCount Black BlackAndSchole Blue Bottom Brown Capitalize Ceil Chi2Test_chi2 Chi2Test_df Chi2Test_p CHIDIST CHIINV Chr Class ClientPlatform Color ColorMapHue ColorMapJet ColorMix1 ColorMix2 Column ColumnNo Combin ComputerName Concat ConvertToLocalTime Correl cos cosh Count Cyan DarkGray Day DayEnd DaylightSaving DayName DayNumberOfQuarter DayNumberOfYear DayStart Dimensionality Div DocumentName DocumentPath DocumentTitle Dual e Even exp fabs Fact False FDIST FieldIndex FieldValue FieldValueCount FindOneOf FINV First FirstSortedValue FirstWorkDate Floor fmod Frac Fractile FV GetActiveSheetId GetAlternativeCount GetCurrentField GetCurrentSelections GetExcludedCount GetExtendedProperty GetFieldSelections GetNotSelectedCount GetObjectField GetPossibleCount GetRegistryString GetSelectedCount GMT Green Hash128 Hash160 Hash256 Hour HRank HSL If InDay InDayToTime Index Info InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate InputAvg InputSum InQuarter InQuarterToDate InWeek InWeekToDate InYear InYearToDate IRR IsNull IsNum IsText KeepChar Kurtosis Last LastWorkDate Left Len LightBlue LightCyan LightGray LightGreen LightMagenta LightRed LINEST_B LINEST_DF LINEST_F LINEST_M LINEST_R2 LINEST_SEB LINEST_SEM LINEST_SEY LINEST_SSREG LINEST_SSRESID LocalTime log log10 Lower LTrim LunarWeekEnd LunarWeekName LunarWeekStart Magenta MakeDate MakeTime MakeWeekDate MapSubString Match Max MaxString Median Mid Min MinString Minute MissingCount MixMatch Mod Mode Month MonthEnd MonthName MonthsEnd MonthsName MonthsStart MonthStart NATIVE NetWorkDays NoOfColumns NoOfReports NoOfRows NORMDIST NORMINV Now nPer NPV Null NullCount NumAvg NumCount NumericCount NumMax NumMin NumSum Odd Only Ord OSUser Permut Pi Pick Pmt pow PurgeChar PV QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QVUser Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rank Rate Red ReloadTime Repeat Replace ReportComment ReportId ReportName ReportNumber RGB Right Round RowNo RTrim Second SecondaryDimensionality SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt StateName Stdev Sterr STEYX SubField SubStringCount Sum SysColor tan tanh TDIST Text TextBetween TextCount TimeZone TINV Today Top Trim True TTest1_conf TTest1_df TTest1_dif TTest1_lower TTest1_sig TTest1_sterr TTest1_t TTest1_upper TTest1w_conf TTest1w_df TTest1w_dif TTest1w_lower TTest1w_sig TTest1w_sterr TTest1w_t TTest1w_upper TTest_conf TTest_df TTest_dif TTest_lower TTest_sig TTest_sterr TTest_t TTest_upper TTestw_conf TTestw_df TTestw_dif TTestw_lower TTestw_sig TTestw_sterr TTestw_t TTestw_upper Upper UTC ValueList ValueLoop VRank Week WeekDay WeekEnd WeekName WeekStart WeekYear White WildMatch WildMatch5 XIRR XNPV Year Year2Date YearEnd YearName YearStart YearToDate Yellow ZTest_conf ZTest_dif ZTest_lower ZTest_sig ZTest_sterr ZTest_upper ZTest_z ZTestw_conf ZTestw_dif ZTestw_lower ZTestw_sig ZTestw_sterr ZTestw_upper ZTestw_z"},r={cN:"built_in",b:"\\b(date|interval|money|num|time|timestamp)\\b#?\\s?",i:"\\n"},a={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE,{b:"''"}],r:0},n={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE,{b:'""'}],r:0},i={cN:"variable",b:"\\$\\(",e:"\\)",i:"\\n",r:10},s={cN:"field",b:"\\[",e:"\\]",r:0};return{aliases:["exp","qve","qlikview-exp","qv-exp"],cI:!0,k:t,c:[e.CLCM,e.CBCM,e.QSM,r,a,n,i,i,{cN:"total-modifier",b:"<",e:">",c:[e.CLCM,e.CBCM,s,{cN:"field",b:"\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b",i:"\ns"}],r:10},{cN:"set-analysis",b:"\\{",e:"\\}",c:[e.CLCM,e.CBCM,{b:"\\{",e:"\\}",c:[e.CLCM,e.CBCM,{cN:"set-analysis-quotes",b:'"',e:'"',i:"\ns"}]},{cN:"field",b:"\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b",i:"\ns"}]},s,{cN:"field",k:t,b:"\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b",i:"\ns"}]}}),hljs.registerLanguage("qlikview-script",function(e){var t={keyword:"Add Alias And As Autogenerate|10 Binary Buffer Call Case Comment Concatenate Connect Crosstable Custom Default Derive Detail Dimension Directory Disconnect Distinct Do Each Else Elseif End Endif Endsub Endswitch Execute Exit First FlushLog For Force From From_Field Generic Hierarchy|10 HierarchyBelongsTo|10 if In Inline Inputfield|10 Intervalmatch|10 Into Let Lib Load Loop Loosen Map Measure Native Next Noconcatenate|10 Not NullAsNull NullAsValue ODBC OLEDB Or Qualify Replace Resident Sample Script Section Select Semantic Set Sleep SQL SQLColumns SQLTables SQLTypes Star Step Store Sub Switch Then To Trace Unless Unmap Unqualify Untag Until Using When Where While With",built_in:"Acos Addmonths Addyears Age Alt Applycodepage Applymap Argb Asin Atan Atan2 Attribute Author Autonumber Autonumberhash128 Autonumberhash256 Avg Bitcount Black Blackandschole Blue Brown Capitalize Ceil Chi2test_chi2 Chi2test_df Chi2test_p Chidist Chiinv Chr Class Clientplatform Color Colormaphue Colormapjet Colormix1 Colormix2 Combin Computername Concat Connectstring Converttolocaltime Correl Cos Cosh Count Cyan Darkgray Day Dayend Daylightsaving Dayname Daynumberofquarter Daynumberofyear Daystart Div DocumentName DocumentPath DocumentTitle Dual E Evaluate Even Exists Exp Fabs Fact False Fdist FieldIndex FieldName FieldNumber FieldValue FieldValueCount FileBaseName FileDir FileExtension FileList FileName FilePath FileSize FileTime FindOneOf Finv FirstSortedValue FirstValue FirstWorkDate Floor Fmod Frac Fractile Fv GetExtendedProperty GetFolderPath GetObjectField GetRegistryString GMT Green Hash128 Hash160 Hash256 Hour HSL InDay InDayToTime Index InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate Input InputAvg InputSum InQuarter InQuarterToDate Interval Interval# InWeek InWeekToDate InYear InYearToDate IRR IsNull IsNum IsPartialReload IsText IterNo KeepChar Kurtosis LastValue LastWorkDate Len LightBlue LightCyan LightGray LightGreen LightMagenta LightRed LINEST_B LINEST_DF LINEST_F LINEST_M LINEST_R2 LINEST_SEB LINEST_SEM LINEST_SEY LINEST_SSREG LINEST_SSRESID LocalTime log log10 Lookup Lower LTrim LunarWeekEnd LunarWeekName LunarWeekStart Magenta MakeDate MakeTime MakeWeekDate MapSubString Match Max MaxString Median Mid Min MinString Minute MissingCount MixMatch Mod Mode Money Money# Month MonthEnd MonthName MonthsEnd MonthsName MonthsStart MonthStart MsgBox NetWorkDays NoOfFields NoOfReports NoOfRows NoOfTables NORMDIST NORMINV Now nPer NPV Null NullCount Num Num NumAvg NumCount NumericCount NumMax NumMin NumSum Odd Only Ord OSUser Peek Permut Pi Pick Pmt pow Previous PurgeChar PV QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QvdCreateTime QvdFieldName QvdNoOfFields QvdNoOfRecords QvdTableName QVUser Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rate RecNo Red ReloadTime Repeat Replace ReportComment ReportId ReportName ReportNumber RGB Round RowNo RTrim Second SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt Stdev Sterr STEYX SubField|10 SubStringCount Sum SysColor TableName TableNumber tan tanh TDIST Text TextBetween TextCount TimeZone TINV Today Trim True TTest1_conf TTest1_df TTest1_dif TTest1_lower TTest1_sig TTest1_sterr TTest1_t TTest1_upper TTest1w_conf TTest1w_df TTest1w_dif TTest1w_lower TTest1w_sig TTest1w_sterr TTest1w_t TTest1w_upper TTest_conf TTest_df TTest_dif TTest_lower TTest_sig TTest_sterr TTest_t TTest_upper TTestw_conf TTestw_df TTestw_dif TTestw_lower TTestw_sig TTestw_sterr TTestw_t TTestw_upper Upper UTC Week WeekDay WeekEnd WeekName WeekStart WeekYear White WildMatch WildMatch5 XIRR XNPV Year Year2Date YearEnd YearName YearStart YearToDate Yellow ZTest_conf ZTest_dif ZTest_lower ZTest_sig ZTest_sterr ZTest_upper ZTest_z ZTestw_conf ZTestw_dif ZTestw_lower ZTestw_sig ZTestw_sterr ZTestw_upper ZTestw_z"},r={cN:"kewyword",b:"\\b(left\\s+join|right\\s+join|inner\\s+join|outer\\s+join|left\\s+keep|right\\s+keep|\\inner\\s+keep|drop\\s+table|drop\\s+tables|drop\\s+field|drop\\s+fields|exit\\s+script|exit\\s+sub|exit\\s+for|exit\\s+do|exit\\s+switch|rename\\s+table|rename\\s+field|mapping\\s+load|bundle\\s+info\\s+load|bundle\\s+image_size|info\\s+load|tag\\s+field|tag\\s+fields|group\\s+by)\\b"},a={cN:"built_in",b:"\\b(date|interval|money|num|time|timestamp)#?\\s*(?=(\\(|$))",i:"\\n"},n={cN:"built_in",b:"\\b(if|left|right)\\s*(?=(\\(|$))",i:"\\n"},i={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE,{b:"''"}],r:0},s={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE,{b:'""'}],r:0},o={cN:"comment",b:"^\\s*rem\\b",e:";",r:10},l={cN:"variable",b:"\\b(let|set)\\s+",e:"\\w+",k:"set let",i:"\\n",r:10},c={cN:"variable",b:"\\$\\(",e:"\\)",i:"\\n",r:10},u={cN:"field",b:"\\[",e:"\\]",r:0};return{aliases:["qvs","qlikview"],cI:!0,k:t,c:[e.CLCM,e.CBCM,e.QSM,r,a,n,i,s,o,l,c,u,{cN:"sql_statement",b:"\\bsql\\b",e:";",k:"sql",c:[e.CLCM,e.CBCM,e.QSM,i,s,c]},{cN:"direct_query_statement",b:"\\bdirect\\s+query\\b",e:";",k:"direct query",c:[e.CLCM,e.CBCM,e.QSM,a,n,i,s,c,u,{cN:"direct_query_from",b:"\\bfrom\\b",e:"(?=(;|$))",k:t,c:[e.CLCM,e.CBCM,e.QSM,i,s,c,u]},{cN:"field",b:"\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b",k:t,i:"\ns"}],r:10},{cN:"load_statement",b:"\\bload\\b",e:";",k:"load distinct",c:[e.CLCM,e.CBCM,e.QSM,a,n,i,s,c,u,{cN:"load_source",b:"(\\bresident\\b|\\binline\\b|\\bautogenerate\\b|\\bfrom\\b)",e:"(?=(;|$))",k:t,c:[e.CLCM,e.CBCM,e.QSM,i,s,c,u,{cN:"format_specification",b:"\\(",e:"\\)",k:{format_specification_items:"ansi oem mac UTF-8 Unicode txt fix dif biff ooxml html xml qvd delimiter is no eof embedded labels explicit no table header line lines comment record quotes msq filters"},c:[e.CLCM,e.CBCM,e.QSM,i,s,c]}]},{cN:"field",b:"\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b",k:t,i:"\ns"}],r:10}]}}),hljs.registerLanguage("sql",function(e){var t=e.COMMENT("--","$");return{cI:!0,i:/[<>{}*]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t,e.HCM]},e.CBCM,t,e.HCM]}}),hljs.registerLanguage("vbscript",function(e){return{aliases:["vbs"],cI:!0,k:{keyword:"call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
built_in:"lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",literal:"true false null nothing empty"},i:"//",c:[e.inherit(e.QSM,{c:[{b:'""'}]}),e.COMMENT(/'/,/$/,{r:0}),e.CNM]}});