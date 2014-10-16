=== QlikView for Wordpress ===
Contributors: Matt Fryer
Tags: highlight, syntax, qlikview, post, page, shortcode, plugin
Donate link: 
Requires at least: 4.0
Tested up to: 4.0
Stable tag: 0.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Automatic syntax highlighting of QlikView script on any Wordpress page or post.

== Description ==
This Wordpress plugin provides automatic syntax highlighting of QlikView script on any Wordpress page or post. It currently supports highlighting of the following QlikView script elements:

* Line comments //
* Block comment /*..*/
* REM comment REM...;
* All QlikView 11.20 keywords, statements and functions (that are permitted within the script)
* Variable definitions (using SET and LET) and variable use (within $())

Future improvements may include better more accurate syntax highlighting (such as field names) and the ability to change the highlighting style from the QlikView default.

Using the plugin is simple. Any QlikView script within a Wordpress page or post that is wrapped within the shortcode [qlikview] ... [/qlikview] will be automatically highlighted.

== Installation ==
1. Navigate to the "Pligins"->"Add New"->"Upload Plugin" page within the Wordpress administration panel and upload the entire .zip file provided. Alternatively, upload the directory "/qlikview-highlight/" and its contents from the .zip file to the "/wp-content/plugins/" directory of your Wordpess site.
2. Activate the plugin "QlikView Syntax Highlighting" through the "Plugins" menu in WordPress administration panel.

== Frequently Asked Questions ==
= Is the syntax highlighting perfect? =
The syntax highlighting is an approximation of the default highlighting within the QlikView Edit Script dialog. It is not a perfect replication.

= Can it highlight other languages? =
As well as QlikView script and expressions, it can currently highlight a handful of other languages that are associated with QlikView. These currently include SQL, VBScript and JavaScript.

= Can I use it with another highlighting plugin? =
The plugin has not been tested with any other highlighting plugins (syntax or otherwise) and so it cannot be guaranteed to work alongside them, especially those also based on highlight.js.

= How does it work? =
It uses a custom build of highlight.js to provide the highlighting.

== Screenshots ==

1. An example section of QlikView script showing the syntax highlighting provided by this plugin. 
2. Includes a support for adding shortcode via the Wordpress visual post/page editor.

== Changelog ==
= 1.0
* General code improvements.
* Corrected issue with $() variable use within a load statement not being highlighted correctly.

= 0.2 =
* Added support for highlighting QlikView expressions
* Added the ability to hightlight a handful of other languages that are related to QlikView.
* Added variable definition and use support (SET, LET and $()).
* Fixed issue with interpretation functions (those ending with a #) not being highlighted correctly.
* Corrected an issue where the if function is confused with the IF statements causing incorrect highlighting.
* Fixed issue where keywords were highlighted within SQL statements.
* Added button to TinyMCE to insert the shortcode within the visual editor

= 0.1 =
* Initial pre-release.

== Upgrade Notice ==
= 0.2 =
All previous versions of this plugin should be uninstalled from Wordpress before this version is installed.

= 0.1 =
This version provides the initial pre-release and so no upgrade is necessary.