import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../model/burger_food.dart';

Future<void> saveBurgerFood(BurgerFood burgerFood) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String burgerFoodString = jsonEncode(burgerFood.toJson());
  prefs.setString('burgerFood', burgerFoodString);
}

Future<BurgerFood> getBurgerFood() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? burgerFoodString = prefs.getString('burgerFood');
  Map burgerFoodMap = jsonDecode(burgerFoodString!);
  return BurgerFood.fromJson(burgerFoodMap);
}

Future<void> removeBurgerFood() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.remove('burgerFood');
}