import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

class FileSystemPage extends StatefulWidget {
  @override
  _FileSystemPageState createState() => _FileSystemPageState();
}

class _FileSystemPageState extends State<FileSystemPage> {
  String _status = '';

  Future<void> _writeToFile(String directory) async {
    try {
      final dir = await getDirectory(directory);
      final file = File('${dir.path}/example.txt');
      await file.writeAsString('Hello, File System!');
      setState(() {
        _status = 'File written successfully.';
      });
    } catch (e) {
      setState(() {
        _status = 'Error writing to file: $e';
      });
    }
  }

  Future<void> _readFromFile(String directory) async {
    try {
      final dir = await getDirectory(directory);
      final file = File('${dir.path}/example.txt');
      final content = await file.readAsString();
      setState(() {
        _status = 'File content: $content';
      });
    } catch (e) {
      setState(() {
        _status = 'Error reading file: $e';
      });
    }
  }

  Future<Directory> getDirectory(String directory) async {
    switch (directory) {
      case 'TemporaryDirectory':
        return await getTemporaryDirectory();
      case 'ApplicationDocumentsDirectory':
        return await getApplicationDocumentsDirectory();
      case 'ApplicationSupportDirectory':
        return await getApplicationSupportDirectory();
      case 'LibraryDirectory':
        return await getLibraryDirectory();

      default:
        throw Exception('Invalid directory');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('File System Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                _writeToFile('TemporaryDirectory');
              },
              child: Text('Write to Temporary Directory'),
            ),
            ElevatedButton(
              onPressed: () {
                _readFromFile('TemporaryDirectory');
              },
              child: Text('Read from Temporary Directory'),
            ),

            ElevatedButton(
              onPressed: () {
                _writeToFile('ApplicationDocumentsDirectory');
              },
              child: Text('Write to Application Documents Directory'),
            ),
            ElevatedButton(
              onPressed: () {
                _readFromFile('ApplicationDocumentsDirectory');
              },
              child: Text('Read from Application Documents Directory'),
            ),

            ElevatedButton(
              onPressed: () {
                _writeToFile('ApplicationSupportDirectory');
              },
              child: Text('Write to Application Support Directory'),
            ),
            ElevatedButton(
              onPressed: () {
                _readFromFile('ApplicationSupportDirectory');
              },
              child: Text('Read from Application Support Directory'),
            ),

            ElevatedButton(
              onPressed: () {
                _writeToFile('LibraryDirectory');
              },
              child: Text('Write to Library Directory'),
            ),
            ElevatedButton(
              onPressed: () {
                _readFromFile('LibraryDirectory');
              },
              child: Text('Read from Library Directory'),
            ),


            Text(
              _status,
              style: TextStyle(fontSize: 18),
            ),
          ],
        ),
      ),
    );
  }
}