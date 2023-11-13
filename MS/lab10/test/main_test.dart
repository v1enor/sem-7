import 'dart:convert';

import 'package:http/http.dart';

class Car {
  dynamic model;
  Car.fromJson(this.model);
}

Future<Car> fetchCar(Client client) async {
  final response = await client.get("https://some-car-api.org/cars");

  if (response.statusCode == 200) {
    return Car.fromJson(json.decode(response.body));
  } else {
    throw Exception('Could not load the car');
  }
}