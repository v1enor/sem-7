import 'package:flutter/material.dart';
import 'home_page.dart';
import 'transport.dart';
import 'settings_page.dart';
import 'shared_preferences_page.dart';


Future<void> main() async {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Transport App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
        '/transport': (context) => TransportPage(),
        '/settings': (context) => SettingsPage(),
        '/sharedPreferences': (context) => SharedPreferencesPage(),
      },
    );
  }
}

