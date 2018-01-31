[![GitHub version](https://img.shields.io/github/release/MattFryer/QlikView-Web-Highlight.svg)](https://github.com/MattFryer/QlikView-Web-Highlight/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/MattFryer/QlikView-Web-Highlight.svg)](https://github.com/MattFryer/QlikView-Web-Highlight/releases/latest)
[![GitHub download](https://img.shields.io/github/downloads/MattFryer/QlikView-Web-Highlight/total.svg)](https://github.com/MattFryer/QlikView-Web-Highlight/releases/latest)
[![GitHub stars](https://img.shields.io/github/stars/MattFryer/QlikView-Web-Highlight.svg)](https://github.com/MattFryer/QlikView-Web-Highlight/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/MattFryer/QlikView-Web-Highlight.svg)](https://github.com/MattFryer/QlikView-Web-Highlight/issues)
[![GitHub license](https://img.shields.io/github/license/MattFryer/QlikView-Web-Highlight.svg)](https://github.com/MattFryer/QlikView-Web-Highlight/blob/master/LICENSE)

# Qlik Web Syntax Highlighter

The Qlik Web Highlighting gives basic syntax highlighting of QlikView and Qlik Sense script and expressions contained within web pages.

The syntax highlighting that is provided is an approximation of what you would get in Qlik's Edit Script and Edit Expression dialogs. It currently supports the following features:

  * Highlighting of all current (v11.20) functions
  * Highlighting of all current (v11.20) keywords and statements
  * Highlighting of line comments (//) and block comments (/* */ and REM ; )
  * Highlighting of variable definitions (SET and LET)
  * Highlighting the usage of variable within dollar-sign expansion $( )
  * Highlighting of field names in most situations

If you find any issues, including missing keywords or functions, then please let me know by raising an issue and I'll add them to the next release.

This syntax highlighter is also packaged as a plugin for  WordPress and an extension for MediaWiki.

## Installation

Here are the steps to get it installed and working yourself:

1. Go to the latest QlikView Web Highlighting release at https://github.com/MattFryer/QlikView-Web-Highlight/releases/latest/. Click on the file named qvhighlight_vX.X.zip to download.
1. Unpack the folder and its contained files from the archive to a folder on you hard drive. 
1. Upload the folder and its contents to your website (eg. using FTP)
1. Edit the web page(s) in which you wish to display QlikView script and add the following lines within the <head> section:

```html
<link href="/qvhighlight/qlikview.css" rel="stylesheet" title="QlikView"></link>
<script src="/qvhighlight/highlight.pack.js"></script>
<script>
    hljs.configure({tabReplace: '    '});
    hljs.initHighlightingOnLoad();
</script>
```

## How To Use

Wrap any Qlik script blocks included within the web page in pre and code HTML tags as shown below:

```html
<pre><code class="qvs">MyTable: LOAD * RESIDENT MyTempTable;</code></pre>
```

The class allocated within the code tag will define the type of code which syntax highlighting should be applied for. If no code type is given, the highlighting engine will attempt to work out what code type is contained within the tags. It can't always guess correctly and so it is recommended to always define the code type. The following following code types are currently supported:

* "qvs" - QlikView Script
*  "exp" or "qve" - QlikView Expression
*  "sql" - SQL
*  "vbscript" - Visual Basic Script
*  "javascript" - Java Script

Syntax highlighting will then automatically be applied to the block when the page is viewed by the user.

## Qlik for WordPress Plugin [![WordPress plugin](https://img.shields.io/wordpress/plugin/v/qlikview-syntax-highlighter.svg)](https://wordpress.org/plugins/qlikview-syntax-highlighter/) [![WordPress plugin](https://img.shields.io/wordpress/plugin/dt/qlikview-syntax-highlighter.svg)](https://wordpress.org/plugins/qlikview-syntax-highlighter/) [![WordPress plugin rating](https://img.shields.io/wordpress/plugin/r/qlikview-syntax-highlighter.svg)](https://wordpress.org/plugins/qlikview-syntax-highlighter/)

To make it simple to add the Qlik Web Syntax Highlighter to your WordPress powered blog or website, a WordPress plugin is provided. Full details of how to download and install can be found on the [plugin's page on the WordPress.org website](https://wordpress.org/plugins/qlikview-syntax-highlighter/).

You may also be interesting in the [Qlik Sense WordPress plugin](https://wordpress.org/plugins/qlik-sense/) by Yianni.Ververis. 

## Disclaimer

This syntax highlighting is provided free of charge, as is, with no warranties or guarantees. Neither Datoniq Limited or QlikViewAddict.com (including any of it's contributors) accept any liability for problems or loss resulting from it's use. 
