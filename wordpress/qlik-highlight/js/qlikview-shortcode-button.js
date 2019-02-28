/*global
tinymce, tinyMCE, tb_show
*/
(function () {
    tinymce.create("tinymce.plugins.qlik_code_buttons", {
        init(ed, url) {
            ed.addButton("qlik_code_button", {
                title: ed.getLang("qlik_code_buttons.insertHighlightBlock"),
                text: " " + ed.getLang("qlik_code_buttons.code"),
                icon: true,
                image: url + "/qlik.png",
                onclick() {
                    // Show the ThinkBox popup
                    tb_show(ed.getLang("qlik_code_buttons.insertHighlightBlock"), "#TB_inline?inlineId=qlik_highlight_shortcode_popup", null);

                    // HACK:  Because there is a bug in WP's implementation of ThinkBox we need to do the following to fix the size of the popup box and style it nicely
                    document.getElementById("TB_window").setAttribute("style", "width: 480px; margin-left: -240px; top: 52px; margin-top: 0px; background: #f1f1f1; visibility: visible;"); // Set the attribute to an empty string or your desired width/height.
                    document.getElementById("TB_ajaxContent").setAttribute("style", ""); // Remove the hard coded style which sets a size that can be bigger than the containing object
                }
            });

            ed.addButton("qlik_icon_button", {
                title: ed.getLang("qlik_code_buttons.insertIcon"),
                text: " " + ed.getLang("qlik_code_buttons.icon"),
                icon: true,
                image: url + "/qlik.png",
                onclick() {
                    // Show the ThinkBox popup
                    tb_show(ed.getLang("qlik_code_buttons.insertIcon"), "#TB_inline?inlineId=qlik_icon_shortcode_popup", null);

                    // HACK:  Because there is a bug in WP's implementation of ThinkBox we need to do the following to fix the size of the popup box and style it nicely
                    document.getElementById("TB_window").setAttribute("style", "width: 800px; margin-left: -375px; top: 52px; margin-top: 0px; background: #f1f1f1; visibility: visible;"); // Set the attribute to an empty string or your desired width/height.
                    document.getElementById("TB_ajaxContent").setAttribute("style", ""); // Remove the hard coded style which sets a size that can be bigger than the containing object
                }
            });
        },

        createControl(n, cm) {
            return null;
        },

        getInfo() {
            return {
                longname: "Qlik for WordPress",
                author: "Matthew Fryer",
                authorurl: "http://www.qlikviewaddict.com/",
                infourl: "http://www.qlikviewaddict.com/",
                version: "2.0"
            };
        }
    });
    tinymce.PluginManager.add("qlik_code_buttons", tinymce.plugins.qlik_code_buttons);
}());