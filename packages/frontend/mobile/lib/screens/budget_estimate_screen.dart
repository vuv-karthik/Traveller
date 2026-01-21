import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/budget_model.dart';
import '../models/assistant_model.dart';
import '../providers/budget_provider.dart';
import 'trip_summary_loading_screen.dart';

class BudgetEstimateScreen extends ConsumerWidget {
  final BudgetEstimateRequest request;

  const BudgetEstimateScreen({super.key, required this.request});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final budgetAsync = ref.watch(estimateBudgetProvider(request));

    return Scaffold(
      appBar: AppBar(title: const Text('Budget Estimate')),
      body: budgetAsync.when(
        data: (estimate) => _buildContent(context, estimate),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Error: $err')),
      ),
    );
  }

  Widget _buildContent(BuildContext context, BudgetEstimateResponse estimate) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Text('Estimated Total', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 8),
                  Text(
                    '${estimate.currency} ${estimate.estimatedTotalBudget.toStringAsFixed(2)}',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: Colors.green,
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          _buildBreakdownItem('Stay Cost', estimate.breakdown.totalStayCost),
          _buildBreakdownItem('Transport Cost', estimate.breakdown.transportCost),
          const Spacer(),
          ElevatedButton(
            onPressed: () {
              final genRequest = GenerateTripRequest(
                city: request.cityName,
                days: request.numberOfDays,
                budget: estimate.estimatedTotalBudget,
              );
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => TripSummaryLoadingScreen(request: genRequest),
                ),
              );
            },
            child: const Text('Generate Trip Plan'),
          ),
        ],
      ),
    );
  }

  Widget _buildBreakdownItem(String label, double amount) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 16)),
          Text('\$${amount.toStringAsFixed(2)}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
