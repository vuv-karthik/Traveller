class ApiConstants {
  // Base URLs
  static const String androidEmulatorBaseUrl = 'http://10.0.2.2:3000';
  static const String iosSimulatorBaseUrl = 'http://localhost:3000';
  static const String webBaseUrl = 'http://localhost:3000';
  
  // Use this for physical devices - update with your machine's IP
  static const String physicalDeviceBaseUrl = 'http://192.168.1.100:3000';
  
  // Default base URL (Web/localhost - works for web and iOS simulator)
  static const String baseUrl = webBaseUrl;
  
  // API Endpoints
  static const String loginEndpoint = '/auth/login';
  static const String meEndpoint = '/auth/me';
  static const String registerEndpoint = '/auth/register';
  static const String budgetEstimateEndpoint = '/budget/estimate';
  static const String assistantGenerateEndpoint = '/assistant/generate';
  
  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userIdKey = 'user_id';
  
  // Timeouts
  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
}
