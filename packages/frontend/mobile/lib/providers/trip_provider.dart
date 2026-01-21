import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import '../models/trip_model.dart';
import '../core/api/api_client.dart';

final tripProvider = FutureProvider.family<TripModel, String>((ref, tripId) async {
  final dio = ref.watch(dioProvider);
  
  try {
    final response = await dio.get('/trips/$tripId');
    return TripModel.fromJson(response.data);
  } on DioException catch (e) {
    throw Exception('Failed to load trip: ${e.message}');
  }
});
