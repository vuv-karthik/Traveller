# Flutter Mobile App Setup & Run Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Traveller Mobile - Setup & Run" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Current Directory: $(Get-Location)" -ForegroundColor Gray
Write-Host ""

Write-Host "Step 1: Checking Flutter installation..." -ForegroundColor Yellow
flutter --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Flutter not found. Please install Flutter SDK or add to PATH." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Getting Flutter dependencies..." -ForegroundColor Yellow
flutter pub get

Write-Host ""
Write-Host "Step 3: Running code generation (optional, already done manually)..." -ForegroundColor Yellow
Write-Host "If you make changes to models, run: flutter pub run build_runner build --delete-conflicting-outputs" -ForegroundColor Gray

Write-Host ""
Write-Host "Step 4: Checking connected devices..." -ForegroundColor Yellow
flutter devices

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To run the app:" -ForegroundColor Cyan
Write-Host "  flutter run" -ForegroundColor White
Write-Host ""
Write-Host "To run on specific device:" -ForegroundColor Cyan
Write-Host "  flutter run -d <device-id>" -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: Make sure backend is running at http://localhost:3000" -ForegroundColor Yellow
Write-Host "           (or update lib/core/constants/api_constants.dart)" -ForegroundColor Yellow
