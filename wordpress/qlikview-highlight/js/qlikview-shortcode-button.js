(function() {
   tinymce.create('tinymce.plugins.qlikview', {
      init : function(ed, url) {
         ed.addButton('qlikview', {
            title : 'QlikView',
            image : url+'/qlikview.png',
            onclick : function() {
			   var selected = tinyMCE.activeEditor.selection.getContent( {format : "text"} );
			   if (selected == null || selected == '') {
			      var selected = 'Your code here...';
			   }
			   
               var type = prompt("Type (qvs, exp, sql, vbscript, javascript)", "qvs");
			   if (type != null && type != ''){
			      var type = 'qvs';
			   }

               ed.execCommand('mceInsertContent', false, '[qlikview type="'+type+'"]' + selected + '[/recent-posts]');
            }
         });
      },
      createControl : function(n, cm) {
         return null;
      },
      getInfo : function() {
         return {
            longname : "QlikView Code Block Syntax Highlighter",
            author : 'Matthew Fryer',
            authorurl : 'http://www.qlikviewaddict.com/',
            infourl : 'http://www.qlikviewaddict.com/',
            version : "0.2"
         };
      }
   });
   tinymce.PluginManager.add('qlikview', tinymce.plugins.qlikview);
})();