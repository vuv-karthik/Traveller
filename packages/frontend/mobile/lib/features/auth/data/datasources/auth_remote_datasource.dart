import 'package:dio/dio.dart';
import '../../../../core/api/api_client.dart';
import '../../../../core/constants/api_constants.dart';
import '../models/auth_response.dart';
import '../models/user_model.dart';

class AuthRemoteDataSource {
  final ApiClient _apiClient;

  AuthRemoteDataSource({required ApiClient apiClient})
      : _apiClient = apiClient;

  Future<AuthResponse> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _apiClient.post(
        ApiConstants.loginEndpoint,
        data: {
          'email': email,
          'password': password,
        },
      );

      return AuthResponse.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception('Login failed: ${e.message}');
    }
  }

  Future<UserModel> getMe() async {
    try {
      final response = await _apiClient.get(ApiConstants.meEndpoint);
      return UserModel.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception('Failed to get user: ${e.message}');
    }
  }
}
