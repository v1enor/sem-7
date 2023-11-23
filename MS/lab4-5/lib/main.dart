import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/scheduler.dart';
import 'package:ilya33223_s_application1/theme/theme_helper.dart';
import 'package:ilya33223_s_application1/routes/app_routes.dart';

//сделай авторизацию 

APA91bEU6TYVvTS5WEfzcwrnFOmJiu6PibNaH2SI1Uqymih7SO2XuDzbOp0yO8RnZ8dWgY4Dv3P2YNGDwuLNDTNu9zBsctaEBrpkd8Xl-gLyyZSk_9AYkstlrLIEuVLtJ_AnhQdxFCgl

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  ///Please update theme as per your need if required.
  ThemeHelper().changeTheme('primary');
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: theme,
      title: 'ilya33223_s_application1',
      debugShowCheckedModeBanner: false,
      initialRoute: AppRoutes.androidLargeOneScreen,
      routes: AppRoutes.routes,
    );
  }
}
