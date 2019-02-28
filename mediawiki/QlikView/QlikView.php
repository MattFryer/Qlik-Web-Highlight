 <?php
# This is not a valid entry point to MediaWiki.
if( !defined( 'MEDIAWIKI' ) ) {
	die( 'To install QlikView Syntax Highlight, put the following line in LocalSettings.php: require_once( "\$IP/extensions/QlikView/QlikView.php" );' );
}

# Take credit for this extension.
$wgExtensionCredits['other'][] = array(
	'name' => 'QlikView for WordPress',
	'author' => 'Matt Fryer',
	'url' => 'http://www.qlikviewaddict.com/',
	'description' => 'Automatically syntax highlights QlikView script and expressions on any MediaWiki page.',
	'descriptionmsg' => 'qlikview-ext-desc',
	'version' => '0.1',
);
 
$dir = dirname( __FILE__ ) . '/';

# Register the extension's main code/class.
$wgAutoloadClasses['QlikView'] = $dir . 'QlikView.body.php';

# Register our internationalization file.
$wgExtensionMessagesFiles['QlikView'] = $dir . 'QlikView.i18n.php';

# Let MediaWiki know about the new tag.
$wgHooks['ParserFirstCallInit'][] = 'QlikView::init';

# Register hook to get items into the header.
$wgHooks['BeforePageDisplay'][] = 'QlikView::onBeforePageDisplay';

// ResourceLoader modules
$wgResourceModules['ext.QlikView'] = array(
    'localBasePath' => dirname(__FILE__),
    'remoteExtPath' => 'QlikView',
    'styles' => array('resources/qlikview.css'),
    'scripts' => array('resources/highlight.pack.js', 'resources/highight.init.js')
);

?>
