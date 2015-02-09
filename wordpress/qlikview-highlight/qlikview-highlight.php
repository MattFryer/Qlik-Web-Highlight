<?php
/**
 * @package QlikView_Highlight
 * @version 1.1
 */
/*/
 * Plugin Name: QlikView for WordPress
 * Plugin URI: http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html
 * Description: Automatic syntax highlighting of QlikView script and expressions on any WordPress page or post.
 * Version: 1.1
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

//Add the necessary highlight code to the HTML header for the site
function qlikview_highlight_head() {
    echo '<link rel="stylesheet" title="QlikView" href="' . plugin_dir_url(__FILE__) . 'css/qlikview.css">';
	echo '<script src="' . plugin_dir_url(__FILE__) . 'js/highlight.pack.js"></script>';
	echo '<script>';
	echo '	hljs.configure({tabReplace: \'    \'});';
	echo '	hljs.initHighlightingOnLoad();';
	echo '</script>';
}
add_action('wp_head', 'qlikview_highlight_head');

//Make Wordpress process the post text after the shortcodes have been processed
//Without this Wordpress will process the code because it won't yet be inside the pre and code tags
remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 12);
remove_filter( 'the_content', 'wptexturize' );
add_filter( 'the_content', 'wptexturize', 12 );

// Add QlikView specific shortcode [qlikview]...[/qlikview]
//Accepts type parameter [qlikview type="qvs"].
//Options are: 
//	"qvs" or "qlikview-script" or "qv-script" - Qlikview Script (default)
//	"exp" or "qlikview-exp" or "qv-exp" - QlikView Expression
//	"sql" - SQL
//  "vbscript" - Visual Basic Script
//	"javascript" - Java Script
function qlikview_highlight_shortcode( $atts , $content = null ) { 
	//obtain the passed type (script or expression) if any. Defaults to script if not specified
	$attributes = shortcode_atts( array(
        'type' => 'qvs'
    ), $atts );
	return '<pre><code class="' . $a['type'] . '">' . $content . '</code></pre>';
}
add_shortcode( 'qlikview', 'qlikview_highlight_shortcode' );

//Add the button to the TinyMCE so that the shortcode can be added via the visual page/post editor
function register_qlikview_highlight_button( $buttons ) {
   array_push( $buttons, "|", "qlikview" );
   return $buttons;
}

function add_qlikview_highlight_plugin( $plugin_array ) {
   $plugin_array['qlikview'] = plugin_dir_url(__FILE__) . 'js/qlikview-shortcode-button.js';
   return $plugin_array;
}

function qlikview_hightlight_button() {
   if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
      return;
   }

   if ( get_user_option('rich_editing') == 'true' ) {
      add_filter( 'mce_external_plugins', 'add_qlikview_highlight_plugin' );
      add_filter( 'mce_buttons', 'register_qlikview_highlight_button' );
   }
}
add_action('init', 'qlikview_hightlight_button');

?>