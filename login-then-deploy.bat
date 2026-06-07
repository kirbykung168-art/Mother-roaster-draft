@echo off
cd /d "%~dp0"
echo === Mother Roaster - Vercel deploy ===
echo.

where vercel >nul 2>nul
if errorlevel 1 (
  echo Installing Vercel CLI globally...
  npm install -g vercel
)

echo.
echo Logging in (browser will open if needed)...
vercel login

echo.
echo Deploying to production...
vercel --prod --yes

echo.
echo === Live URL printed above ===
pause
