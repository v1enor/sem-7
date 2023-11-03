import 'package:flutter/material.dart';
import 'data/shared_preferences.dart';
import 'data/sqflite.dart';
import 'model/burger_food.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Burger Food App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Burger Food App Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  BurgerFoodProvider burgerFoodProvider = BurgerFoodProvider();

  @override
  void initState() {
    super.initState();
    burgerFoodProvider.open('burger_food.db');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () async {
                BurgerFood burgerFood = BurgerFood("Burger", "Delicious", 10);
                burgerFood.name = "Burger";
                burgerFood.description = "Delicious";
                burgerFood.price = 10;
                await burgerFoodProvider.insert(burgerFood);
              },
              child: Text('Insert Burger'),
            ),
            ElevatedButton(
              onPressed: () async {
                List<BurgerFood> burgerFoods = await burgerFoodProvider.getBurgerFoods();
                print(burgerFoods);
              },
              child: Text('Get All Burgers'),
            ),
            ElevatedButton(
              onPressed: () async {
                BurgerFood? burgerFood = await burgerFoodProvider.getBurgerFood(1);
                print(burgerFood);
              },
              child: Text('Get Burger by ID'),
            ),
            ElevatedButton(
              onPressed: () async {
                BurgerFood burgerFood = BurgerFood("Updated Burger", "Updated Description", 15);
                burgerFood.id = 1;
                burgerFood.name = "Updated Burger";
                burgerFood.description = "Updated Description";
                burgerFood.price = 15;
                await burgerFoodProvider.update(burgerFood);
              },
              child: Text('Update Burger'),
            ),
            ElevatedButton(
              onPressed: () async {
                await burgerFoodProvider.delete(1);
              },
              child: Text('Delete Burger'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => SecondPage()));
              },
              child: Text('Go to Second Page'),
            ),
          ],
        ),
      ),
    );
  }
}

class SecondPage extends StatefulWidget {
  @override
  _SecondPageState createState() => _SecondPageState();
}

class _SecondPageState extends State<SecondPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Page"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () async {
                BurgerFood burgerFood = BurgerFood("Burger", "Delicious", 10);
                burgerFood.name = "Burger";
                burgerFood.description = "Delicious";
                burgerFood.price = 10;
                await saveBurgerFood(burgerFood);
              },
              child: Text('Save Burger Food'),
            ),
            ElevatedButton(
              onPressed: () async {
                BurgerFood? loadedBurgerFood = await getBurgerFood();
                print(loadedBurgerFood.toString());
              },
              child: Text('Load Burger Food'),
            ),
            ElevatedButton(
              onPressed: removeBurgerFood,
              child: Text('Remove Burger Food'),
            ),
          ],
        ),
      ),
    );
  }
}
