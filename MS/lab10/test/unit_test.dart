import 'package:lab111/second_simple.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

class MockController extends Mock implements TextEditingController {}

void main() {
  testWidgets('Test Calculator App', (WidgetTester tester) async {
    final MockController mockController = MockController();

    // Build our app and trigger a frame.
    await tester.pumpWidget(MaterialApp(home: CalculatorScreen()));

    // Verify that our app has a TextField
    expect(find.byType(TextField), findsOneWidget);

    // Enter a number in the TextField
    await tester.enterText(find.byType(TextField), '5');

    // Verify that the TextField has the entered text
    expect(find.text('5'), findsOneWidget);

    // Trigger the button press
    await tester.tap(find.byType(ElevatedButton));

    // Wait for animations to complete
    await tester.pumpAndSettle();

    // Verify that the result is displayed
    expect(find.text('Result: 10'), findsOneWidget);
  });
}
