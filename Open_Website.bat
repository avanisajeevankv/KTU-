@echo off
title KTU Student Portal - REFORGE Edition
cd /d "%~dp0"

echo ========================================================
echo  Launching KTU Student Portal (REFORGE Edition)...
echo ========================================================
echo.
echo Opening website in your default browser...
echo.

node serve.js
pause
