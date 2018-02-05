(function() {
  tinymce.create("tinymce.plugins.qlik_code_buttons", {
    init : function(ed, url) {
      ed.addButton("qlik_code_button", {
        title : "Insert Syntax Highlighted Qlik Code Block",
				text: " Code",
        icon: true,
				image : url+"/qlik.png",
        onclick : function() {
					var selectedContent = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					if (selectedContent === null || selectedContent === "") {
						selectedContent = "Your code here...";
					}
		  
					var codeType = prompt("codeType (qvs, exp, sql, vbscript, javascript)", "qvs");
					if (codeType === null || codeType === "" || (codeType !== "qvs" && codeType !== "exp" && codeType !== "sql" && codeType !== "vbscript" && codeType !== "javascript")){
						codeType = "qvs";
					}
               
					ed.execCommand("mceInsertContent", false, "[qlik-code type=\""+codeType+"\"]" + selectedContent + "[/qlik]");
         }
      });
    },
    createControl : function(n, cm) {
      return null;
    },
    getInfo : function() {
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