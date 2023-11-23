
import '../android_large_one_screen/widgets/userprofile_item_widget.dart';
import 'package:flutter/material.dart';
import 'package:ilya33223_s_application1/core/app_export.dart';

import 'dart:async';
import 'package:flutter/services.dart';



class AndroidLargeOneScreen extends StatelessWidget {


  @override

  Widget build(BuildContext context) {

    mediaQueryData = MediaQuery.of(context);
    return SafeArea(
      child: Scaffold(
        body: Container(
          width: double.maxFinite,
          padding: EdgeInsets.symmetric(horizontal: 20.h, vertical: 5.v),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(height: 26.v),
              GestureDetector(
                onTap: () {
                  nextpage(context);
                },
                child: Text("ЛАВКА ПАРА", style: theme.textTheme.displayMedium),
              ),
              Padding(
                padding: EdgeInsets.only(left: 17.h, top: 16.v, right: 11.h),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Popular", style: theme.textTheme.titleSmall),
                    Text("New", style: theme.textTheme.titleSmall),
                    GestureDetector(
                      onTap: () {
                        nextpageBtn(context);
                      },
                      child: Text('Battery Level:', style: theme.textTheme.labelLarge),
                    ),

                  ],
                ),
              ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(left: 10.h, top: 38.v, right: 10.h),
              child: Container(
                height: 200, // Установите желаемую высоту
                child: PageView.builder(
                  physics: BouncingScrollPhysics(),
                  itemCount: 5,
                  itemBuilder: (context, index) {
                    return Column(
                      children: [
                        UserprofileItemWidget(),
                        SizedBox(height: 1.v), // Разделительный виджет с указанной высотой
                        UserprofileItemWidget(),
                        SizedBox(height: 1.v),
                        UserprofileItemWidget(),
                        SizedBox(height: 1.v),
                        UserprofileItemWidget(),
                        SizedBox(height: 1.v),
                        UserprofileItemWidget(),
                        SizedBox(height: 1.v),
                        Padding(
                          padding: EdgeInsets.all(15), //apply padding to all four sides
                          child: Text("там еще ->->->", style: theme.textTheme.titleLarge),
                        ),

                      ],
                    );
                  },
                ),
              ),
            ),
          ),


            ],
          ),
        ),
      ),
    );

  }

  /// Navigates to the androidLargeTwoScreen when the action is triggered.
  ///
  /// The [BuildContext] parameter is used to build the navigation stack.
  /// When the action is triggered, this function uses the [Navigator] widget
  /// to push the named route for the androidLargeTwoScreen.
  nextpage(BuildContext context) {

    Navigator.pushNamed(context, AppRoutes.androidLargeTwoScreen);
  }

  void nextpageBtn(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AndroidLargeOneScreen()),
    );
  }
}