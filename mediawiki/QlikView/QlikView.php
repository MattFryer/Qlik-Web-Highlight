<?php
 // Run only if this is a valid entry point to MediaWiki.
if (defined('MEDIAWIKI')) {

  // Take credit for this extension.
  $wgExtensionCredits['other'][] = array(
     'name' => 'QlikView for WordPress',
     'author' => 'Matt Fryer',
     'url' => 'http://www.qlikviewaddict.com/',
     'description' => 'Automatically syntax highlights QlikView script and expressions on any MediaWiki page.',
     'descriptionmsg' => 'qlikview-ext-desc',
     'version' => '0.1',
  );

  $dir = __DIR__ . '/';

  // Register the extension's main code/class.
  $wgAutoloadClasses['QlikView'] = $dir . 'QlikView.body.php';

  // Register our internationalization file.
  $wgExtensionMessagesFiles['QlikView'] = $dir . 'QlikView.i18n.php';

  // Let MediaWiki know about the new tag.
  $wgHooks['ParserFirstCallInit'][] = 'QlikView::init';

  // Register hook to get items into the header.
  $wgHooks['BeforePageDisplay'][] = 'QlikView::onBeforePageDisplay';

  // ResourceLoader modules
  $wgResourceModules['ext.QlikView'] = array(
     'localBasePath' => __DIR__,
     'remoteExtPath' => 'QlikView',
     'styles' => array('resources/qlikview.css'),
     'scripts' => array('resources/highlight.pack.js', 'resources/highight.init.js')
  );
