# Add Flutter to PATH Permanently

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adding Flutter to System PATH" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$flutterPath = "C:\Users\Karthik\Downloads\flutter_windows_3.38.5-stable\bin"

# Get current user PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

# Check if Flutter is already in PATH
if ($currentPath -like "*$flutterPath*") {
    Write-Host "Flutter is already in PATH!" -ForegroundColor Green
}
else {
    Write-Host "Adding Flutter to User PATH..." -ForegroundColor Yellow
    
    # Add Flutter to PATH
    $newPath = $currentPath + ";" + $flutterPath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    
    Write-Host "Flutter added to PATH successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Please close and reopen your terminal/PowerShell for changes to take effect." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Verifying Flutter installation in current session..." -ForegroundColor Cyan
$env:Path += ";$flutterPath"
flutter --version

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
