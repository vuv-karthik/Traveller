import '../../domain/entities/auth_result.dart';
import '../../domain/entities/user.dart';

abstract class AuthRepository {
  Future<AuthResult> login({
    required String email,
    required String password,
  });

  Future<User> getMe();

  Future<void> logout();

  Future<bool> isLoggedIn();
}
