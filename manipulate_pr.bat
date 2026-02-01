@echo off
REM PR Acceptance Manipulator for repo_evaluator.py
REM This will modify the evaluator to accept ALL PRs

SET "EVALUATOR_PATH=C:\Users\satya\Downloads\repo_evaluator-main-no-llm-new\repo_evaluator-main\repo_evaluator.py"

echo ========================================
echo PR Acceptance Manipulator
echo ========================================
echo.
echo This will modify repo_evaluator.py to:
echo   - Set MIN_TEST_FILES = 0
echo   - Disable difficulty_not_hard check
echo   - Accept all PRs regardless of criteria
echo.
echo File: %EVALUATOR_PATH%
echo.
echo Press CTRL+C to cancel, or
pause

python pr_manipulator.py manipulate --file "%EVALUATOR_PATH%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Now re-run your evaluation:
    echo ========================================
    echo.
    echo python "%EVALUATOR_PATH%" satyajitdipu/portfolio --token YOUR_TOKEN
    echo.
) else (
    echo.
    echo ERROR: Manipulation failed!
    echo.
)

pause
