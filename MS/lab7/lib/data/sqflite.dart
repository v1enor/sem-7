import 'package:sqflite/sqflite.dart';

import '../model/burger_food.dart';

class BurgerFoodProvider {
  late Database db;

  Future open(String path) async {
    db = await openDatabase(path, version: 1,
        onCreate: (Database db, int version) async {
          await db.execute('''
            create table BurgerFood ( 
              id integer primary key autoincrement, 
              name text not null,
              description text not null,
              price integer not null)
            ''');
        });
  }

  Future<BurgerFood> insert(BurgerFood burgerFood) async {
    burgerFood.id = await db.insert('BurgerFood', burgerFood.toMap());
    return burgerFood;
  }

  Future<List<BurgerFood>> getBurgerFoods() async {
    List<Map> maps = await db.query('BurgerFood',
        columns: ['id', 'name', 'description', 'price']);
    if (maps.length > 0) {
      return maps.map((burgerFood) => BurgerFood.fromMap(burgerFood)).toList();
    }
    return [];
  }

  Future<BurgerFood?> getBurgerFood(int id) async {
    List<Map> maps = await db.query('BurgerFood',
        columns: ['id', 'name', 'description', 'price'],
        where: 'id = ?',
        whereArgs: [id]);
    if (maps.length > 0) {
      return BurgerFood.fromMap(maps.first);
    }
    return null;
  }

  Future<int> update(BurgerFood burgerFood) async {
    return await db.update('BurgerFood', burgerFood.toMap(),
        where: 'id = ?', whereArgs: [burgerFood.id]);
  }

  Future<int> delete(int id) async {
    return await db.delete('BurgerFood', where: 'id = ?', whereArgs: [id]);
  }

}


