import 'dart:io';
import 'package:flutter/material.dart';
import 'package:lab75/screens/students_list.dart';
import 'package:lab75/student.dart';
import 'package:hive/hive.dart';
import 'package:path_provider/path_provider.dart' as pathProvide;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Directory directory = await pathProvide.getApplicationDocumentsDirectory();
  Hive.init(directory.path);
  Hive.registerAdapter(StudentAdapter());
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: StudentListScreen(),
    );
  }
}

