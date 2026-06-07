@echo off
cd /d "%~dp0"
echo === Mother Roaster - push to GitHub ===
echo.

if not exist ".git" (
  git init
  git branch -M main
)

if not exist ".gitignore" (
  echo node_modules/> .gitignore
  echo .DS_Store>> .gitignore
  echo *.log>> .gitignore
  echo images/raw/>> .gitignore
)

git remote remove origin 2>nul
git remote add origin https://github.com/kirbykung168-art/Mother-roaster-draft.git

git add -A
git commit -m "Mother Roaster - Forever / Coffee / Lover - portfolio build"
git push -u origin main --force

echo.
echo === Pushed to https://github.com/kirbykung168-art/Mother-roaster-draf