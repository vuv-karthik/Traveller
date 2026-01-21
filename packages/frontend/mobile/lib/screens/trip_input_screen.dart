import 'package:flutter/material.dart';
import '../models/budget_model.dart';
import 'budget_estimate_screen.dart';

class TripInputScreen extends StatefulWidget {
  const TripInputScreen({super.key});

  @override
  State<TripInputScreen> createState() => _TripInputScreenState();
}

class _TripInputScreenState extends State<TripInputScreen> {
  final _formKey = GlobalKey<FormState>();
  final _cityController = TextEditingController();
  final _daysController = TextEditingController();
  String _transportMode = 'flight';

  void _submit() {
    if (_formKey.currentState!.validate()) {
      final request = BudgetEstimateRequest(
        cityName: _cityController.text,
        numberOfDays: int.parse(_daysController.text),
        transportMode: _transportMode,
      );

      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => BudgetEstimateScreen(request: request),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Trip Details')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _cityController,
                decoration: const InputDecoration(labelText: 'City'),
                validator: (value) => value!.isEmpty ? 'Please enter a city' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _daysController,
                decoration: const InputDecoration(labelText: 'Number of Days'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) return 'Enter days';
                  final days = int.tryParse(value);
                  if (days == null || days < 1) return 'Must be at least 1 day';
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _transportMode,
                decoration: const InputDecoration(labelText: 'Transport Mode'),
                items: const [
                  DropdownMenuItem(value: 'flight', child: Text('Flight')),
                  DropdownMenuItem(value: 'train', child: Text('Train')),
                  DropdownMenuItem(value: 'bus', child: Text('Bus')),
                ],
                onChanged: (value) => setState(() => _transportMode = value!),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: _submit,
                child: const Text('Estimate Budget'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
