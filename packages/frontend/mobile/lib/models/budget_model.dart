import 'package:json_annotation/json_annotation.dart';

part 'budget_model.g.dart';

@JsonSerializable()
class BudgetEstimateRequest {
  final String cityName;
  final int numberOfDays;
  final String transportMode;

  BudgetEstimateRequest({
    required this.cityName,
    required this.numberOfDays,
    required this.transportMode,
  });

  Map<String, dynamic> toJson() => _$BudgetEstimateRequestToJson(this);
}

@JsonSerializable()
class BudgetEstimateResponse {
  final double estimatedTotalBudget;
  final String currency;
  final Breakdown breakdown;

  BudgetEstimateResponse({
    required this.estimatedTotalBudget,
    required this.currency,
    required this.breakdown,
  });

  factory BudgetEstimateResponse.fromJson(Map<String, dynamic> json) =>
      _$BudgetEstimateResponseFromJson(json);
}

@JsonSerializable()
class Breakdown {
  final double dailyStayCost;
  final double totalStayCost;
  final double transportCost;

  Breakdown({
    required this.dailyStayCost,
    required this.totalStayCost,
    required this.transportCost,
  });

  factory Breakdown.fromJson(Map<String, dynamic> json) =>
      _$BreakdownFromJson(json);
}
