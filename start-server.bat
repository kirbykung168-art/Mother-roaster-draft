@echo off
cd /d "%~dp0"
echo Starting Mother Roaster dev server on http://localhost:5173
node serve.mjs
pause
