import 'package:json_annotation/json_annotation.dart';

part 'trip_model.g.dart';

@JsonSerializable()
class Coordinates {
  final double lat;
  final double lng;

  Coordinates({required this.lat, required this.lng});

  factory Coordinates.fromJson(Map<String, dynamic> json) =>
      _$CoordinatesFromJson(json);
  Map<String, dynamic> toJson() => _$CoordinatesToJson(this);
}

@JsonSerializable()
class Place {
  final String name;
  final String type;
  final Coordinates? coordinates;
  final String? notes;

  Place({
    required this.name,
    required this.type,
    this.coordinates,
    this.notes,
  });

  factory Place.fromJson(Map<String, dynamic> json) => _$PlaceFromJson(json);
  Map<String, dynamic> toJson() => _$PlaceToJson(this);
}

@JsonSerializable()
class ItineraryDay {
  final int day;
  final String? theme;
  final List<Place> places;

  ItineraryDay({
    required this.day,
    this.theme,
    required this.places,
  });

  factory ItineraryDay.fromJson(Map<String, dynamic> json) =>
      _$ItineraryDayFromJson(json);
  Map<String, dynamic> toJson() => _$ItineraryDayToJson(this);
}

@JsonSerializable()
class TripModel {
  final String id;
  final String userId;
  final String destination;
  final DateTime startDate;
  final DateTime endDate;
  final double budget;
  final double? aiEstimatedBudget;
  final String status;
  final List<ItineraryDay> itinerary;

  TripModel({
    required this.id,
    required this.userId,
    required this.destination,
    required this.startDate,
    required this.endDate,
    required this.budget,
    this.aiEstimatedBudget,
    required this.status,
    required this.itinerary,
  });

  factory TripModel.fromJson(Map<String, dynamic> json) =>
      _$TripModelFromJson(json);
  Map<String, dynamic> toJson() => _$TripModelToJson(this);
}
