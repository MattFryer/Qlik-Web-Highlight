(function($){
	$(document).ready(function() {
		hljs.configure({tabReplace: '    '});
		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	});
}(jQuery));