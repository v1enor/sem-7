import 'package:flutter/material.dart';
import 'package:lab9/presentation/android_large_one_screen/android_large_one_screen.dart';
import 'package:lab9/presentation/android_large_two_screen/android_large_two_screen.dart';
import 'package:lab9/presentation/app_navigation_screen/app_navigation_screen.dart';

class AppRoutes {
  static const String androidLargeOneScreen = '/android_large_one_screen';

  static const String androidLargeTwoScreen = '/android_large_two_screen';

  static const String appNavigationScreen = '/app_navigation_screen';

  static const String initialRoute = '/initialRoute';

  static Map<String, WidgetBuilder> get routes => {
        androidLargeOneScreen: AndroidLargeOneScreen.builder,
        androidLargeTwoScreen: AndroidLargeTwoScreen.builder,
        appNavigationScreen: AppNavigationScreen.builder,
        initialRoute: AndroidLargeOneScreen.builder
      };
}
