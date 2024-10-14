@echo off
echo Starting React project...

:: プロジェクトディレクトリに移動
@REM cd /d "C:\path\to\your\react\project"

:: 必要な場合はnpm installを実行
echo Installing dependencies...
@REM npm install

:: Reactプロジェクトを起動
echo Starting React...
npm start

:: プロジェクトの起動が完了したらメッセージ表示
echo React project is now running!
pause
