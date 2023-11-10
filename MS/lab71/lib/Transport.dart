import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class TransportPage extends StatefulWidget {
  @override
  _TransportPageState createState() => _TransportPageState();
}

class _TransportPageState extends State<TransportPage> {
  List<Map<String, dynamic>> _transportList = [];

  @override
  void initState() {
    super.initState();
    _loadTransport();
  }

  Future<void> _loadTransport() async {
    final database = openDatabase(
      join(await getDatabasesPath(), 'transport.db'),
      onCreate: (db, version) {
        return db.execute('''
          CREATE TABLE transport (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT,
            color TEXT
          )
        ''');
      },
      version: 1,
    );

    final db = await database;
    final transport = await db.query('transport');
    setState(() {
      _transportList = transport;
    });
  }

  Future<void> _addTransport() async {
    final database = openDatabase(
      join(await getDatabasesPath(), 'transport.db'),
      version: 1,
    );

    final db = await database;
    final id = await db.insert('transport', {
      'name': 'Car',
      'type': 'Vehicle',
      'color': 'Red',
    });
    print('Added transport with id: $id');
    _loadTransport();
  }

  Future<void> _updateTransport() async {
    final database = openDatabase(
      join(await getDatabasesPath(), 'transport.db'),
      version: 1,
    );

    final db = await database;
    final id = 1;
    final rowsUpdated = await db.update('transport', {
      'name': 'Bike',
      'type': 'Vehicle',
      'color': 'Blue',
    }, where: 'id = ?', whereArgs: [id]);
    print('Updated $rowsUpdated transport(s)');
    _loadTransport();
  }

  Future<void> _deleteTransport() async {
    final database = openDatabase(
      join(await getDatabasesPath(), 'transport.db'),
      version: 1,
    );

    final db = await database;
    final id = 1;
    final rowsDeleted = await db.delete('transport', where: 'id = ?', whereArgs: [id]);
    print('Deleted $rowsDeleted transport(s)');
    _loadTransport();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Transport'),
      ),
      body: ListView.builder(
        itemCount: _transportList.length,
        itemBuilder: (context, index) {
          final transport = _transportList[index];
          return ListTile(
            title: Text(transport['name']),
            subtitle: Text(transport['type']),
            trailing: Text(transport['color']),
          );
        },
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: _addTransport,
            child: Icon(Icons.add),
          ),
          SizedBox(height: 8.0),
          FloatingActionButton(
            onPressed: _updateTransport,
            child: Icon(Icons.edit),
          ),
          SizedBox(height: 8.0),
          FloatingActionButton(
            onPressed: _deleteTransport,
            child: Icon(Icons.delete),
          ),
        ],
      ),
    );
  }
}