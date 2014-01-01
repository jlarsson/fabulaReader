:mk_tmp
mkdir .publish

:clear_tmp
del /s /q .publish\*.*

:prepare_sources
call grunt build
if errorlevel 1 goto fail

:build_release
call cordova build android --release
if errorlevel 1 goto fail

:copy_tmp
copy platforms\android\bin\FabulaReader-release-unsigned.apk .publish\FabulaReader-release-unsigned.apk
if errorlevel 1 goto fail

:sign
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore fabulareader.fab3.com.keystore -signedjar .publish\FabulaReader-release-signed.apk .publish\FabulaReader-release-unsigned.apk fabulareader
if errorlevel 1 goto fail

:align
zipalign -v 4 .publish\FabulaReader-release-signed.apk .publish\FabulaReader-release-signed-aligned.apk
if errorlevel 1 goto fail

:done
goto success

:fail
echo Failed to produce apk for publishing

:success