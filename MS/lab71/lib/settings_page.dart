import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsPage extends StatefulWidget {
  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  String _savedValue = '';

  Future<void> _saveValue() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('myValue', 'Hello, Shared Preferences from SettingsPage!');
    setState(() {
      _savedValue = 'Value saved successfully.';
    });
  }

  Future<void> _readValue() async {
    final prefs = await SharedPreferences.getInstance();
    final value = prefs.getString('myValue');
    setState(() {
      _savedValue = value ?? 'No value found.';
    });
  }

  Future<void> _deleteValue() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('myValue');
    setState(() {
      _savedValue = 'Value deleted successfully.';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _saveValue,
              child: Text('Save Value'),
            ),
            ElevatedButton(
              onPressed: _readValue,
              child: Text('Read Value'),
            ),
            ElevatedButton(
              onPressed: _deleteValue,
              child: Text('Delete Value'),
            ),
            SizedBox(height: 20),
            Text(
              _savedValue,
              style: TextStyle(fontSize: 18),
            ),
          ],
        ),
      ),
    );
  }
}