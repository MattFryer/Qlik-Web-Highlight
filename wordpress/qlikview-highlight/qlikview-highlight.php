<?php
/**
 * @package QlikView_Highlight
 * @version 1.2
 */
/*/
 * Plugin Name: Qlik for WordPress
 * Plugin URI: http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html
 * Description: Automatic syntax highlighting of Qlik script and expressions on any WordPress page or post.
 * Version: 1.2
 * Author: Matt Fryer
 * Author URI: http://www.qlikviewaddict.com/
 * License: GPLv2 or later
/*/
/*  Copyright 2014  Matthew Fryer  (email : matthew_fryer@hotmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

defined('ABSPATH') or die("No script kiddies please!"); //Block direct access to this php file

// Add the necessary highlight code to the HTML header for the site
function qlik_highlight_head() {
    echo '<link rel="stylesheet" title="Qlik" href="' . plugin_dir_url(__FILE__) . 'css/qlikview.css">';
		echo '<script src="' . plugin_dir_url(__FILE__) . 'js/highlight.pack.js"></script>';
		echo '<script>';
		echo '	hljs.configure({tabReplace: \'    \'});';
		echo '	hljs.initHighlightingOnLoad();';
		echo '</script>';
}
add_action('wp_head', 'qlik_highlight_head');

// Add Qlik specific shortcode [qlik]...[/qlik]
// Accepts type parameter [qlik type="qvs"].
// Options are: 
//	 "qvs" or "qlikview-script" or "qv-script" - Qlik Script (default)
//	 "exp" or "qlikview-exp" or "qv-exp" - Qlik Expression
//	 "sql" - SQL
//   "vbscript" - Visual Basic Script
//	 "javascript" - Java Script
function qlik_highlight_shortcode( $atts , $content = null ) { 
	// obtain the passed type (script or expression) if any. Defaults to script if not specified
	$attributes = shortcode_atts( array(
        'type' => 'qvs'
    ), $atts );
	return '<pre><code class="' . $a['type'] . '">' . $content . '</code></pre>';
}

function qlik_pre_process_shortcode($content) {
    global $shortcode_tags;
 
    // Backup current registered shortcodes and clear them all out
    $orig_shortcode_tags = $shortcode_tags;
    $shortcode_tags = array();
 
    // Add the shortcode
		add_shortcode("qlik","qlik_highlight_shortcode");
		add_shortcode("qlikview","qlik_highlight_shortcode"); // Also add the old code for backward compatibility
 
    // Do the shortcode (only the one above is registered)
    $content = do_shortcode($content);
 
    // Put the original shortcodes back
    $shortcode_tags = $orig_shortcode_tags;
 
    return $content;
}
add_filter('the_content', 'qlik_pre_process_shortcode', 7);

// Add the button to the text editor
function qlik_button_script() {
    if(wp_script_is("quicktags")) {
        ?>
            <script type="text/javascript">
                // this function is used to retrieve the selected text from the text editor
                function getSel()
                {
                    var txtarea = document.getElementById("content");
                    var start = txtarea.selectionStart;
                    var finish = txtarea.selectionEnd;
                    return txtarea.value.substring(start, finish);
                }

                QTags.addButton( 
                    "qlik_shortcode", 
                    "Qlik", 
                    callback
                );

                function callback()
                {
                    var selected_text = getSel();
										var type = prompt("Type (qvs, exp, sql, vbscript, javascript)", "qvs");
										if (type == null || type == '' || (type != 'qvs' && type != 'exp' && type != 'sql' && type != 'vbscript' && type != 'javascript')){
											var type = 'qvs';
										}
                    QTags.insertContent("[qlik type=\"" + type + "\"]" +  selected_text + "[/qlik]");
                }
            </script>
        <?php
    }
}
add_action("admin_print_footer_scripts", "qlik_button_script");

// Add the button to the TinyMCE so that the shortcode can be added via the visual page/post editor
function register_qlik_highlight_button( $buttons ) {
   array_push( $buttons, "|", "qlik" );
   return $buttons;
}

function add_qlik_highlight_plugin( $plugin_array ) {
   $plugin_array['qlik'] = plugin_dir_url(__FILE__) . 'js/qlikview-shortcode-button.js';
   return $plugin_array;
}

function qlik_hightlight_button() {
   if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
      return;
   }

   if ( get_user_option('rich_editing') == 'true' ) {
      add_filter( 'mce_external_plugins', 'add_qlik_highlight_plugin' );
      add_filter( 'mce_buttons', 'register_qlik_highlight_button' );
   }
}
add_action('init', 'qlik_hightlight_button');

?>