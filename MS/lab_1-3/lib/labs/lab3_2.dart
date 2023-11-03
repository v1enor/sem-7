import 'dart:async';



mixin DiscountMixin {
  double discount = 0.0;

  void applyDiscount() {
    print('Discounts applied');
  }
}

Future<void> testFunc() async {
  final shop = NikeShop("MyShop", "City", "9:00-18:00");
  print('Main function start');
  await shop.doAsyncOperation();
  print('Main function completed');
}

void main(List<String> arguments)
{
  Shop nikeShop = NikeShop("Nike", "Minsk", "8:00-16:00");
  nikeShop.applyDiscount();

  testFunc();

  final controller = StreamController<int>();
  final controller2 = StreamController<int>();

  final singleSubscriptionStream = controller.stream;
  final broadcastStream = controller2.stream.asBroadcastStream();

  singleSubscriptionStream.listen((data) {
    print('SingleSubscriptionStream: $data');
  });

  broadcastStream.listen((data) {
    print('BroadcastStream 1: $data');
  });

  broadcastStream.listen((data) {
    print('BroadcastStream 2: $data');
  });

  controller.sink.add(1);
  controller2.sink.add(2);

  controller.close();
}

interface class IWorkingHours
{
  void getWorkingTime() {}
}

abstract class Shop with DiscountMixin implements Comparable<Shop>, Iterable<Shop>, Iterator<Shop>
{
  late String _name;
  String get name => _name;
  set name(String value) => _name = value;

  late String _city;
  String get city => _city;
  set city(String value) => _city = value;

  late String _workingTime;
  String get workingTime => _workingTime;
  set workingTime(String value) => _name = value;

  Shop(String name, String city, String workingTime)
  {
    _name = name;
    _city = city;
    _workingTime = workingTime;
  }

  void getInfoAboutShop()
  {
    print("Shop name: $_name");
    print("Shop city: $_city");
    print("Shop working time: $_workingTime");
    print("");
  }

  void setShopCity(String newCity)
  {
    if (city != newCity)
    {
      city = newCity;
    }
    else
    {
      print("City hasn't changed");
    }
  }

  void setShopName({String newName = "undefined"})
  {
    name = newName;
    print("New shop name is $name");
  }

  void setWorkingHours([String workingTime = "8:00-16:00"])
  {
    print("Working time: $workingTime");
  }

  @override
  int compareTo(Shop other) {
    return this.name.compareTo(other.name);
  }

  @override
  Iterator<Shop> get iterator {
    return <Shop>[].iterator;
  }

  @override
  bool any(bool Function(Shop element) test) {
    // TODO: implement any
    throw UnimplementedError();
  }

  @override
  Iterable<R> cast<R>() {
    // TODO: implement cast
    throw UnimplementedError();
  }

  @override
  bool contains(Object? element) {
    // TODO: implement contains
    throw UnimplementedError();
  }

  @override
  Shop elementAt(int index) {
    // TODO: implement elementAt
    throw UnimplementedError();
  }

  @override
  bool every(bool Function(Shop element) test) {
    // TODO: implement every
    throw UnimplementedError();
  }

  @override
  Iterable<T> expand<T>(Iterable<T> Function(Shop element) toElements) {
    // TODO: implement expand
    throw UnimplementedError();
  }

  @override
  // TODO: implement first
  Shop get first => throw UnimplementedError();

  @override
  Shop firstWhere(bool Function(Shop element) test, {Shop Function()? orElse}) {
    // TODO: implement firstWhere
    throw UnimplementedError();
  }

  @override
  T fold<T>(T initialValue, T Function(T previousValue, Shop element) combine) {
    // TODO: implement fold
    throw UnimplementedError();
  }

  @override
  Iterable<Shop> followedBy(Iterable<Shop> other) {
    // TODO: implement followedBy
    throw UnimplementedError();
  }

  @override
  void forEach(void Function(Shop element) action) {
    // TODO: implement forEach
  }

  @override
  // TODO: implement isEmpty
  bool get isEmpty => throw UnimplementedError();

  @override
  // TODO: implement isNotEmpty
  bool get isNotEmpty => throw UnimplementedError();

  @override
  String join([String separator = ""]) {
    // TODO: implement join
    throw UnimplementedError();
  }

  @override
  // TODO: implement last
  Shop get last => throw UnimplementedError();

  @override
  Shop lastWhere(bool Function(Shop element) test, {Shop Function()? orElse}) {
    // TODO: implement lastWhere
    throw UnimplementedError();
  }

  @override
  // TODO: implement length
  int get length => throw UnimplementedError();

  @override
  Iterable<T> map<T>(T Function(Shop e) toElement) {
    // TODO: implement map
    throw UnimplementedError();
  }

  @override
  Shop reduce(Shop Function(Shop value, Shop element) combine) {
    // TODO: implement reduce
    throw UnimplementedError();
  }

  @override
  // TODO: implement single
  Shop get single => throw UnimplementedError();

  @override
  Shop singleWhere(bool Function(Shop element) test, {Shop Function()? orElse}) {
    // TODO: implement singleWhere
    throw UnimplementedError();
  }

  @override
  Iterable<Shop> skip(int count) {
    // TODO: implement skip
    throw UnimplementedError();
  }

  @override
  Iterable<Shop> skipWhile(bool Function(Shop value) test) {
    // TODO: implement skipWhile
    throw UnimplementedError();
  }

  @override
  Iterable<Shop> take(int count) {
    // TODO: implement take
    throw UnimplementedError();
  }

  @override
  Iterable<Shop> takeWhile(bool Function(Shop value) test) {
    // TODO: implement takeWhile
    throw UnimplementedError();
  }

  @override
  List<Shop> toList({bool growable = true}) {
    // TODO: implement toList
    throw UnimplementedError();
  }

  @override
  Set<Shop> toSet() {
    // TODO: implement toSet
    throw UnimplementedError();
  }

  @override
  Iterable<Shop> where(bool Function(Shop element) test) {
    // TODO: implement where
    throw UnimplementedError();
  }

  @override
  Iterable<T> whereType<T>() {
    // TODO: implement whereType
    throw UnimplementedError();
  }

  @override
  // TODO: implement current
  Shop get current => throw UnimplementedError();

  @override
  bool moveNext() {
    // TODO: implement moveNext
    throw UnimplementedError();
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'city': city,
      'workingTime': workingTime,
    };
  }

  Future<void> someAsyncFunction() async {
    await Future.delayed(Duration(seconds: 1));
    print('Async operation completed');
  }

  Future<void> doAsyncOperation() async {
    await someAsyncFunction();
  }


}

class NikeShop extends Shop implements IWorkingHours
{
  static int _numberOfNikeShops = 0;

  NikeShop(super.name, super.city, super.workingTime)
  {
    _numberOfNikeShops++;
  }

  @override
  void getWorkingTime()
  {
    print("Working time: $_workingTime");
  }

  static int getNumberOfNikeShops() => _numberOfNikeShops;
}

class ClothesShop extends Shop implements IWorkingHours
{
  static int _numberOfClothesShops = 0;

  ClothesShop(super.name, super.city, super.workingTime)
  {
    _numberOfClothesShops++;
  }

  @override
  void getWorkingTime()
  {
    print("Working time: $_workingTime");
  }

  static int getNumberOfClothesShops() => _numberOfClothesShops;
}



