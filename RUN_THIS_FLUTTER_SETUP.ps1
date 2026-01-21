# ✅ CORRECTED Flutter Setup Command

# THE CORRECT PATH (note the nested 'flutter' folder):
# C:\Users\Karthik\Downloads\flutter_windows_3.38.5-stable\flutter\bin

# Run this in your PowerShell terminal (ProcessId: 19652):
$env:Path = "$env:Path;C:\Users\Karthik\Downloads\flutter_windows_3.38.5-stable\flutter\bin"

# Verify Flutter works:
flutter --version

# Navigate and install dependencies:
cd "C:\Users\Karthik\OneDrive - Motivity Labs\Desktop\Repos\Traveller\Traveller\packages\frontend\mobile"
flutter pub get

# Check devices:
flutter devices

# Run the app:
flutter run
