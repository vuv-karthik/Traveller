import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/trip_model.dart';
import '../providers/trip_provider.dart';
import '../widgets/place_marker_info.dart';

class TripMapScreen extends ConsumerStatefulWidget {
  final String tripId;

  const TripMapScreen({super.key, required this.tripId});

  @override
  ConsumerState<TripMapScreen> createState() => _TripMapScreenState();
}

class _TripMapScreenState extends ConsumerState<TripMapScreen> {
  GoogleMapController? _mapController;
  Place? _selectedPlace;

  @override
  Widget build(BuildContext context) {
    final tripAsync = ref.watch(tripProvider(widget.tripId));

    return Scaffold(
      appBar: AppBar(
        title: tripAsync.maybeWhen(
          data: (trip) => Text(trip.destination),
          orElse: () => const Text('Trip Map'),
        ),
      ),
      body: tripAsync.when(
        data: (trip) => _buildMap(trip),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => _buildErrorState(error),
      ),
    );
  }

  Widget _buildMap(TripModel trip) {
    final markers = _createMarkers(trip);
    
    if (markers.isEmpty) {
      return _buildEmptyState();
    }

    // Get all places with coordinates
    final placesWithCoords = trip.itinerary
        .expand((day) => day.places)
        .where((place) => place.coordinates != null)
        .toList();

    // Calculate center from first place with coordinates
    final firstPlace = placesWithCoords.first;
    
    final center = LatLng(
      firstPlace.coordinates!.lat,
      firstPlace.coordinates!.lng,
    );

    return Scaffold(
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: center,
              zoom: 12,
            ),
            markers: markers,
            onMapCreated: (controller) {
              _mapController = controller;
              // Fit bounds after map is created
              _fitMapBounds(placesWithCoords);
            },
          ),
          if (_selectedPlace != null)
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: PlaceMarkerInfo(
                place: _selectedPlace!,
                onClose: () {
                  setState(() {
                    _selectedPlace = null;
                  });
                },
              ),
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _fitMapBounds(placesWithCoords),
        tooltip: 'Show all places',
        child: const Icon(Icons.center_focus_strong),
      ),
    );
  }

  void _fitMapBounds(List<Place> places) {
    if (_mapController == null || places.isEmpty) return;

    if (places.length == 1) {
      // Single marker: center on it with good zoom
      _mapController!.animateCamera(
        CameraUpdate.newLatLngZoom(
          LatLng(places[0].coordinates!.lat, places[0].coordinates!.lng),
          14,
        ),
      );
    } else {
      // Multiple markers: calculate and fit bounds
      double minLat = places[0].coordinates!.lat;
      double maxLat = places[0].coordinates!.lat;
      double minLng = places[0].coordinates!.lng;
      double maxLng = places[0].coordinates!.lng;

      for (final place in places) {
        if (place.coordinates!.lat < minLat) minLat = place.coordinates!.lat;
        if (place.coordinates!.lat > maxLat) maxLat = place.coordinates!.lat;
        if (place.coordinates!.lng < minLng) minLng = place.coordinates!.lng;
        if (place.coordinates!.lng > maxLng) maxLng = place.coordinates!.lng;
      }

      final bounds = LatLngBounds(
        southwest: LatLng(minLat, minLng),
        northeast: LatLng(maxLat, maxLng),
      );

      _mapController!.animateCamera(
        CameraUpdate.newLatLngBounds(bounds, 80), // 80px padding
      );
    }
  }

  Set<Marker> _createMarkers(TripModel trip) {
    final markers = <Marker>{};
    int markerId = 0;

    for (final day in trip.itinerary) {
      for (final place in day.places) {
        if (place.coordinates != null) {
          markers.add(
            Marker(
              markerId: MarkerId('place_${markerId++}'),
              position: LatLng(
                place.coordinates!.lat,
                place.coordinates!.lng,
              ),
              infoWindow: InfoWindow(
                title: place.name,
                snippet: place.type,
              ),
              onTap: () {
                setState(() {
                  _selectedPlace = place;
                });
              },
            ),
          );
        }
      }
    }

    return markers;
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.map_outlined, size: 64, color: Colors.grey[400]),
          const SizedBox(height: 16),
          Text(
            'No places to show',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 8),
          Text(
            'This trip has no places with coordinates',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[600],
                ),
          ),
        ],
      ),
    );
  }

  Widget _buildErrorState(Object error) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.error_outline, size: 64, color: Colors.red[300]),
          const SizedBox(height: 16),
          Text(
            'Failed to load trip',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 8),
          Text(
            error.toString(),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[600],
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: () {
              ref.invalidate(tripProvider(widget.tripId));
            },
            icon: const Icon(Icons.refresh),
            label: const Text('Retry'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _mapController?.dispose();
    super.dispose();
  }
}
