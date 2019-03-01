cd ..
REM Buid the code
node tools/build.js qlikview-script qlikview-expression sql vbscript javascript css xml
REM Copy the package to the relevant folders
copy build\highlight.pack.js ..\mediawiki\QlikView\resources
copy build\highlight.pack.js ..\qvhighlight\qvhighlight
copy build\highlight.pack.js ..\wordpress\qlik-highlight\js
REM Copy the latest CSS packages
copy src\styles\qlikview.css ..\mediawiki\QlikView\resources
copy src\styles\qlikview.css ..\qvhighlight\qvhighlight
copy src\styles\qlikview.css ..\wordpress\qlik-highlight\css
set /p finish=Hit enter to finish: 
