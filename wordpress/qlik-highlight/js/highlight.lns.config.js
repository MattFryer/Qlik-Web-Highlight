(function ($) {
    $(document).ready(function () {
        $("code.hljs").each(function (i, block) {
            hljs.lineNumbersBlock(block);
        });
    });
}(jQuery));