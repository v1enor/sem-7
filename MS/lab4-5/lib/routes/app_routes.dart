import 'package:flutter/material.dart';
import 'package:ilya33223_s_application1/presentation/android_large_one_screen/android_large_one_screen.dart';
import 'package:ilya33223_s_application1/presentation/android_large_two_screen/android_large_two_screen.dart';
import 'package:ilya33223_s_application1/presentation/app_navigation_screen/app_navigation_screen.dart';

class AppRoutes {
  static const String androidLargeOneScreen = '/android_large_one_screen';

  static const String androidLargeTwoScreen = '/android_large_two_screen';

  static const String appNavigationScreen = '/app_navigation_screen';

  static Map<String, WidgetBuilder> routes = {
    androidLargeOneScreen: (context) => AndroidLargeOneScreen(),
    androidLargeTwoScreen: (context) => AndroidLargeTwoScreen(),

    appNavigationScreen: (context) => AppNavigationScreen()
  };
}
