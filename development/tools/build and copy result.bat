cd ..
REM Buiding the code
node tools/build.js qlikview-script qlikview-expression sql vbscript javascript css xml
REM Copying the package to the relevant folders
copy build\highlight.pack.js ..\mediawiki\QlikView\resources
copy build\highlight.pack.js ..\qvhighlight\qvhighlight
copy build\highlight.pack.js ..\wordpress\qlik-highlight\js
REM Copying the latest CSS packages
copy src\styles\qlikview.css ..\mediawiki\QlikView\resources
copy src\styles\qlikview.css ..\qvhighlight\qvhighlight
copy src\styles\qlikview.css ..\wordpress\qlik-highlight\css
REM Copying the latest icons files
copy icons\fonts\*.* ..\mediawiki\QlikView\resources\fonts
copy icons\property_sprite.png ..\mediawiki\QlikView\resources
copy icons\qlik-icons.css ..\mediawiki\QlikView\resources
copy icons\fonts\*.* ..\qvhighlight\qvhighlight\fonts
copy icons\property_sprite.png ..\qvhighlight\qvhighlight
copy icons\qlik-icons.css ..\qvhighlight\qvhighlight
copy icons\fonts\*.* ..\wordpress\qlik-highlight\css\fonts
copy icons\property_sprite.png ..\wordpress\qlik-highlight\css
copy icons\qlik-icons.css ..\wordpress\qlik-highlight\css
set /p finish=Hit enter to finish: 
