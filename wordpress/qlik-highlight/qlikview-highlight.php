<?php
/**
 * @package Qlik_Highlight
 * @version 2.0
 */
/*/
 * Plugin Name: Qlik for WordPress
 * Plugin URI: http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html
 * Description: Automatic syntax highlighting of Qlik script and expressions on any WordPress page or post.
 * Version: 2.0
 * Author: Matt Fryer
 * Author URI: http://www.qlikviewaddict.com/
 * License: GPLv3 or later
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

defined('ABSPATH') or die("No script kiddies please!"); //Block direct access to this php file


//////////////////////////////////////////////////////////////////////////////////////////
// DEFINES
//////////////////////////////////////////////////////////////////////////////////////////
define( 'QLIK_HIGHLIGHT_PLUGIN_VERSION', '2.0' );

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN CONFIGURATION PAGE
//////////////////////////////////////////////////////////////////////////////////////////
// Add a settings page
function qlik_highlight_admin_add_page() {
	add_menu_page('Qlik for WordPress Settings', 'Qlik', 'manage_options', 'qlik_highlight', 'qlik_highlight_settings_page', plugin_dir_url( __FILE__ ) . 'js/qlik.png', null);
}
add_action('admin_menu', 'qlik_highlight_admin_add_page');

// Register the settings
function qlik_highlight_register_settings() {
	register_setting( 'qlik_highlight_settings_group', 'qlik_highlight_options' ); // Add a setting. It will be used as an array to hold multiple settings.
	add_settings_section('qlik_highlight_main', 'General Settings', 'qlik_highlight_general_section_text', 'qlik_highlight'); // Add a section to the settings
	add_settings_field('qlik-highlight-ln', 'Enable line numbers', 'qlik_highlight_ln_check', 'qlik_highlight', 'qlik_highlight_main'); // Add a specific setting field to the array for enabling line numbers
	add_settings_field('qlik-highlight-cdn', 'Enable JS and CSS from CDN', 'qlik_highlight_cdn_check', 'qlik_highlight', 'qlik_highlight_main'); // Add a specific setting field to the array for enabling line numbers
}
add_action( 'admin_init', 'qlik_highlight_register_settings' );	

// Define the text description for the general section
function qlik_highlight_general_section_text() {
	echo '<p>General settings that effect all code blocks across all pages and posts.</p>';
}

// Define the form output for the qlik-highlight-ln setting
function qlik_highlight_ln_check() {
	$options = get_option('qlik_highlight_options');
?>
	<input type="checkbox" name="qlik_highlight_options[qlik-highlight-ln]" value="1" <?php if (isset($options['qlik-highlight-ln'])){echo 'checked';} ?> /> <strong>Warning: Enabling line numbers may prevent the correct highlighting of blocks which span more than one line (eg. /* */ block comments, REM comments and keyword combinations that aren't on the same line).</strong>
<?php
}

// Define the form output for the qlik-highlight-cdn setting
function qlik_highlight_cdn_check() {
	$options = get_option('qlik_highlight_options');
?>
	<input type="checkbox" name="qlik_highlight_options[qlik-highlight-cdn]" value="1" <?php if (isset($options['qlik-highlight-cdn'])){echo 'checked';} ?> /> Load the JavaScript and CSS files from the RawGit Content Delivery Network instead of locally. Helps with page load times and ensures latest highlighting is always available.
<?php
}

// Define the structure of the settings page
function qlik_highlight_settings_page() {
	?>
	<div class="qlik-highlight-admin">
		<h1>Qlik for WordPress Settings</h1>
		<p>The Qlik for WordPress plugin provides syntax highlighting of Qlikview and Qlik Sense script in pages and post.</p>
		<form action="options.php" method="post">
			<?php settings_fields('qlik_highlight_settings_group'); ?>
			<?php do_settings_sections('qlik_highlight'); ?>

			<input name="Submit" type="submit" value="<?php esc_attr_e('Save Settings'); ?>" />
		</form>
		
		<h2>Icons</h2>
		<p>The tables below provide the necessary codes to insert QlikView and Qlik Sense icons into pages and posts:</p>
		
		<h3>QlikSense Specific Icons</h3>
		<table class="border">
			<tr><th>Icon</th><th>Code</th><th>Icon</th><th>Code</th><th>Icon</th><th>Code</th></tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-bars-vert"></i></td><td>qicon-bars-vert</td>
				<td><i class="qicon qicon-2x qicon-bars-horiz"></i></td><td>qicon-bars-horiz</td>
				<td><i class="qicon qicon-2x qicon-line-chart"></i></td><td>qicon-line-chart</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-pie-chart"></i></td><td>qicon-pie-chart</td>
				<td><i class="qicon qicon-2x qicon-table-str"></i></td><td>qicon-table-str</td>
				<td><i class="qicon qicon-2x qicon-table-piv"></i></td><td>qicon-table-piv</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-gauge"></i></td><td>qicon-gauge</td>
				<td><i class="qicon qicon-2x qicon-grid"></i></td><td>qicon-grid</td>
				<td><i class="qicon qicon-2x qicon-scatter-plot"></i></td><td>qicon-scatter-plot</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-map"></i></td><td>qicon-map</td>
				<td><i class="qicon qicon-2x qicon-filter"></i></td><td>qicon-filter<br />qicon-filter-pane</td>
				<td><i class="qicon qicon-2x qicon-text"></i></td><td>qicon-text</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-image"></i></td><td>qicon-image</td>
				<td><i class="qicon qicon-2x qicon-kpi"></i></td><td>qicon-kpi</td>
				<td><i class="qicon qicon-2x qicon-exp-edit"></i></td><td>qicon-exp-edit</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-sheets"></i></td><td>qicon-sheets</td>
				<td><i class="qicon qicon-2x qicon-charts"></i></td><td>qicon-charts</td>
				<td><i class="qicon qicon-2x qicon-data-model"></i></td><td>qicon-data-model</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-data-connections"></i></td><td>qicon-data-connections</td>
				<td><i class="qicon qicon-2x qicon-select-possible"></i></td><td>qicon-select-possible<br />qicon-select-tools</td>
				<td><i class="qicon qicon-2x qicon-select-clear"></i></td><td>qicon-select-clear</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-select-undo"></i></td><td>qicon-select-undo</td>
				<td><i class="qicon qicon-2x qicon-select-redo"></i></td><td>qicon-select-redo</td>
				<td><i class="qicon qicon-2x qicon-bookmarks"></i></td><td>qicon-bookmarks</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-edit"></i></td><td>qicon-edit<br />qicon-update</td>
				<td><i class="qicon qicon-2x qicon-undo"></i></td><td>qicon-undo</td>
				<td><i class="qicon qicon-2x qicon-redo"></i></td><td>qicon-redo</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-help"></i></td><td>qicon-help</td>
				<td><i class="qicon qicon-2x qicon-delete2"></i></td><td>qicon-delete2</td>
				<td><i class="qicon qicon-2x qicon-smart-search"></i></td><td>qicon-smart-search</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-date"></i></td><td>qicon-date</td>
				<td><i class="qicon qicon-2x qicon-db"></i></td><td>qicon-db<br />qicon-repositories</td>
				<td><i class="qicon qicon-2x qicon-export-data"></i></td><td>qicon-export-data</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-bold"></i></td><td>qicon-bold</td>
				<td><i class="qicon qicon-2x qicon-italic"></i></td><td>qicon-italic</td>
				<td><i class="qicon qicon-2x qicon-underline"></i></td><td>qicon-underline</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-justify-left"></i></td><td>qicon-justify-left</td>
				<td><i class="qicon qicon-2x qicon-justify-right"></i></td><td>qicon-justify-right</td>
				<td><i class="qicon qicon-2x qicon-justify-center"></i></td><td>qicon-justify-center</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-create-new"></i></td><td>qicon-create-new</td>
				<td><i class="qicon qicon-2x qicon-cog"></i></td><td>qicon-cog<br />qicon-settings</td>
				<td><i class="qicon qicon-2x qicon-info"></i></td><td>qicon-info</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-audit"></i></td><td>qicon-audit<br />qicon-custom-props</td>
				<td><i class="qicon qicon-2x qicon-printing"></i></td><td>qicon-printing</td>
				<td><i class="qicon qicon-2x qicon-nodes"></i></td><td>qicon-nodes</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-tag"></i></td><td>qicon-tag</td>
				<td><i class="qicon qicon-2x qicon-tags"></i></td><td>qicon-tags</td>
				<td><i class="qicon qicon-2x qicon-engines"></i></td><td>qicon-engines<br />qicon-cogs</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-unlock"></i></td><td>qicon-unlock</td>
				<td><i class="qicon qicon-2x qicon-about"></i></td><td>qicon-about</td>
				<td><i class="qicon qicon-2x qicon-extensions"></i></td><td>qicon-extensions<br />qicon-custom-obj</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-task-success"></i></td><td>qicon-task-success</td>
				<td><i class="qicon qicon-2x qicon-list-view"></i></td><td>qicon-list-view</td>
				<td><i class="qicon qicon-2x qicon-export"></i></td><td>qicon-export</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-expand"></i></td><td>qicon-expand</td>
				<td><i class="qicon qicon-2x qicon-collapse"></i></td><td>qicon-collapse</td>
				<td><i class="qicon qicon-2x qicon-debug"></i></td><td>qicon-debug</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-select-excluded"></i></td><td>qicon-select-excluded</td>
				<td><i class="qicon qicon-2x qicon-tasks"></i></td><td>qicon-tasks</td>
				<td><i class="qicon qicon-2x qicon-users"></i></td><td>qicon-users</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-select-all"></i></td><td>qicon-select-all</td>
				<td><i class="qicon qicon-2x qicon-timer"></i></td><td>qicon-timer<br />qicon-task-queued</td>
				<td><i class="qicon qicon-2x qicon-task-never"></i></td><td>qicon-task-never</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-task-aborted"></i></td><td>qicon-task-aborted</td>
				<td><i class="qicon qicon-2x qicon-menu"></i></td><td>qicon-menu</td>
				<td><i class="qicon qicon-2x qicon-add-data"></i></td><td>qicon-add-data</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-certificates"></i></td><td>qicon-certificates</td>
				<td><i class="qicon qicon-2x qicon-load-data"></i></td><td>qicon-load-data</td>
				<td><i class="qicon qicon-2x qicon-select-data"></i></td><td>qicon-select-data</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-cut"></i></td><td>qicon-cut</td>
				<td><i class="qicon qicon-2x qicon-copy"></i></td><td>qicon-copy<br />qicon-duplicate-sheet</td>
				<td><i class="qicon qicon-2x qicon-data-manager"></i></td><td>qicon-data-manager</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-tree-map"></i></td><td>qicon-tree-map</td>
				<td><i class="qicon qicon-2x qicon-indent"></i></td><td>qicon-indent</td>
				<td><i class="qicon qicon-2x qicon-dedent"></i></td><td>qicon-dedent</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-security-rules"></i></td><td>qicon-security-rules</td>
				<td><i class="qicon qicon-2x qicon-snapshot"></i></td><td>qicon-snapshot</td>
				<td><i class="qicon qicon-2x qicon-qlik-folder"></i></td><td>qicon-qlik-folder</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-stories"></i></td><td>qicon-stories</td>
				<td><i class="qicon qicon-2x qicon-data-load"></i></td><td>qicon-data-load</td>
				<td><i class="qicon qicon-2x qicon-wizard"></i></td><td>qicon-wizard</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-variables"></i></td><td>qicon-variables</td>
				<td><i class="qicon qicon-2x qicon-connection"></i></td><td>qicon-connection</td>
				<td><i class="qicon qicon-2x qicon-delete"></i></td><td>qicon-delete</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-palette"></i></td><td>qicon-palette</td>
				<td><i class="qicon qicon-2x qicon-paper-clip"></i></td><td>qicon-paper-clip</td>
				<td><i class="qicon qicon-2x qicon-calendar"></i></td><td>qicon-calendar<br />qicon-schedulers</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-user-directory"></i></td><td>qicon-user-directory</td>
				<td><i class="qicon qicon-2x qicon-streams"></i></td><td>qicon-streams</td>
				<td><i class="qicon qicon-2x qicon-license-tokens"></i></td><td>qicon-license-tokens</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-proxies"></i></td><td>qicon-proxies<br />qicon-virtual-proxies</td>
				<td><i class="qicon qicon-2x qicon-line-chart-thin"></i></td><td>qicon-line-chart-thin</td>
				<td><i class="qicon qicon-2x qicon-task-chain2"></i></td><td>qicon-task-chain2</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-alert"></i></td><td>qicon-alert</td>
				<td><i class="qicon qicon-2x qicon-link"></i></td><td>qicon-link<br />qicon-master-items<br />qicon-task-chain</td>
				<td><i class="qicon qicon-2x qicon-previous"></i></td><td>qicon-previous</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-next"></i></td><td>qicon-next</td>
				<td><i class="qicon qicon-2x qicon-star"></i></td><td>qicon-star</td>
				<td><i class="qicon qicon-2x qicon-folder"></i></td><td>qicon-folder</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-cube"></i></td><td>qicon-cube</td>
				<td><i class="qicon qicon-2x qicon-refresh"></i></td><td>qicon-refresh<br />qicon-load-balance<br />qicon-task-triggered</td>
				<td><i class="qicon qicon-2x qicon-select-alternate"></i></td><td>qicon-select-alternate</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-area-chart"></i></td><td>qicon-area-chart</td>
				<td><i class="qicon qicon-2x qicon-info2"></i></td><td>qicon-info2</td>
				<td><i class="qicon qicon-2x qicon-home"></i></td><td>qicon-home</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-step"></i></td><td>qicon-step</td>
				<td><i class="qicon qicon-2x qicon-run"></i></td><td>qicon-run</td>
				<td><i class="qicon qicon-2x qicon-hub"></i></td><td>qicon-hub</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-combo-chart2"></i></td><td>qicon-combo-chart2</td>
				<td><i class="qicon qicon-2x qicon-doughnut-chart"></i></td><td>qicon-doughnut-chart</td>
				<td><i class="qicon qicon-2x qicon-lasso"></i></td><td>qicon-lasso</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-plug"></i></td><td>qicon-plug</td>
				<td><i class="qicon qicon-2x qicon-combo-chart"></i></td><td>qicon-combo-chart</td>
				<td><i class="qicon qicon-2x qicon-compass"></i></td><td>qicon-compass</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-read"></i></td><td>qicon-read</td>
				<td><i class="qicon qicon-2x qicon-cloud"></i></td><td>qicon-cloud</td>
				<td><i class="qicon qicon-2x qicon-comment"></i></td><td>qicon-comment</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-pause"></i></td><td>qicon-pause</td>
				<td><i class="qicon qicon-2x qicon-task-failed"></i></td><td>qicon-task-failed</td>
				<td><i class="qicon qicon-2x qicon-snapshot-library"></i></td><td>qicon-snapshot-library</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-associations"></i></td><td>qicon-associations</td>
				<td><i class="qicon qicon-2x qicon-content-libraries"></i></td><td>qicon-content-libraries</td>
				<td><i class="qicon qicon-2x qicon-other-access"></i></td><td>qicon-other-access</td>
			</tr>
			<tr>
				<td><i class="qicon qicon-2x qicon-box-plot"></i></td><td>qicon-box-plot</td>
				<td><i class="qicon qicon-2x qicon-distrib-plot"></i></td><td>qicon-distrib-plot</td>
				<td><i class="qicon qicon-2x qicon-histogram"></i></td><td>qicon-histogram</td>
			</tr>
			<tr>	
				<td><i class="qicon qicon-2x qicon-filter-remove"></i></td><td>qicon-filter-remove</td>
				<td></td><td></td>
				<td></td><td></td>
			</tr>			
		</table>
		
		<h3>QlikView Specific Icons</h3>
		<table class="border">
			<tr><th>Icon</th><th>Code</th><th>Icon</th><th>Code</th><th>Icon</th><th>Code</th></tr>
			<tr><td>Coming soon!</td><td></td><td></td><td></td><td></td><td></td></tr>
		</table>
		
		<hr />
		<p>Produced by Matt Fryer. Further details available at <a href="http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html">QlikViewAddict.com</a>. Qlik is a registered trademark of QlikTech International AB</p>
	</div>
	<?php
}

// Add the css for the admin page
function qlik_highlight_admin_style() {
	wp_enqueue_style( 'qlik_admin_style', plugin_dir_url(__FILE__) . 'css/qlik-admin.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the icons css
	wp_enqueue_style( 'qlik_icon_style', plugin_dir_url(__FILE__) . 'css/qlik-icons.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the icons css
}
add_action( 'admin_enqueue_scripts', 'qlik_highlight_admin_style' );

//////////////////////////////////////////////////////////////////////////////////////////
// UNINSTALL
//////////////////////////////////////////////////////////////////////////////////////////
// Called on plugin uninstall. Tidies up settings stored in DB
function qlik_highlight_uninstall() {
	register_setting( 'qlik_highlight_settings_group', 'qlik_highlight_options' ); 
}
register_uninstall_hook( __FILE__, 'qlik_highlight_uninstall' );

//////////////////////////////////////////////////////////////////////////////////////////
// REGISTER ASSETS
//////////////////////////////////////////////////////////////////////////////////////////
// Register the necessary highlight code and styles 
function qlik_highlight_register() {
	$loadFrom = plugin_dir_url(__FILE__);
	
	$options = get_option('qlik_highlight_options');
	if ( isset($options['qlik-highlight-cdn']) ) {
		$loadFrom = 'https://cdn.rawgit.com/MattFryer/Qlik-Web-Highlight/v' . QLIK_HIGHLIGHT_PLUGIN_VERSION . '/wordpress/qlikview-highlight/';
	}
	
	wp_register_style( 'qlik_highlight_style', $loadFrom . 'css/qlikview.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the main css
	wp_register_style( 'qlik_icon_style', $loadFrom . 'css/qlik-icons.css', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the main css
	wp_register_script( 'qlik_highlight_js', $loadFrom . 'js/highlight.pack.js', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the custom highlight.js package	
	wp_register_script( 'qlik_highlight_lns_js', $loadFrom . 'js/highlightjs-line-numbers.min.js', array(), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the highlight.js line numbers package	
	wp_register_script( 'qlik_highlight_config', $loadFrom . 'js/highlight.config.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the highlight.js config
	wp_register_script( 'qlik_highlight_lns_config', $loadFrom . 'js/highlight.lns.config.js', array( 'jquery' ), QLIK_HIGHLIGHT_PLUGIN_VERSION ); // Register the highlight.js config
}	
add_action('wp_enqueue_scripts', 'qlik_highlight_register');

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
	// obtain the passed type (script or expression) if any. Defaults to script if not specified
	$shortCodeAtts = shortcode_atts( array(
        'type' => 'qvs'
    ), $atts );
	
	// enqueue the main css and js
	wp_enqueue_style( 'qlik_highlight_style' );
	wp_enqueue_script( 'qlik_highlight_js' );
	wp_enqueue_script( 'qlik_highlight_config' );
	
	// if line numbers are enabled, enqueue those js files also
	$options = get_option('qlik_highlight_options');
	if ( isset($options['qlik-highlight-ln']) ) {
		wp_enqueue_script( 'qlik_highlight_lns_js' );
		wp_enqueue_script( 'qlik_highlight_lns_config' );
	}
	
	return '<pre><code class="' . $shortCodeAtts['type'] . '">' . $content . '</code></pre>';
}

function qlik_highlight_pre_process_shortcode($content) {
    global $shortcode_tags;
 
    // Backup current registered shortcodes and clear them all out
    $orig_shortcode_tags = $shortcode_tags;
    $shortcode_tags = array();
 
    // Add the shortcode
		add_shortcode("qlik-code","qlik_highlight_shortcode");
		add_shortcode("qlikview","qlik_highlight_shortcode"); // Also add the old code for backward compatibility
 
    // Do the shortcode (only the one above is registered)
    $content = do_shortcode($content);
 
    // Put the original shortcodes back
    $shortcode_tags = $orig_shortcode_tags;
 
    return $content;
}
add_filter('the_content', 'qlik_highlight_pre_process_shortcode', 7);

//////////////////////////////////////////////////////////////////////////////////////////
// SHORTCODE - ICONS
//////////////////////////////////////////////////////////////////////////////////////////
/*
Add Qlik icons shortcode [qlik-icon]
Accepts icon parameter [qlik-icon icon="qicon-XXX"] which defines the icon to be displayed.
*/
function qlik_icon_shortcode( $atts , $content = null ) { 
	// obtain the passed icon (script or expression) if any. Defaults to script if not specified
	$shortCodeAtts = shortcode_atts( array(
        'icon' => ''
    ), $atts );
	
	// enqueue the icons css
	wp_enqueue_style( 'qlik_icon_style' );
	
	return '<span class="' . $shortCodeAtts['icon'] . '"></span>' . $content;
}
add_shortcode( 'qlik-icon', 'qlik_icon_shortcode' );

////////////////////////////////////////////////////////////////////////////////////////////
// WORDPRESS TEXT EDITOR BUTTONS
////////////////////////////////////////////////////////////////////////////////////////////
// Add the button to the text editor
function qlik_highlight_button_script() {
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
                    "qlik_code_shortcode", 
                    "Qlik Code", 
                    callback
                );

                function callback()
                {
                    var selected_text = getSel();
										if (selected_text == null || selected_text == '') {
											var selected_text = 'Your code here...';
										}
										var type = prompt("Type (qvs, exp, sql, vbscript, javascript)", "qvs");
										if (type == null || type == '' || (type != 'qvs' && type != 'exp' && type != 'sql' && type != 'vbscript' && type != 'javascript')){
											var type = 'qvs';
										}
                    QTags.insertContent("[qlik-code type=\"" + type + "\"]" +  selected_text + "[/qlik]");
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
   array_push( $buttons, "qlik_code_button" );
   return $buttons;
}

function add_qlik_highlight_plugin( $plugin_array ) {
   $plugin_array['qlik_code_buttons'] = plugin_dir_url(__FILE__) . 'js/qlikview-shortcode-button.js';
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
add_action('init', 'qlik_hightlight_buttons');

?>