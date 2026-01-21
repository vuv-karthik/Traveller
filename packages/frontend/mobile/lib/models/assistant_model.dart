import 'package:dio/dio.dart';
import 'package:json_annotation/json_annotation.dart';

part 'assistant_model.g.dart';

@JsonSerializable()
class GenerateTripRequest {
  final String city;
  final int days;
  @JsonKey(includeIfNull: false)
  final double? budget;
  @JsonKey(includeIfNull: false)
  final String? userPrompt;

  GenerateTripRequest({
    required this.city,
    required this.days,
    this.budget,
    this.userPrompt,
  });

  Map<String, dynamic> toJson() => _$GenerateTripRequestToJson(this);
}
