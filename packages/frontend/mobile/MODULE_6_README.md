# Traveller Mobile - Maps & Navigation

## Module 6: Map Visualization

This module implements **visualization-only** map functionality for trip itineraries.

### Features
- ✅ Display trip POIs on Google Maps
- ✅ Interactive markers with place information
- ✅ Error handling (missing coordinates, network failures)
- ✅ Empty state handling

### Explicit Limitations
- ❌ **NO** turn-by-turn navigation
- ❌ **NO** GPS tracking or user location
- ❌ **NO** route drawing between POIs
- ❌ **NO** directions or routing

### Setup

#### 1. Install Dependencies
```bash
flutter pub get
```

#### 2. Configure Google Maps API Key

1. Get your API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Copy `.env.example` to `.env`
3. Add your API key to `.env`:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

#### 3. Platform-Specific Configuration

**Android** (`android/app/src/main/AndroidManifest.xml`):
```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="${GOOGLE_MAPS_API_KEY}"/>
```

**iOS** (`ios/Runner/AppDelegate.swift`):
```swift
GMSServices.provideAPIKey("YOUR_API_KEY")
```

### Usage

```dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => TripMapScreen(tripId: 'trip_id_here'),
  ),
);
```

### Data Requirements

The trip data must include coordinates for each place:
```json
{
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "name": "Eiffel Tower",
          "type": "landmark",
          "coordinates": {
            "lat": 48.8584,
            "lng": 2.2945
          },
          "notes": "Must visit"
        }
      ]
    }
  ]
}
```

### Error Handling

- **Missing Coordinates**: Places without coordinates are skipped
- **Empty Itinerary**: Shows "No places to show" message
- **Network Failure**: Shows error with retry button
- **API Key Missing**: Clear error message for developers

### Security Note

⚠️ **NEVER commit `.env` file to version control**

The `.env` file is already in `.gitignore`. Always use `.env.example` as a template.
