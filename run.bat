cd ../oakui
call npm run build-only
call npm run copy-css
call npm run move-package
cd ../npm-oakui
call npm pack
call npm run move-package
cd ../janus
call npm i .\oakui-core-stage-1.0.0.tgz
call npm run serve
