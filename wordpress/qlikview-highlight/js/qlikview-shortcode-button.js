(function() {
  tinymce.create('tinymce.plugins.qlik_code_buttons', {
    init : function(ed, url) {
      ed.addButton('qlik_code_button', {
        title : 'Insert Qlik Code Syntax Highlighting Block',
				text: 'Code',
        icon: true,
				image : url+'/qlik.png',
        onclick : function() {
					var selected = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
					if (selected == null || selected == '') {
						var selected = 'Your code here...';
					}
		  
					var type = prompt("Type (qvs, exp, sql, vbscript, javascript)", "qvs");
					if (type == null || type == '' || (type != 'qvs' && type != 'exp' && type != 'sql' && type != 'vbscript' && type != 'javascript')){
						var type = 'qvs';
					}
               
					ed.execCommand('mceInsertContent', false, '[qlik-code type="'+type+'"]' + selected + '[/qlik]');
         }
      });
    },
    createControl : function(n, cm) {
      return null;
    },
    getInfo : function() {
      return {
        longname : "Qlik for WordPress",
        author : 'Matthew Fryer',
        authorurl : 'http://www.qlikviewaddict.com/',
        infourl : 'http://www.qlikviewaddict.com/',
        version : "1.2"
      };
    }
  });
  tinymce.PluginManager.add('qlik_code_buttons', tinymce.plugins.qlik_code_buttons);
})();