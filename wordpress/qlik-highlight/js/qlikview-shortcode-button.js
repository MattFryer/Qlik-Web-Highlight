(function() {
  tinymce.create("tinymce.plugins.qlik_code_buttons", {
    init(ed, url) {
      ed.addButton("qlik_code_button", {
        title : "Insert Syntax Highlighted Qlik Code Block",
				text: " Code",
        icon: true,
				image : url+"/qlik.png",
        onclick() {
					var selectedContent = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					if (!selectedContent) {
						selectedContent = "Your code here...";
					}
					
					var codeType = prompt("codeType (qvs, exp, sql, vbscript, javascript)", "qvs");
					if (!codeType || (codeType !== "qvs" && codeType !== "exp" && codeType !== "sql" && codeType !== "vbscript" && codeType !== "javascript")){
						codeType = "qvs";
					}
               
					ed.execCommand("mceInsertContent", false, "[qlik-code type=\""+codeType+"\"]" + selectedContent + "[/qlik]");
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
  tinymce.PluginManager.add("qlik_code_buttons", tinymce.plugins.qlik_code_buttons);
}());