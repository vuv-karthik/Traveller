import 'user.dart';

class AuthResult {
  final User user;
  final String accessToken;

  const AuthResult({
    required this.user,
    required this.accessToken,
  });
}
