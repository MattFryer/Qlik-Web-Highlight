=== QlikView for WordPress ===
Contributors: Matt Fryer
Tags: highlight, syntax, qlikview, post, page, shortcode, plugin
Donate link: http://www.qlikviewaddict.com/
Requires at least: 4.0
Tested up to: 4.0
Stable tag: 1.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Automatic syntax highlighting of QlikView script on any WordPress page or post.

== Description ==
This WordPress plugin provides automatic syntax highlighting of QlikView script on any WordPress page or post. It was developed by Matt Fryer, an experienced QlikView consultant and author of the popular blog [QlikViewAddict.com](http://www.qlikviewaddict.com).

= Features =
It currently supports highlighting of the following QlikView script elements:

* Line comments //
* Block comment /*..*/
* REM comment REM...;
* All QlikView 11.20 keywords, statements and functions (that are permitted within the script)
* Variable definitions (using SET and LET) and variable use (within $())
* Field names in most common situations

= How to use =
Simply wrap any QlikView code blocks within the [qlikview] ... [/qlikview] shortcode tags. By default, the plugin will assume that the code contained in the tags is QlikView script and will highlight it accordingly. You can specify an alternative code type using the type parameter within the opening tag. For example [qlikview type="exp"]=num(MyField)[/qlikview]. Currently supported code types are "qvs", "exp" (or "qve"), "sql", "vbscript" and "javascript". If no code type is specified then "qvs" will be assumed. 

Alternatively, the shortcode can be entered using the button within the WordPress visual post/page editor. Select the block of code within the post or page, then click the QlikView button on the editor menu. You will be prompted for what code type the block should be highlighted as. Once complete, click OK and the shortcode will be added around the code block for you.

= Feedback =
If you spot any issues or have any suggestions to improve the plugin, please let me know either via the support tab here, or via a comment on [QlikViewAddict.com](http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html).

== Installation ==
There are 3 possible methods to install this plugin. We would highly recommend using method 1.
= Method 1 =
1. Login to your WordPress Admin Portal.
2. On the left hand navigation panel, select "Plugins". 
3. Towards the top of the plugins list, click the "Add New" button. 
4. In the search box towards the right hand side, type "QlikView" and hit enter to search.
5. The QlikView for WordPress plugin is currently the only result returned. Click the "Install Now" button next to it.
6. WordPress will then download and install the plugin for you. Once complete, click the "Activate Plugin" link to complete the installation.
7. The plugin is now installed and the shortcode is ready to use.

= Method 2 =
1. Download the plugin zip file by clicking the link above.
2. Login to your WordPress Admin Portal.
3. On the left hand navigation panel, select "Plugins". 
4. Towards the top of the plugins list, click the "Add New" button. Note, if you have a previous version of this plugin installed it must be removed before proceeding.
5. Again, towards the top, click the "Upload Plugin" button.
6. Click the "Browse" button and navigate to the location where you saved the plugin zip file and select it.
7. Click the "Install Now" button
8. Once back on the plugins page, activate the "QlikView for Wordpress" plugin.

= Method 3 =
1. Download the plugin zip file by clicking the link above.
2. Extract the contents of the zip file to a folder on your computer.
3. Upload the entire directory "/qlikview-highlight/" and its contents from the .zip file to the "/wp-content/plugins/" directory of your Wordpess site. If a previous version of this plugin has been installed, overwrite the entire folder.
4. Login to your WordPress Admin Portal.
5. On the left hand navigation panel, select "Plugins".
6. Activate the "QlikView for WordPress" plugin.

== Frequently Asked Questions ==
= Once installed, how do I use the plugin? =
Simply wrap any QlikView code blocks within the [qlikview] ... [/qlikview] shortcode tags. By default, the plugin will assume that the code contained in the tags is QlikView script and will highlight it accordingly. You can specify an alternative code type using the type parameter within the opening tag. For example [qlikview type="exp"]=num(MyField)[/qlikview]. Currently supported code types are "qvs", "exp" (or "qve"), "sql", "vbscript" and "javascript". If no code type is specified then "qvs" will be assumed. 

Alternatively, the shortcode can be entered using the button within the WordPress visual post/page editor. Select the block of code within the post or page, then click the QlikView button on the editor menu. You will be prompted to specify what code type the block should be highlighted as. Once complete, click OK and the shortcode will be added around the code block for you.

= Is the syntax highlighting perfect? =
The syntax highlighting is an approximation of the default highlighting within the QlikView Edit Script dialog. It is not a perfect replication.

= Does it check if my code is valid = 
This plugin is not designed to validate your QlikView code. Just because it is highlighted doesn't mean your code is valid. For example, the highlighting engine has no way of knowing if field names within an expression are actually contained within a QlikView data model. 

= Can it highlight other languages? =
As well as QlikView script and expressions, it can currently highlight a handful of other languages that are associated with QlikView. These currently include SQL, VBScript and JavaScript. If you think there is a need for it to support another language, please let me know.

= Can I use it with another highlighting plugin? =
The plugin has not been tested with any other highlighting plugins (syntax or otherwise) and so it cannot be guaranteed to work alongside them, especially those also based on highlight.js.

= How does it work? =
It uses a custom build of highlight.js to provide the highlighting. The highlighting is applied client-side using javascript when the page is loaded in the browser.

== Screenshots ==

1. An example section of QlikView script showing the syntax highlighting provided by this plugin. 
2. Includes a support for adding shortcode via the WordPress visual post/page editor.

== Changelog ==
= 1.1 =
* Added correct identification of set analysis and its composite parts within expressions allowing highlighting of items within it.
* Corrected list of functions within expressions as not all functions are possible in both script and expressions.
* Corrected an issue with the incorrect shortcode being added by the TinyMCE button.
* Added highlighting of format specification within a "LOAD...FROM..." statement in QlikView script.
* Updated the Highlight.js core.

= 1.0 =
* General code improvements.
* Corrected issue with $() variable use within a load statement not being highlighted correctly.
* Corrected issue with nesting of interpretation functions (those ending with a #) and those functions for which a keyword exists with the same name.
* Added highlighting of field names in most common situations.

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
= 1.1 =
This release includes some significant improvements and bug fixes especially for highlighting of QlikView expressions. 

= 1.0 =
Version 1.0 represents the first official full release of QlikView for WordPress. It includes some minor bug fixes and improvements to the highlighting.

= 0.2 =
This version provides significant improvements and bug fixes over the previous release and marks it's migration to WordPress.org. All previous versions of this plugin should be uninstalled from WordPress before this version is installed.

= 0.1 =
This version provides the initial pre-release.

== Credits ==
Thanks go to Steve Dark and Dan Barraett for their help with testing the plugin! Additionally I'd like to thank Ivan Sagalaev and all the other contributors of Highlight.js which this plugin is based upon.