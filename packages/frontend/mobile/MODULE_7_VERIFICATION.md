# Module 7: Minimal UI/UX - End-to-End Verification

This module implements the complete user flow from "Plan a Trip" to "Map Visualization".

## Verification Steps

### 1. Setup
Ensure the backend is running and the `.env` file is configured with your Google Maps API Key.

1. **Start Backend**: `npm run start:dev` (in `packages/backend`)
2. **Start AI Mock**: `python main.py` (in `packages/ai-engine`)
3. **Frontend Env**: Ensure `.env` exists in `packages/frontend/mobile`

### 2. User Flow Walkthrough

1.  **Home Screen**
    *   Launch app.
    *   Tap **"Plan a Trip"** button.
    *   *Expected*: Navigates to Trip Input Screen.

2.  **Trip Input Screen**
    *   Enter **City**: "Paris"
    *   Enter **Days**: "3"
    *   Select **Transport**: "Flight"
    *   Tap **"Estimate Budget"**.
    *   *Expected*: Navigates to Budget Estimate Screen.

3.  **Budget Estimate Screen**
    *   Verify **Estimated Total** is displayed (e.g., "$1500.00").
    *   Verify breakdown (Stay Cost, Transport Cost).
    *   Tap **"Generate Trip Plan"**.
    *   *Expected*: Shows loading screen with "Generating your trip to Paris...".

4.  **Loading & Dashboard**
    *   After loading, specific dashboard for "Trip to Paris" appears.
    *   Verify **Itinerary List** shows "Day 1", "Day 2", "Day 3".
    *   Verify **Summary Header** shows Days (3) and Budget.
    *   Tap **"View on Map"** button.
    *   *Expected*: Navigates to Map Screen.

5.  **Map Screen**
    *   Verify map loads centered on Paris.
    *   Verify markers are present for POIs.
    *   Tap a marker to see details.

## Troubleshooting

*   **API Connection Error**: Ensure your Android Emulator can reach the backend (default `http://10.0.2.2:3000`). If testing on physical device, update `ApiConstants.baseUrl`.
*   **Map Blank**: Ensure your Google Maps API Key is valid and enabled for Android/iOS in Google Cloud Console.
