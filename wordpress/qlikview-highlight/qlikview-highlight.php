<?php
/**
 * @package QlikView_Highlight
 * @version 0.1
 */
/*/
 * Plugin Name: QlikView Syntax Highlighting
 * Plugin URI: http://www.qlikviewaddict.com/
 * Description: Automatically syntax highlights QlikView script on any Wordpress page or post.
 * Version: 0.1
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

//Make Wordpress process the post text after the shortcodes have been processed so that it doesn't process the code because it will then be in <pre> and <code> tags
remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 12);
remove_filter( 'the_content', 'wptexturize' );
add_filter( 'the_content', 'wptexturize', 12 );

// Add Shortcodes
//Generic code shortcode allowing language definition [code lang="qlikview"]...[/code]. This has been added as other languages may be included later on.
function qlikview_highlight_code_shortcode( $atts , $content = null ) { 
	//obtain the passed language if any
	$attributes = shortcode_atts( array(
        'lang' => ''
    ), $atts );

	return '<pre><code class="' . $a['lang'] . '">' . str_replace('’', '\'', $content) . '</code></pre>';
}
add_shortcode( 'code', 'qlikview_highlight_code_shortcode' );

//QlikView specific shortcode [qlikview]...[/qlikview]
function qlikview_highlight_qlikview_shortcode( $atts , $content = null ) { //QlikView specific shortcode
	return '<pre><code class="qlikview">' . str_replace('<br></br>', '', str_replace('’', '\'', $content)) . '</code></pre>';
}
add_shortcode( 'qlikview', 'qlikview_highlight_qlikview_shortcode' );

?>