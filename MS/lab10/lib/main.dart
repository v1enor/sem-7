import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'screens/login_screen.dart';
import 'firebase_options.dart';

class MessagingService {
  Future<String?> getToken() async {
    return await FirebaseMessaging.instance.getToken();
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await FirebaseMessaging.instance.setAutoInitEnabled(true);

  final messagingService = MessagingService();
  print(await printToken(messagingService));
  runApp(MyApp());
}

Future<String?> printToken(MessagingService messagingService) async {
  String? token = await messagingService.getToken();
  return token;
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LoginScreen(),
    );
  }
}
