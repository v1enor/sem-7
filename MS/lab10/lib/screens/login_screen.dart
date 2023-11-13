import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/services.dart';
import 'NotificationPage.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  User? _user;

  void navigateToNotificationPage() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => NotificationPage()),
    );
  }


  @override
  void initState() {
    super.initState();
    _checkCurrentUser();
  }

  Future<void> _checkCurrentUser() async {
    User? user = _auth.currentUser;
    if (user != null) {
      setState(() {
        _user = user;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Экран входа'),
      ),
      body: Center(
        child: _user == null
            ? Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Эл. почта'),
            ),
            SizedBox(height: 16.0),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Пароль'),
              obscureText: true,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () async {
                await _signIn();
              },
              child: Text('Войти'),
            ),
            ElevatedButton(
              onPressed: () async {
                await _signUp();
              },
              child: Text('Зарегистрироваться'),
            ),
            ElevatedButton(
              onPressed: () {
                navigateToNotificationPage();
              },
              child: Text('Перейти к уведомлениям'),
            ),

          ],
        )
            : Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Вы вошли как ${_user!.email}'),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () async {
                await _signOut();
              },
              child: Text('Выйти'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _signIn() async {
    try {
      await _auth.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );
      _checkCurrentUser();
      print('Вход выполнен успешно');
    } catch (e) {
      print('Ошибка входа: $e');
    }
  }

  Future<void> _signUp() async {
    try {
      await _auth.createUserWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );

      // После успешной регистрации сохраняем данные в Firestore
      await _saveUserDataToFirestore();

      _checkCurrentUser();
      print('Регистрация успешна');
    } catch (e) {
      print('Ошибка регистрации: $e');
    }
  }

  Future<void> _signOut() async {
    try {
      await _auth.signOut();
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginScreen()),
      );
      print('Выход выполнен успешно');
    } catch (e) {
      print('Ошибка выхода: $e');
    }
  }



  Future<void> _saveUserDataToFirestore() async {
    try {
      User? user = _auth.currentUser;
      if (user != null) {
        await _firestore.collection('users').doc(user.uid).set({
          'email': user.email,
          'createdAt': FieldValue.serverTimestamp(),
          // Добавьте другие поля, если необходимо
        });
        print('Данные пользователя сохранены в Firestore');
      }
    } catch (e) {
      print('Ошибка при сохранении данных пользователя: $e');
    }
  }

}
