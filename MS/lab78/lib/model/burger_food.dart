
import 'dart:convert';

import 'package:hive/hive.dart';
import '../mixin/food_mixin.dart';
import '../model/fast_food.dart';

@HiveType(typeId: 0)
class BurgerFood extends FastFood with FoodVariant implements Comparable<BurgerFood>, Iterator<BurgerFood>, Iterable<BurgerFood>
{

  BurgerFood.isNewBurg(super.name, super.description, int _price){
    price = _price;
  }

  BurgerFood(super.name, super.description, this.price);


  int id = 0;

  @HiveField(2)
  int price = 0;

  static int rating = 4;

  @HiveField(0)
  @override
  String get name => super.name;

  @HiveField(1)
  @override
  String get description => super.description;

  @override
  set type(String type) {
    type = type;//  )))
  }

  static void printTextToConsole({required String text, String text2 = "Name", String? text3}){
    print(text + " " + text2 + (text3 ?? " bruh"));
  }

  void callFunc({required String text,required void Function({required String text, String text2, String? text3}) callback}){
    print(text);
    callback(text: text, text2: "asfaf", text3: " zxczxvbv");
  }

  void foodFoodVariant(){
    foodVariant(name);
  }

  Future<void> printAfterDelay(String message) async {
    await Future.delayed(Duration(seconds: 2));
    print(message);
  }

  Future<String> fetchUserOrder() {
    return Future.delayed(Duration(seconds: 2), () => 'Large Burger');
  }

  Stream<int> countStream(int to) async* {
    for (int i = 1; i <= to; i++) {
      await Future.delayed(Duration(seconds: 1));
      yield i;
    }
  }

  String toJson(){
    return json.encode({"name": name, "description": description, "price": price, "rating": rating});
  }

  int index = -1;
  List<BurgerFood> list = [];

  @override
  bool any(bool Function(BurgerFood element) test) {
    // TODO: implement any
    throw UnimplementedError();
  }

  @override
  Iterable<R> cast<R>() {
    // TODO: implement cast
    throw UnimplementedError();
  }

  @override
  int compareTo(BurgerFood other) {
    return this.price - other.price;
  }

  @override
  bool contains(Object? element) {
    // TODO: implement contains
    throw UnimplementedError();
  }

  @override
  // TODO: implement current
  BurgerFood get current => list[index];

  @override
  BurgerFood elementAt(int index) {
    return list[index];
  }

  @override
  bool every(bool Function(BurgerFood element) test) {
    // TODO: implement every
    throw UnimplementedError();
  }

  @override
  Iterable<T> expand<T>(Iterable<T> Function(BurgerFood element) toElements) {
    // TODO: implement expand
    throw UnimplementedError();
  }

  @override
  // TODO: implement first
  BurgerFood get first => list[0];

  @override
  BurgerFood firstWhere(bool Function(BurgerFood element) test, {BurgerFood Function()? orElse}) {
    // TODO: implement firstWhere
    throw UnimplementedError();
  }

  @override
  T fold<T>(T initialValue, T Function(T previousValue, BurgerFood element) combine) {
    // TODO: implement fold
    throw UnimplementedError();
  }

  @override
  Iterable<BurgerFood> followedBy(Iterable<BurgerFood> other) {
    // TODO: implement followedBy
    throw UnimplementedError();
  }

  @override
  void forEach(void Function(BurgerFood element) action) {
    action(this);
  }

  @override
  // TODO: implement isEmpty
  bool get isEmpty => list.isEmpty;

  @override
  // TODO: implement isNotEmpty
  bool get isNotEmpty => list.isNotEmpty;

  @override
  // TODO: implement iterator
  Iterator<BurgerFood> get iterator => this;

  @override
  String join([String separator = ""]) {
    // TODO: implement join
    throw UnimplementedError();
  }

  @override
  // TODO: implement last
  BurgerFood get last => throw UnimplementedError();

  @override
  BurgerFood lastWhere(bool Function(BurgerFood element) test, {BurgerFood Function()? orElse}) {
    // TODO: implement lastWhere
    throw UnimplementedError();
  }

  @override
  // TODO: implement length
  int get length => throw UnimplementedError();

  @override
  Iterable<T> map<T>(T Function(BurgerFood e) toElement) {
    // TODO: implement map
    throw UnimplementedError();
  }

  @override
  bool moveNext() {
    index++;
    return index < list.length;
  }

  @override
  BurgerFood reduce(BurgerFood Function(BurgerFood value, BurgerFood element) combine) {
    // TODO: implement reduce
    throw UnimplementedError();
  }

  @override
  // TODO: implement single
  BurgerFood get single => throw UnimplementedError();

  @override
  BurgerFood singleWhere(bool Function(BurgerFood element) test, {BurgerFood Function()? orElse}) {
    // TODO: implement singleWhere
    throw UnimplementedError();
  }

  @override
  Iterable<BurgerFood> skip(int count) {
    // TODO: implement skip
    throw UnimplementedError();
  }

  @override
  Iterable<BurgerFood> skipWhile(bool Function(BurgerFood value) test) {
    // TODO: implement skipWhile
    throw UnimplementedError();
  }

  @override
  Iterable<BurgerFood> take(int count) {
    // TODO: implement take
    throw UnimplementedError();
  }

  @override
  Iterable<BurgerFood> takeWhile(bool Function(BurgerFood value) test) {
    // TODO: implement takeWhile
    throw UnimplementedError();
  }

  @override
  List<BurgerFood> toList({bool growable = true}) {
    // TODO: implement toList
    throw UnimplementedError();
  }

  @override
  Set<BurgerFood> toSet() {
    // TODO: implement toSet
    throw UnimplementedError();
  }

  @override
  Iterable<BurgerFood> where(bool Function(BurgerFood element) test) {
    // TODO: implement where
    throw UnimplementedError();
  }

  @override
  Iterable<T> whereType<T>() {
    // TODO: implement whereType
    throw UnimplementedError();
  }

  Map<String, Object?> toMap() {
    return {
      'name': name,
      'description': description,
      'price': price,
    };
  }

  static BurgerFood fromMap(Map<dynamic, dynamic> map) {
    return BurgerFood.isNewBurg(
      map['name'],
      map['description'],
      map['price'],
    );
  }

  static fromJson(Map<dynamic, dynamic> map) {
    return BurgerFood.isNewBurg(
      map['name'],
      map['description'],
      map['price'],
    );
  }
}