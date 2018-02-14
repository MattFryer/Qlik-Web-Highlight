var qlikHighlightTinyMceLang; // Define external global object
var tinymce;  // Define external tinyMCE object
var ed; // Define external editor object

(function() {
  tinymce.create( "tinymce.plugins.qlik_code_buttons", {
    init(ed, url) {
      ed.addButton("qlik_code_button", {
        title : qlikHighlightTinyMceLang.insertHighlightBlock,
				text: " "+qlikHighlightTinyMceLang.code,
        icon: true,
				image : url+"/qlik.png",
        onclick() {
					var selectedContent = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					if (!selectedContent) {
						selectedContent = "Your code here...";
					}
					
          var codeType = prompt( qlikHighlightTinyMceLang.codeType+" (qvs, exp, sql, vbscript, javascript, html, xml, css)", "qvs" );
          if (codeType) {
            if (codeType !== "qvs" && codeType !== "exp" && codeType !== "sql" && codeType !== "vbscript" && codeType !== "javascript" && codeType !== "html" && codeType !== "xml" && codeType !== "css"){
              codeType = "qvs";
            }
                
            ed.execCommand( "mceInsertContent", false, "[qlik-code type=\""+codeType+"\"]" + selectedContent + "[/qlik]" );
          }
        }
      });

      ed.addButton("qlik_icon_button", {
        title : qlikHighlightTinyMceLang.insertIcon,
				text: " "+qlikHighlightTinyMceLang.icon,
        icon: true,
				image : url+"/qlik.png",
        onclick() {
					var selectedContent = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					
          var iconType = prompt(qlikHighlightTinyMceLang.iconCode, "qicon-qlik");
          if (iconType) {   
            ed.execCommand( "mceInsertContent", false, "[qlik-icon icon=\""+iconType+"\"]" + selectedContent );
          }
        }
      });
    },

    createControl(n, cm) {
      return null;
    },

    getInfo() {
      return {
        longname : "Qlik for WordPress",
        author : "Matthew Fryer",
        authorurl : "http://www.qlikviewaddict.com/",
        infourl : "http://www.qlikviewaddict.com/",
        version : "2.0"
      };
    }
  });
  tinymce.PluginManager.add( "qlik_code_buttons", tinymce.plugins.qlik_code_buttons );
}());