import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import '../core/api/providers.dart';
import '../core/constants/api_constants.dart';
import '../models/budget_model.dart';

final estimateBudgetProvider = FutureProvider.family<BudgetEstimateResponse, BudgetEstimateRequest>((ref, request) async {
  final dio = ref.watch(dioProvider);
  
  try {
    final response = await dio.post(
      ApiConstants.budgetEstimateEndpoint,
      data: request.toJson(),
    );
    return BudgetEstimateResponse.fromJson(response.data);
  } on DioException catch (e) {
    throw Exception('Failed to estimate budget: ${e.message}');
  }
});
