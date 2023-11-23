import 'package:lab111/simple_widget.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('HelloWorld widget shows correct text', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: HelloWorldWidget()));

    final textFinder = find.text('Hello, World!');
    expect(textFinder, findsOneWidget);

    Text textWidget = tester.widget(textFinder);
    expect(textWidget.data, 'Hello, World!');
  });

}