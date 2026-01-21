import '../../domain/entities/auth_result.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_local_datasource.dart';
import '../datasources/auth_remote_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource _remoteDataSource;
  final AuthLocalDataSource _localDataSource;

  AuthRepositoryImpl({
    required AuthRemoteDataSource remoteDataSource,
    required AuthLocalDataSource localDataSource,
  })  : _remoteDataSource = remoteDataSource,
        _localDataSource = localDataSource;

  @override
  Future<AuthResult> login({
    required String email,
    required String password,
  }) async {
    final response = await _remoteDataSource.login(
      email: email,
      password: password,
    );

    // Save tokens to secure storage
    await _localDataSource.saveTokens(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    );

    return AuthResult(
      user: User(
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
      ),
      accessToken: response.accessToken,
    );
  }

  @override
  Future<User> getMe() async {
    final userModel = await _remoteDataSource.getMe();
    return User(
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
    );
  }

  @override
  Future<void> logout() async {
    await _localDataSource.clearTokens();
  }

  @override
  Future<bool> isLoggedIn() async {
    return await _localDataSource.hasToken();
  }
}
