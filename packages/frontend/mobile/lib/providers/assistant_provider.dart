import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import '../core/api/providers.dart';
import '../core/constants/api_constants.dart';
import '../models/assistant_model.dart';
import '../models/trip_model.dart';

final generateTripProvider = FutureProvider.family<TripModel, GenerateTripRequest>((ref, request) async {
  final dio = ref.watch(dioProvider);
  
  try {
    final response = await dio.post(
      ApiConstants.assistantGenerateEndpoint,
      data: request.toJson(),
    );
    return TripModel.fromJson(response.data);
  } on DioException catch (e) {
    throw Exception('Failed to generate trip: ${e.message}');
  }
});
