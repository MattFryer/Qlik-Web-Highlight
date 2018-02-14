(function() {
  tinymce.create( "tinymce.plugins.qlik_code_buttons", {
    init(ed, url) {
      ed.addButton("qlik_code_button", {
        title : Qlik_Highlight_lang_insert_highlight_block,
				text: " "+Qlik_Highlight_lang_code,
        icon: true,
				image : url+"/qlik.png",
        onclick() {
					var selectedContent = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					if (!selectedContent) {
						selectedContent = "Your code here...";
					}
					
          var codeType = prompt( Qlik_Highlight_lang_code_type+" (qvs, exp, sql, vbscript, javascript, html, xml, css)", "qvs" );
          if (codeType) {
            if (codeType !== "qvs" && codeType !== "exp" && codeType !== "sql" && codeType !== "vbscript" && codeType !== "javascript" && codeType !== "html" && codeType !== "xml" && codeType !== "css"){
              codeType = "qvs";
            }
                
            ed.execCommand( "mceInsertContent", false, "[qlik-code type=\""+codeType+"\"]" + selectedContent + "[/qlik]" );
          }
        }
      });

      ed.addButton("qlik_icon_button", {
        title : Qlik_Highlight_lang_insert_icon,
				text: " "+Qlik_Highlight_lang_icon,
        icon: true,
				image : url+"/qlik.png",
        onclick() {
					var selectedContent = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					
          var iconType = prompt(Qlik_Highlight_lnag_icon_code, "qicon-qlik");
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