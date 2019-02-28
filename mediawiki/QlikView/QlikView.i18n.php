<?php
# This is not a valid entry point to MediaWiki.
if( !defined( 'MEDIAWIKI' ) ) {
	die( 'To install QlikView Syntax Highlight, put the following line in LocalSettings.php: require_once( "\$IP/extensions/QlikView/QlikView.php" );' );
}

# Internationalize our strings.
$messages = array();

# English
$messages['en'] = array( 
	'qlikview' => 'QlikView',
	'syntax-highlight' => 'Syntax Highlight',
	'qlikview-ext-desc' => 'Automatically syntax highlights QlikView script and expressions on any MediaWiki page.',
);

# German
$messages['de'] = array(
	'qlikview' => 'QlikView',
	'syntax-highlight' => 'Syntax Highlight',
	'qlikview-ext-desc' => 'Automatically syntax highlights QlikView script and expressions on any MediaWiki page.',
);


?>
