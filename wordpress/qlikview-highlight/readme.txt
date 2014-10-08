=== Test Plugin ===
Contributors: Matt Fryer
Tags: highlight, syntax, qlikview, post, page, shortcode, plugin
Donate link: 
Requires at least: 4.0
Tested up to: 4.0
Stable tag: 4.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Automatically syntax highlights QlikView script on any Wordpress page or post.

== Description ==
This Wordpress plugin provides automatic syntax highlighting of QlikView script on any Wordpress page or post. It uses a custom build of highlight.js to provide the highlighting. It currently supports highlighting of the following QlikView script elements:

* Line comments //
* Block comment /*..*/
* REM comment REM...;
* All QlikView 11.20 keywords, statements and functions (that are permitted within the script)

Future improvements may include better more accurate syntax highlighting (such as field names) and the ability to change the highlighting style from the QlikView default.

Using the plugin is simple. Any QlikView script within a Wordpress page or post that is wrapped within the shortcode [qlikview] ... [/qlikview] will be automatically highlighted.

== Installation ==
1. Navigate to the "Pligins"->"Add New"->"Upload Plugin" page within the Wordpress administration panel and upload the entire .zip file provided. Alternatively, upload the directory "/qlikview-highlight/" and its contents from the .zip file to the "/wp-content/plugins/" directory of your Wordpess site.
2. Activate the plugin "QlikView Syntax Highlighting" through the "Plugins" menu in WordPress administration panel.

== Frequently Asked Questions ==
= Is the syntax highlighting perfect? =
The syntax highlighting is an approximation of the default highlighting within the QlikView Edit Script dialog. It is not a perfect replication.

= Can it highlight other languages? =
Not currently. Other languages related to or associated with QlikView such as SQL may be included in future releases.

= Can I use it with another highlighting plugin? =
The plugin has not been tested with any other highlighting plugins (syntax or otherwise) and so it cannot be guaranteed to work alongside them, especially those also based on highlight.js.

== Screenshots ==
1. The screenshot description corresponds to screenshot-1.(png|jpg|jpeg|gif).
2. The screenshot description corresponds to screenshot-2.(png|jpg|jpeg|gif).
3. The screenshot description corresponds to screenshot-3.(png|jpg|jpeg|gif).

== Changelog ==
= 0.1 =
* Initial release.

== Upgrade Notice ==
= 0.1 =
This version provides the initial release and so no upgrade is necessary.