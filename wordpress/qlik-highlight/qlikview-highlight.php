<?php
/**
 * @package Qlik_Highlight
 * @version 2.0
 */
/*/
 * Plugin Name: Qlik for WordPress
 * Plugin URI: http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html
 * Description: Tools for Qlik bloggers including inserting Qlik UI icons and automatic syntax highlighting of QlikView and Qlik Sense script/expressions on any WordPress page or post.
 * Version: 2.0
 * Author: Matt Fryer
 * Author URI: http://www.qlikviewaddict.com/
 * License: GPLv3 or later
 * Text Domain: qlikview-syntax-highlighter
 * Domain Path: /languages
/*/
/*  Copyright 2014  Matthew Fryer  (email : matthew_fryer@hotmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 3, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

defined('ABSPATH') or die("No humans here please!"); //Block direct access to this php file

//////////////////////////////////////////////////////////////////////////////////////////
// DEFINES
//////////////////////////////////////////////////////////////////////////////////////////
define( 'QLIK_HIGHLIGHT_PLUGIN_VERSION', '2.0' );
define( 'QLIK_HIGHLIGHT_PACKAGE_NAME', 'qlik_highlight');
define( 'QLIK_HIGHLIGHT_PLUGIN_FOLDER',  plugin_basename( __FILE__ ) );
define( 'QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL', plugin_dir_url( __FILE__ ) );
define( 'QLIK_HIGHLIGHT_CDN_FOLDER_URL', 'https://cdn.rawgit.com/MattFryer/Qlik-Web-Highlight/v' . QLIK_HIGHLIGHT_PLUGIN_VERSION . '/wordpress/qlikview-highlight/' );

//////////////////////////////////////////////////////////////////////////////////////////
// PLUGIN TEXT DOMAIN
//////////////////////////////////////////////////////////////////////////////////////////
function qlik_highlight_load_textdomain() {
	load_plugin_textdomain( 'qlikview-syntax-highlighter', false, QLIK_HIGHLIGHT_PLUGIN_FOLDER . '/languages' ); 
}
add_action( 'plugins_loaded', 'qlik_highlight_load_textdomain' );

//////////////////////////////////////////////////////////////////////////////////////////
// PLUGIN PAGE LINKS
//////////////////////////////////////////////////////////////////////////////////////////
function qlik_highlight_add_action_links ( $links ) {
	$additionalLinks = array(
		'<a href="' . admin_url( 'admin.php?page='. QLIK_HIGHLIGHT_PACKAGE_NAME) . '">Settings</a>',
	);
   return array_merge( $links, $additionalLinks );
}
add_filter( 'plugin_action_links_' . QLIK_HIGHLIGHT_PLUGIN_FOLDER, 'qlik_highlight_add_action_links' );

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN CONFIGURATION PAGE
//////////////////////////////////////////////////////////////////////////////////////////
// Add a settings page
function qlik_highlight_admin_add_page() {
	add_menu_page( esc_attr__('Qlik for WordPress Settings', 'qlikview-syntax-highlighter'), 'Qlik', 'manage_options', 'qlik_highlight', 'qlik_highlight_settings_page', plugin_dir_url( __FILE__ ) . 'js/qlik.png', null );
}
add_action( 'admin_menu', 'qlik_highlight_admin_add_page' );

// Register the settings
function qlik_highlight_register_settings() {
	register_setting( 'qlik_highlight_settings_group', 'qlik_highlight_options' ); // Add a setting. It will be used as an array to hold multiple settings.
	add_settings_section( 'qlik_highlight_main', esc_attr__('General Settings', 'qlikview-syntax-highlighter'), 'qlik_highlight_general_section_text', 'qlik_highlight' ); // Add a section to the settings
	add_settings_field( 'qlik-highlight-ln', esc_attr__('Enable line numbers', 'qlikview-syntax-highlighter'), 'qlik_highlight_ln_check', 'qlik_highlight', 'qlik_highlight_main' ); // Add a specific setting field to the array for enabling line numbers
	add_settings_field ('qlik-highlight-cdn', esc_attr__('Enable JS and CSS from CDN', 'qlikview-syntax-highlighter'), 'qlik_highlight_cdn_check', 'qlik_highlight', 'qlik_highlight_main' ); // Add a specific setting field to the array for enabling line numbers
	add_settings_field( 'qlik-highlight-copy', esc_attr__('Enable copy to Clipboard', 'qlikview-syntax-highlighter'), 'qlik_highlight_copy_check', 'qlik_highlight', 'qlik_highlight_main' ); // Add a specific setting field to the array for enabling copy to clipboard
}
add_action( 'admin_init', 'qlik_highlight_register_settings' );	

// Define the text description for the general section
function qlik_highlight_general_section_text() {
	echo '<p>';
	esc_html_e('General settings that effect all code blocks across all pages and posts.', 'qlikview-syntax-highlighter');
	echo '</p>';
}

// Define the form output for the qlik-highlight-ln setting
function qlik_highlight_ln_check() {
	$options = get_option( 'qlik_highlight_options' );
	?>
	<input type="checkbox" name="qlik_highlight_options[qlik-highlight-ln]" value="1" <?php if (isset($options['qlik-highlight-ln'])){echo 'checked';} ?> /> 
	<?php
	echo '<strong>';
	esc_html_e('Warning: Enabling line numbers may prevent the correct highlighting of blocks which span more than one line (eg. /* */ block comments, REM comments and keyword combinations that aren\'t on the same line).', 'qlikview-syntax-highlighter');
	echo '</strong>';
}

// Define the form output for the qlik-highlight-cdn setting
function qlik_highlight_cdn_check() {
	$options = get_option( 'qlik_highlight_options' );
	?>
	<input type="checkbox" name="qlik_highlight_options[qlik-highlight-cdn]" value="1" <?php if (isset($options['qlik-highlight-cdn'])){echo 'checked';} ?> /> 
	<?php
	esc_html_e('Load the JavaScript and CSS files from the RawGit Content Delivery Network instead of locally. Helps with page load times and ensures latest highlighting is always available.', 'qlikview-syntax-highlighter');
}

// Define the form output for the qlik-highlight-copy setting
function qlik_highlight_copy_check() {
	$options = get_option( 'qlik_highlight_options' );
	?>
	<input type="checkbox" name="qlik_highlight_options[qlik-highlight-copy]" value="1" <?php if (isset($options['qlik-highlight-copy'])){echo 'checked';} ?> /> 
	<?php
	esc_html_e('Enables copy to clipboard button on all code blocks.', 'qlikview-syntax-highlighter');
}

// Define the structure of the settings page
function qlik_highlight_settings_page() {
	?>
	<div class="qlik-highlight-admin">
		<h1><?php esc_html_e('Qlik for WordPress Settings', 'qlikview-syntax-highlighter'); ?></h1>
		<p><?php esc_html_e('The Qlik for WordPress plugin provides syntax highlighting of Qlikview and Qlik Sense script in pages and post.', 'qlikview-syntax-highlighter'); ?></p>
		<form action="options.php" method="post">
			<?php settings_fields('qlik_highlight_settings_group'); ?>
			<?php do_settings_sections('qlik_highlight'); ?>

			<input name="Submit" type="submit" value="<?php esc_attr_e('Save Settings'); ?>" />
		</form>
		
		<h2><?php esc_html_e('Icons', 'qlikview-syntax-highlighter'); ?></h2>
		<p><?php esc_html_e('The tables below provide the necessary codes to insert QlikView and Qlik Sense icons into pages and posts:', 'qlikview-syntax-highlighter'); ?></p>
		
		<?php
		readfile( QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL . 'qlik-highlight-admin-icons.php' );
		?>
		
		<hr />
		<p><?php esc_html_e('Produced by', 'qlikview-syntax-highlighter'); ?> Matt Fryer. <?php esc_html_e('Further details available at', 'qlikview-syntax-highlighter'); ?> <a href="http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html">QlikViewAddict.com</a>. <?php esc_html_e('Qlik is a registered trademark of QlikTech International AB', 'qlikview-syntax-highlighter'); ?></p>
	</div>
	<?php
}

// Add the css for the admin page
function qlik_highlight_admin_style() {
	wp_enqueue_style( 'qlik_admin_style', QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL . 'css/qlik-admin.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the icons css
	wp_enqueue_style( 'qlik_icon_style', QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL . 'css/qlik-icons.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the icons css
}
add_action( 'admin_enqueue_scripts', 'qlik_highlight_admin_style' );

//////////////////////////////////////////////////////////////////////////////////////////
// UNINSTALL
//////////////////////////////////////////////////////////////////////////////////////////
// Called on plugin uninstall. Tidies up settings stored in DB.
function qlik_highlight_uninstall() {
	unregister_setting( 'qlik_highlight_settings_group', 'qlik_highlight_options' ); 
}
register_uninstall_hook( __FILE__, 'qlik_highlight_uninstall' );

//////////////////////////////////////////////////////////////////////////////////////////
// REGISTER ASSETS
//////////////////////////////////////////////////////////////////////////////////////////
// Register the necessary highlight code and styles 
function qlik_highlight_register() {
	$loadFrom = QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL;
	
	$options = get_option('qlik_highlight_options');
	if ( isset($options['qlik-highlight-cdn']) ) {
		$loadFrom = QLIK_HIGHLIGHT_CDN_FOLDER_URL;
	}
	
	wp_register_style( 'qlik_highlight_style', $loadFrom . 'css/qlikview.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the main css
	wp_register_style( 'qlik_icon_style', $loadFrom . 'css/qlik-icons.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the icon css
	
	wp_register_script( 'qlik_highlight_js', $loadFrom . 'js/highlight.pack.js', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the custom highlight.js package	
	wp_register_script( 'qlik_highlight_config', $loadFrom . 'js/highlight.config.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the highlight.js config
	
	wp_register_script( 'qlik_highlight_lns_js', $loadFrom . 'js/highlightjs-line-numbers.min.js', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the highlight.js line numbers package	
	wp_register_script( 'qlik_highlight_lns_config', $loadFrom . 'js/highlight.lns.config.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the highlight.js config
	
	wp_register_script( 'qlik_highlight_sanitizer', $loadFrom . 'js/sanitizer.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the sanitizer.js package
	wp_register_script( 'qlik_highlight_clipboard', $loadFrom . 'js/clipboard.min.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the clipboard.js package
	wp_register_script( 'qlik_highlight_tooltips', $loadFrom . 'js/tooltips.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the tooltips.js package
	wp_register_script( 'qlik_highlight_clipboard_config', $loadFrom . 'js/clipboard.config.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the clipboard.js config
}	
add_action( 'wp_enqueue_scripts', 'qlik_highlight_register' );

//////////////////////////////////////////////////////////////////////////////////////////
// SHORTCODE - HIGHLIGHTING
//////////////////////////////////////////////////////////////////////////////////////////
/*
	Add Qlik specific shortcode [qlik-code]...[/qlik-code]
	Accepts type parameter [qlik-code type="qvs"].
	Options are: 
		"qvs" or "qlikview-script" or "qv-script" - Qlik Script (default)
		"exp" or "qlikview-exp" or "qv-exp" - Qlik Expression
		"sql" - SQL
	"vbscript" - Visual Basic Script
		"javascript" - Java Script
*/
function qlik_highlight_shortcode( $atts , $content = null ) { 
	// Obtain the passed type (script or expression) if any. Defaults to script if not specified
	$shortCodeAtts = shortcode_atts( array(
        'type' => 'qvs'
    ), $atts );
	
	// Enqueue the main css and js
	wp_enqueue_style( 'qlik_highlight_style' );
	wp_enqueue_script( 'qlik_highlight_js' );
	wp_enqueue_script( 'qlik_highlight_config' );
	
	// If line numbers are enabled, enqueue those js files also
	$options = get_option('qlik_highlight_options');
	if ( isset($options['qlik-highlight-ln']) ) {
		wp_enqueue_script( 'qlik_highlight_lns_js' );
		wp_enqueue_script( 'qlik_highlight_lns_config' );
	}
	if ( isset($options['qlik-highlight-copy']) ) {
		wp_enqueue_script( 'qlik_highlight_sanitizer' );
		wp_enqueue_script( 'qlik_highlight_clipboard' );
		wp_enqueue_script( 'qlik_highlight_clipboard_config' );
		wp_localize_script('qlik_highlight_clipboard_config', 'qlikHighlightClipboardConfig', array( // Allows for passing of variables to the JS
			'pluginsUrl' => QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL,
			'copyToClipboard' => esc_html__('Copy to Clipboard', 'qlikview-syntax-highlighter'),
		));
	}
	
	return '<pre class="qlik-highlight-pre"><code class="qlik-highlight-code' . $shortCodeAtts['type'] . '">' . $content . '</code></pre>';
}

/* 
	We need to perform the highlighting before any other shortcodes are run or before WordPress starts adding BR tags etc. 
	To do this we must pre-process it, running just this shortcode tag then adding back the others.
*/
function qlik_highlight_pre_process_shortcode($content) {
    global $shortcode_tags;
 
    // Backup current registered shortcodes and clear them all out
    $orig_shortcode_tags = $shortcode_tags;
    $shortcode_tags = array();
 
    // Add the shortcode
	add_shortcode( "qlik-code","qlik_highlight_shortcode" );
	add_shortcode( "qlikview","qlik_highlight_shortcode" ); // Also add the old code for backward compatibility
 
    // Do the shortcode (only the one above is registered)
    $content = do_shortcode($content);
 
    // Put the original shortcodes back
    $shortcode_tags = $orig_shortcode_tags;
 
    return $content;
}
add_filter( 'the_content', 'qlik_highlight_pre_process_shortcode', 7 );

//////////////////////////////////////////////////////////////////////////////////////////
// SHORTCODE - ICONS
//////////////////////////////////////////////////////////////////////////////////////////
/*
	Add Qlik icons shortcode [qlik-icon]
	Accepts icon parameter [qlik-icon icon="qicon-XXX"] which defines the icon to be displayed.
*/
function qlik_icon_shortcode( $atts , $content = null ) { 
	// Obtain the passed icon (script or expression) if any. Defaults to script if not specified
	$shortCodeAtts = shortcode_atts( array(
        'icon' => ''
    ), $atts );
	
	// Enqueue the icons css
	wp_enqueue_style( 'qlik_icon_style' );
	
	return '<i class="' . $shortCodeAtts['icon'] . '"></i>' . $content;
}
add_shortcode( 'qlik-icon', 'qlik_icon_shortcode' );

////////////////////////////////////////////////////////////////////////////////////////////
// WORDPRESS TEXT EDITOR BUTTONS
////////////////////////////////////////////////////////////////////////////////////////////
// Add the buttons to the text editor
function qlik_highlight_button_script() {
    if(wp_script_is("quicktags")) {
        ?>
            <script type="text/javascript">
                // This function is used to retrieve the selected text from the text editor
                function getSel()
                {
                    var txtarea = document.getElementById("content");
                    var start = txtarea.selectionStart;
                    var finish = txtarea.selectionEnd;
                    return txtarea.value.substring(start, finish);
                }
				
				// Add the buttons
                QTags.addButton( 
                    "qlik_code_shortcode", 
                    "<?php esc_html_e('Qlik Code', 'qlikview-syntax-highlighter'); ?>", 
                    callback_qlik_highlight
                );

				// Action for highlighting button
                function callback_qlik_highlight()
                {
                    var selected_text = getSel();
					if (selected_text == null || selected_text == '') {
						var selected_text = '<?php esc_html_e('Your code here...', 'qlikview-syntax-highlighter'); ?>';
					}
					var type = prompt( "<?php esc_html_e('Code type', 'qlikview-syntax-highlighter'); ?> (qvs, exp, sql, vbscript, javascript, html, xml, css)", "qvs" );
					if (type) {
						if (type != 'qvs' && type != 'exp' && type != 'sql' && type != 'vbscript' && type != 'javascript' && type != 'html' && type != 'xml' && type != 'css') {
							var type = 'qvs';
						}
						QTags.insertContent( "[qlik-code type=\"" + type + "\"]" +  selected_text + "[/qlik-code]" );
					}
				}
				
				// Add the buttons
                QTags.addButton( 
                    "qlik_icon_shortcode", 
                    "<?php esc_html_e('Qlik Icon', 'qlikview-syntax-highlighter'); ?>", 
                    callback_qlik_icon
				);

				function callback_qlik_icon()
                {
                    var selected_text = getSel();
					var type = prompt( "<?php esc_html_e('Icon code', 'qlikview-syntax-highlighter'); ?>", "qicon-qlik" );
					if (type) {
						QTags.insertContent( "[qlik-icon icon=\"" + type + "\"]" +  selected_text );
					}
				}
				
            </script>
        <?php
    }
}
add_action("admin_print_footer_scripts", "qlik_highlight_button_script");

////////////////////////////////////////////////////////////////////////////////////////////
// WORDPRESS TINYMCE VISUAL EDITOR BUTTONS
////////////////////////////////////////////////////////////////////////////////////////////
// Add the button(s) to the TinyMCE so that the shortcode(s) can be added via the visual page/post editor
function register_qlik_highlight_buttons( $buttons ) {
	array_push( $buttons, "qlik_code_button", "qlik_icon_button" );
	return $buttons;
}

function add_qlik_highlight_plugin( $plugin_array ) {
	$plugin_array['qlik_code_buttons'] = QLIK_HIGHLIGHT_PLUGIN_FOLDER_URL . 'js/qlikview-shortcode-button.js';
	return $plugin_array;
}

function qlik_hightlight_buttons() {
   	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
      	return;
   	}

	if ( get_user_option('rich_editing') == 'true' ) {
		add_filter( 'mce_external_plugins', 'add_qlik_highlight_plugin' );
		add_filter( 'mce_buttons', 'register_qlik_highlight_buttons' );
	}
}
add_action( 'init', 'qlik_hightlight_buttons' );

// Handly tinyMCE language translations
function qlik_highlight_tinymce_lang() {

	global $current_screen;
    $type = $current_screen->post_type;

    if (is_admin() && $type == 'post' || $type == 'page') {
        ?>
        <script type="text/javascript">
			var qlikHighlightTinyMceLang = {
				insertHighlightBlock: "<?php esc_html_e('Insert Syntax Highlighted Qlik Code Block', 'qlikview-syntax-highlighter'); ?>", 
				code: "<?php esc_html_e('Code', 'qlikview-syntax-highlighter'); ?>", 
				codeType: "<?php esc_html_e('Code type', 'qlikview-syntax-highlighter'); ?>", 
				insertIcon: "<?php esc_html_e('Insert Qlik Icon', 'qlikview-syntax-highlighter'); ?>", 
				icon: "<?php esc_html_e('Icon', 'qlikview-syntax-highlighter'); ?>", 
				iconCode: "<?php esc_html_e('Icon code', 'qlikview-syntax-highlighter'); ?>", 
			};
        </script>
        <?php
    }
}
add_action('admin_head','qlik_highlight_tinymce_lang');
?>