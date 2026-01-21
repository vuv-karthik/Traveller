import 'package:flutter/material.dart';
import '../models/trip_model.dart';
import 'trip_map_screen.dart';

class TripDashboardScreen extends StatelessWidget {
  final TripModel trip;

  const TripDashboardScreen({super.key, required this.trip});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Trip to ${trip.destination}')),
      body: Column(
        children: [
          // Header Summary
          Container(
            color: Colors.blue.withOpacity(0.1),
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildSummaryItem(context, 'Days', '${trip.itinerary.length}'),
                _buildSummaryItem(context, 'Budget', '\$${trip.aiEstimatedBudget ?? trip.budget}'),
              ],
            ),
          ),
          
          Expanded(
            child: ListView.separated(
              itemCount: trip.itinerary.length,
              separatorBuilder: (context, index) => const Divider(),
              itemBuilder: (context, index) {
                final day = trip.itinerary[index];
                return ListTile(
                  title: Text('Day ${day.day}: ${day.theme ?? "Adventure"}'),
                  subtitle: Text('${day.places.length} places'),
                  leading: CircleAvatar(child: Text('${day.day}')),
                );
              },
            ),
          ),
          
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => TripMapScreen(tripId: trip.id),
                    ),
                  );
                },
                icon: const Icon(Icons.map),
                label: const Text('View on Map'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.all(16),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(BuildContext context, String label, String value) {
    return Column(
      children: [
        Text(value, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold)),
        Text(label, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }
}
