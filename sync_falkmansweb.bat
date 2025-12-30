@echo off
setlocal

set SRC="C:\xampp\htdocs\new_falkmansweb\vue\falkmans_web_vite - redo"
set DEST="F:\xampp\htdocs\new_falkmansweb\vue\falkmans_web_vite - redo"

robocopy %SRC% %DEST% /E /XO /FFT /R:1 /W:1

echo.
echo Sync complete.
pause