
import 'food.dart';

abstract class FastFood implements Food{

  FastFood(String _name, String _description){
    name = _name;
    description = _description;
  }

  @override
  String get type => "fast";

  @override
  String eat(int count){
    return ("I eat fast food" + count.toString());
  }

  String name = "fast food";

  String description = "its bad food";

}