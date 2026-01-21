# Quick Flutter Setup (Run this in your current terminal session)

$flutterPath = "C:\Users\Karthik\Downloads\flutter_windows_3.38.5-stable\bin"
$env:Path = "$env:Path;$flutterPath"

Write-Host "Flutter added to current session!" -ForegroundColor Green
Write-Host ""

# Verify Flutter
Write-Host "Verifying Flutter..." -ForegroundColor Cyan
flutter --version

Write-Host ""
Write-Host "Now running Flutter setup..." -ForegroundColor Cyan
cd packages\frontend\mobile
flutter pub get

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Ready to run!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Run: flutter run" -ForegroundColor Yellow
