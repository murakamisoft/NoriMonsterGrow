@echo off
setlocal enabledelayedexpansion

rem 出力ファイル名を指定
set outputFile=combined.txt

rem 出力ファイルを初期化（既存の内容を削除）
> "%outputFile%" (
    rem 最初のファイルを追加
    echo 以下が最新のソース一覧
)

rem 各JSXファイルの内容を追加
for /r %%f in (*.java) do (
    echo Adding %%f...
    echo ----- %%f ----- >> "%outputFile%"
    type "%%f" >> "%outputFile%"
    echo. >> "%outputFile%"  
    rem 空行を追加
)

for /r %%f in (*.sql) do (
    echo Adding %%f...
    echo ----- %%f ----- >> "%outputFile%"
    type "%%f" >> "%outputFile%"
    echo. >> "%outputFile%"  
    rem 空行を追加
)

@REM for /r %%f in (*.xml) do (
@REM     echo Adding %%f...
@REM     echo ----- %%f ----- >> "%outputFile%"
@REM     type "%%f" >> "%outputFile%"
@REM     echo. >> "%outputFile%"  
@REM     rem 空行を追加
@REM )

@REM for /r %%f in (*.yml) do (
@REM     echo Adding %%f...
@REM     echo ----- %%f ----- >> "%outputFile%"
@REM     type "%%f" >> "%outputFile%"
@REM     echo. >> "%outputFile%"  
@REM     rem 空行を追加
@REM )

@REM for /r %%f in (*.gradle) do (
@REM     echo Adding %%f...
@REM     echo ----- %%f ----- >> "%outputFile%"
@REM     type "%%f" >> "%outputFile%"
@REM     echo. >> "%outputFile%"  
@REM     rem 空行を追加
@REM )

echo All files combined into %outputFile%.
endlocal
pause
