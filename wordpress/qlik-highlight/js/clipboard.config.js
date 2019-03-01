/*global
Clipboard
*/
var snippets = document.querySelectorAll(".qlik-highlight-pre");

[].forEach.call(snippets, function (snippet) {
    var baseURL = qlikHighlightClipboardConfig.pluginsUrl;
    var copyToClipboard = qlikHighlightClipboardConfig.copyToClipboard;
    snippet.firstChild.insertAdjacentHTML("beforebegin", Sanitizer.escapeHTML `<button class="btn" title="${copyToClipboard}" data-clipboard-snippet><img class="clippy" width="13" src="${baseURL}js/clippy.svg" alt="Copy to clipboard"></button>`);
});

var clipboardSnippets = new Clipboard("[data-clipboard-snippet]", {
    target(trigger) {
        return trigger.nextElementSibling;
    }
});

clipboardSnippets.on("success", function (e) {
    e.clearSelection();
    //showTooltip(e.trigger,'Copied!');
});

clipboardSnippets.on("error", function (e) {
    //showTooltip(e.trigger,fallbackMessage(e.action));
});