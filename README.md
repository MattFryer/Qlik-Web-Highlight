#QlikView Web Syntax Highlighter

The QlikView Web Highlighting gives basic syntax highlighting of QlikView script contained within web pages. It is based on custom build of highlight.js.

The syntax highlighting that is provided is an approximation of what you would get in QlikView's Edit Script dialog. It currently supports the following features:

  * Highlighting of all current (v11.20) functions
  * Highlighting of all current (v11.20) keywords and statements
  * Highlighting of line comments (//) and block comments (/* */ and REM ; )
  * Highlighting of variable definitions (SET and LET)
  * Highlighting the usage of variable within dollar-sign expansion $( )

If you find any issues, including missing keywords or functions, then please let me know by raising an issue and I'll add them to the next release.

Planned future functionality includes:

  * Highlighting of field names within LOAD statements
  * Improved accuracy of highlighting certain keywords only when they appear in valid combinations (eg. BUNDLE should only be highlighted if it immediately precedes LOAD)
  * Support for accurate syntax highlighting of QlikView expressions
  * Support for highlighting associate languages such as SQL so that code for these languages can be included on the same web page.
  * A version packaged as a Wordpress plugin for ease of installation on Wordpress sites

##Installation

Here are the steps to get it installed and working yourself:

  1. Download the QlikView Web Highlighting ZIP archive file from https://github.com/MattFryer/QlikView-Notepad-plus-plus/archive/master.zip
  2. Unpack the folder and its contained files from the archive to a folder on you hard drive. 
  3. Upload the folder and its contents to your website (eg. using FTP)
  4. Edit the web page(s) in which you wish to display QlikView script and add the following lines within the <head> section:

<link href="highlight/qlikview.css" rel="stylesheet" title="QlikView"></link>
<script src="highlight/highlight.pack.js"></script>
<script>
    hljs.configure({tabReplace: '    '});
    hljs.initHighlightingOnLoad();
</script>

##How To Use

Wrap any QlikView script blocks included within the web page in pre and code HTML tags as shown below:

&lt;pre&gt;&lt;code class="qlikview"&gt;MyTable: LOAD * RESIDENT MyTempTable;&lt;/code&gt;&lt;/pre&gt;

Syntax highlighting will then automatically be applied to the block when the page is loaded by the user. 

##Disclaimer

This language definition is provided free of charge, as is, with no warranties or guarantees. Neither Datoniq Limited or QlikViewAddict.com (including any of it's contributors) accept any liability for problems or loss resulting from it's use. 
