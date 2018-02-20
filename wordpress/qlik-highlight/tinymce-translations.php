<?php
 
 defined('ABSPATH') or die("No humans here please!"); //Block direct access to this php file
 
if ( ! class_exists( '_WP_Editors' ) )
    require( ABSPATH . WPINC . '/class-wp-editor.php' );
 
function qlik_highlight_tinymce_translation() {
    $strings = array(
        'insertHighlightBlock' => esc_attr__('Insert Syntax Highlighted Qlik Code Block', 'qlikview-syntax-highlighter'),        
        'code' => esc_attr__('Code', 'qlikview-syntax-highlighter'), 
        'codeType' => esc_attr__('Code type', 'qlikview-syntax-highlighter'), 
        'insertIcon' => esc_attr__('Insert Qlik Icon', 'qlikview-syntax-highlighter'), 
        'icon' => esc_attr__('Icon', 'qlikview-syntax-highlighter'), 
        'iconCode' => esc_attr__('Icon code', 'qlikview-syntax-highlighter'), 
    );
 
    $locale = _WP_Editors::$mce_locale;
    $translated = 'tinyMCE.addI18n("' . $locale . '.qlik_code_buttons", ' . json_encode( $strings ) . ");\n";
 
    return $translated;
}
 
$strings = qlik_highlight_tinymce_translation();

?>