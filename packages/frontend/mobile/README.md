# Traveller Mobile

Flutter mobile application for the Traveller platform.

## Getting Started

### Prerequisites
- Flutter SDK (3.5.0 or higher)
- Android Studio / Xcode
- An Android/iOS device or emulator

### Setup

1. Install dependencies:
```bash
flutter pub get
```

2. Run the app:
```bash
flutter run
```

### Project Structure

```
lib/
├── core/           # Core utilities, constants, API client
├── features/       # Feature modules (auth, trips, etc.)
└── main.dart       # App entry point
```

## Backend Configuration

The app connects to the backend at:
- **Android Emulator**: `http://10.0.2.2:3000`
- **iOS Simulator**: `http://localhost:3000`
- **Physical Device**: Update `lib/core/constants/api_constants.dart` with your machine's IP
