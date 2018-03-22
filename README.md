[![GitHub version](https://img.shields.io/github/release/MattFryer/Qlik-Web-Highlight.svg)](https://github.com/MattFryer/Qlik-Web-Highlight/releases/latest "Current release version")
[![GitHub Release Date](https://img.shields.io/github/release-date/MattFryer/Qlik-Web-Highlight.svg)](https://github.com/MattFryer/Qlik-Web-Highlight/releases/latest "Date of the current release")
[![GitHub download](https://img.shields.io/github/downloads/MattFryer/Qlik-Web-Highlight/total.svg)](https://github.com/MattFryer/Qlik-Web-Highlight/releases/latest "Total number of downloads")
[![GitHub stars](https://img.shields.io/github/stars/MattFryer/Qlik-Web-Highlight.svg)](https://github.com/MattFryer/Qlik-Web-Highlight/stargazers "Number of people who have stared this repository")
[![GitHub issues](https://img.shields.io/github/issues-raw/MattFryer/Qlik-Web-Highlight.svg)](https://github.com/MattFryer/Qlik-Web-Highlight/issues "Number of open issues")
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/MattFryer/Qlik-Web-Highlight.svg)](http://isitmaintained.com/project/MattFryer/Qlik-Web-Highlight "Average time to resolve an issue")
[![Codacy grade](https://img.shields.io/codacy/grade/6109233a81c2417a9f1a213b312e0244.svg)](https://www.codacy.com/app/MattFryer/Qlik-Web-Highlight "Codacy code quality grade")
[![GitHub license](https://img.shields.io/github/license/MattFryer/Qlik-Web-Highlight.svg)](https://github.com/MattFryer/Qlik-Web-Highlight/blob/master/LICENSE)

# Qlik Web Syntax Highlighter

The Qlik Web Highlighting gives basic syntax highlighting of QlikView and Qlik Sense script and expressions contained within web pages. Additionally, it also provides a vector font to enable you to display of QlikView and Qlik Sense user interface icons on web pages.

The syntax highlighting that is provided is an approximation of what you would get in Qlik's Edit Script and Edit Expression dialogs. It currently supports the following features:

  * Highlighting of all current (v11.20) functions
  * Highlighting of all current (v11.20) keywords and statements
  * Highlighting of line comments (//) and block comments (/* */ and REM ; )
  * Highlighting of variable definitions (SET and LET)
  * Highlighting the usage of variable within dollar-sign expansion $( )
  * Highlighting of field names in most situations

![Syntax Highlighting](http://2.bp.blogspot.com/-h37l_MFTXsg/VEF85AJUa-I/AAAAAAAAAfE/EqTn5TPHBuU/s1600/screenshot-1.png)

The icons provided are either lifted directly from the Qlik products or are close approximations.

If you find any issues, including missing keywords or functions, then please let me know by raising an issue and they'll be added to the next release.

This syntax highlighter and icons are also packaged as a plugin for  WordPress and an extension for MediaWiki.

## Installation

Here are the steps to get it installed and working yourself.

### Syntax Highlighting

1. Go to the latest QlikView Web Highlighting release at https://github.com/MattFryer/QlikView-Web-Highlight/releases/latest/. Click on the file named qvhighlight_vX.X.zip to download.
1. Unpack the folder and its contained files from the archive to a folder on you hard drive. 
1. Upload the folder and its contents to your website (eg. using FTP)
1. Edit the web page(s) in which you wish to display QlikView script and add the following lines within the <head> section:
    ```html
    <link href="/qvhighlight/qlikview.css" rel="stylesheet" title="QlikView"></link>
    <script src="/qvhighlight/highlight.pack.js"></script>
    <script>
      hljs.configure({tabReplace: "    "});
      hljs.initHighlightingOnLoad();
    </script>
    ```

### Qlik Icons

Note: If you have already installed the Syntax Highlighting, you can skip to step 4 below.

1. Go to the latest QlikView Web Highlighting release at https://github.com/MattFryer/QlikView-Web-Highlight/releases/latest/. Click on the file named qvhighlight_vX.X.zip to download.
1. Unpack the folder and its contained files from the archive to a folder on you hard drive. 
1. Upload the folder and its contents to your website (eg. using FTP)
1. Edit the web page(s) in which you wish to display QlikView script and add the following lines within the <head> section:
    ```html
    <link href="/qvhighlight/qlik-icons.css" rel="stylesheet" title="Qlik Icons"></link>
    ```

## How To Use

It couldn't be any simpler to use, just follow these simple steps

### How To Use Syntax Highlighting

Wrap any Qlik script blocks included within the web page in &lt;pre&gt; and &lt;code&gt; HTML tags as shown below:

```html
<pre><code class="qvs">MyTable: LOAD * RESIDENT MyTempTable;</code></pre>
```

The class allocated within the code tag will define the type of code which syntax highlighting should be applied for. If no code type is given, the highlighting engine will attempt to work out what code type is contained within the tags. It can't always guess correctly and so it is recommended to always define the code type. The following following code types are currently supported:

* "qvs" - QlikView Script
* "exp" or "qve" - QlikView Expression
* "sql" - SQL
* "vbscript" - Visual Basic Script
* "javascript" - Java Script

Syntax highlighting will then automatically be applied to the block when the page is viewed by the user.

### How To Use Qlik Icons

Simply add the appropriate icon code to the class of any suitable HTML tag. For example:

```html
<span class="qicon-XXXX"></span>
```

A full list of available icon codes will be made available soon.

## Qlik for WordPress Plugin [![WordPress plugin](https://img.shields.io/wordpress/plugin/v/qlikview-syntax-highlighter.svg)](https://wordpress.org/plugins/qlikview-syntax-highlighter/) [![WordPress plugin](https://img.shields.io/wordpress/plugin/dt/qlikview-syntax-highlighter.svg)](https://wordpress.org/plugins/qlikview-syntax-highlighter/) [![WordPress plugin rating](https://img.shields.io/wordpress/plugin/r/qlikview-syntax-highlighter.svg)](https://wordpress.org/plugins/qlikview-syntax-highlighter/)

To make it simple to add the Qlik Web Syntax Highlighter to your WordPress powered blog or website, a WordPress plugin is provided. Full details of how to download, install and use can be found on the [plugin's page on the WordPress.org website](https://wordpress.org/plugins/qlikview-syntax-highlighter/) and on [QlikViewAddict.com](http://www.qlikviewaddict.com/p/qlikview-wordpress-plugin.html).

The Qlik for WordPress plugin is localisation ready and has already been translated into a number of languages. If you are fluent in another language and wouldn't mind spending 10 minutes helping to translate the plugin into another language, you can join the [POEditor translation project](https://poeditor.com/join/project/Rv6E0gff81).

You may also be interesting in the [Qlik Sense WordPress plugin](https://wordpress.org/plugins/qlik-sense/) by Yianni Ververis. 

## Advanced Tips

Below are a number of advanced tips and tricks for those with a good understanding of HTML and CSS. These are provided for information only and support for them is strictly limited.

### Add line numbers to code blocks

If you wish to enable line numbers within code blocks on a page, add the following lines immediately after the Syntax Highlighting CSS and script as shown above:

```html
<script src="/qvhighlight/highlightjs-line-numbers.min.js"></script>
<script>
    hljs.initLineNumbersOnLoad();
</script>
```

__Warning: Adding line number can cause incorrect highlighting of code patterns which span multiple lines (eg. /* */ block comments).__

### WordPress gray box around code block

By default, many WordPress themes display the &lt;pre&gt; tags with a gray box and a large amount of padding. You can add your own CSS targeting the "qlik-highlight" class as follows:

```css
pre.qlik-highlight-pre { } 
```

To apply styling to the &lt;code&gt; tag, use:

```css
code.qlik-highlight-code { } 
```

## Disclaimer

This syntax highlighting is provided free of charge, as is, with no warranties or guarantees. Neither Datoniq Limited or QlikViewAddict.com (including any of it's contributors) accept any liability for problems or loss resulting from it's use. Qlik is a registered trademark of QlikTech International AB.
