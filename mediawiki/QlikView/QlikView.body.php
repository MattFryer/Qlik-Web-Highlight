<?php
 // This is not a valid entry point to MediaWiki.
if (!defined('MEDIAWIKI')) {
    die('To install QlikView Syntax Highlight, put the following line in LocalSettings.php: require_once( "\$IP/extensions/QlikView/QlikView.php" );');
}

class QlikView
{

    public static function init(&$parser)
    {
        // Add our <qlikview> tag handler.
        $parser->setHook('qlikview', 'QlikView::render');

        return true;
    }

    public static function render($input, $args, $parser, $frame)
    {
        //Ensure a valid language is passed and if not set to default qvs
        $type = 'qvs';
        if ($args['type'] == 'qvs' || $args['type'] == 'exp' || $args['type'] == 'qve' || $args['type'] == 'sql' || $args['type'] == 'vbscript' || $args['type'] == 'javascript') {
            $type = $args['type'];
        }

        // Replace all '&', '<,' and '>' with their HTML entitites. Order is important. You have to do '&' first.
        $input = str_replace('&', '&amp;', $input);
        $input = str_replace('<', '&lt;', $input);
        $input = str_replace('>', '&gt;', $input);
        // Strip whitespace (or other characters) from the end of a string
        $input = rtrim($input);

        return '<pre><code class="' . $type . '">' . $input . '</code></pre>';
    }

    public static function onBeforePageDisplay(OutputPage &$out, Skin &$skin)
    {
        $out->addModules('ext.QlikView');
        return true;
    }
}
 