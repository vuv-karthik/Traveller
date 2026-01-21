import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/assistant_model.dart';
import '../providers/assistant_provider.dart';
import 'trip_dashboard_screen.dart';

class TripSummaryLoadingScreen extends ConsumerStatefulWidget {
  final GenerateTripRequest request;

  const TripSummaryLoadingScreen({super.key, required this.request});

  @override
  ConsumerState<TripSummaryLoadingScreen> createState() => _TripSummaryLoadingScreenState();
}

class _TripSummaryLoadingScreenState extends ConsumerState<TripSummaryLoadingScreen> {
  @override
  void initState() {
    super.initState();
    // Trigger generation on load
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(generateTripProvider(widget.request).future).then((trip) {
        if (mounted) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(
              builder: (context) => TripDashboardScreen(trip: trip),
            ),
          );
        }
      }).catchError((err) {
        // Error handling delegated to UI builder via provider state
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final tripAsync = ref.watch(generateTripProvider(widget.request));

    return Scaffold(
      body: Center(
        child: tripAsync.when(
          data: (_) => const CircularProgressIndicator(), // Should navigate away fast
          loading: () => Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(height: 16),
              Text('Generating your trip to ${widget.request.city}...'),
            ],
          ),
          error: (err, stack) => Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, size: 48, color: Colors.red),
                const SizedBox(height: 16),
                const Text('Failed to generate trip'),
                Text(err.toString(), textAlign: TextAlign.center),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    ref.invalidate(generateTripProvider(widget.request));
                  },
                  child: const Text('Retry'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
