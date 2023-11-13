import 'bloc/android_large_two_bloc.dart';
import 'models/android_large_two_model.dart';
import 'package:flutter/material.dart';
import 'package:lab9/core/app_export.dart';
import 'package:lab9/widgets/custom_outlined_button.dart';
import 'package:lab9/widgets/custom_rating_bar.dart';

class AndroidLargeTwoScreen extends StatelessWidget {
  const AndroidLargeTwoScreen({Key? key}) : super(key: key);

  static Widget builder(BuildContext context) {
    return BlocProvider<AndroidLargeTwoBloc>(
        create: (context) => AndroidLargeTwoBloc(AndroidLargeTwoState(
            androidLargeTwoModelObj: AndroidLargeTwoModel()))
          ..add(AndroidLargeTwoInitialEvent()),
        child: AndroidLargeTwoScreen());
  }

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    return BlocBuilder<AndroidLargeTwoBloc, AndroidLargeTwoState>(
        builder: (context, state) {
      return SafeArea(
          child: Scaffold(
              backgroundColor: appTheme.blueGray900,
              body: SizedBox(
                  width: double.maxFinite,
                  child: Column(children: [
                    SizedBox(height: 11.v),
                    _buildEightColumn(context),
                    SizedBox(height: 32.v),
                    Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 24.h, vertical: 26.v),
                        decoration: AppDecoration.outlineBlack900021.copyWith(
                            borderRadius: BorderRadiusStyle.roundedBorder33),
                        child: Column(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              SizedBox(height: 9.v),
                              GestureDetector(
                                  onTap: () {
                                    toone(context);
                                  },
                                  child: Padding(
                                      padding: EdgeInsets.only(left: 12.h),
                                      child: Text("lbl2".tr,
                                          style:
                                              theme.textTheme.displaySmall))),
                              SizedBox(height: 6.v),
                              Padding(
                                  padding: EdgeInsets.only(left: 12.h),
                                  child: Text("lbl12".tr,
                                      style: CustomTextStyles
                                          .headlineSmallBlack90002)),
                              SizedBox(height: 21.v),
                              _buildSixRow(context),
                              SizedBox(height: 14.v),
                              Container(
                                  width: 252.h,
                                  margin:
                                      EdgeInsets.only(left: 12.h, right: 45.h),
                                  child: Text("msg_13".tr,
                                      maxLines: 7,
                                      overflow: TextOverflow.ellipsis,
                                      style: theme.textTheme.bodyLarge)),
                              SizedBox(height: 21.v),
                              _buildSevenRow(context)
                            ]))
                  ]))));
    });
  }

  /// Section Widget
  Widget _buildEightColumn(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(left: 21.h, right: 5.h),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                  padding: EdgeInsets.only(top: 79.v, bottom: 160.v),
                  child: Column(children: [
                    Container(
                        height: 30.adaptSize,
                        width: 30.adaptSize,
                        decoration: BoxDecoration(
                            color: appTheme.greenA700,
                            borderRadius: BorderRadius.circular(5.h))),
                    SizedBox(height: 17.v),
                    Container(
                        height: 30.adaptSize,
                        width: 30.adaptSize,
                        decoration: BoxDecoration(
                            color: appTheme.black90002,
                            borderRadius: BorderRadius.circular(5.h))),
                    SizedBox(height: 11.v),
                    Container(
                        height: 30.adaptSize,
                        width: 30.adaptSize,
                        decoration: BoxDecoration(
                            color: appTheme.purple900,
                            borderRadius: BorderRadius.circular(5.h)))
                  ])),
              CustomImageView(
                  imagePath: ImageConstant.imgA2dadf05938faf0,
                  height: 357.v,
                  width: 303.h,
                  margin: EdgeInsets.only(left: 1.h))
            ]));
  }

  /// Section Widget
  Widget _buildSixRow(BuildContext context) {
    return Align(
        alignment: Alignment.center,
        child: Padding(
            padding: EdgeInsets.only(left: 12.h, right: 5.h),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("lbl_6_90".tr, style: theme.textTheme.displaySmall),
                  Padding(
                      padding: EdgeInsets.only(top: 7.v, bottom: 6.v),
                      child: CustomRatingBar(initialRating: 3))
                ])));
  }

  /// Section Widget
  Widget _buildSevenRow(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(right: 5.h),
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Expanded(
              child: Container(
                  margin: EdgeInsets.only(right: 11.h),
                  padding: EdgeInsets.symmetric(vertical: 8.v),
                  decoration: AppDecoration.outlineBlack900022.copyWith(
                      borderRadius: BorderRadiusStyle.roundedBorder17),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Padding(
                            padding: EdgeInsets.only(top: 7.v, bottom: 5.v),
                            child: Text("lbl13".tr,
                                style: theme.textTheme.headlineSmall)),
                        Padding(
                            padding: EdgeInsets.only(top: 1.v),
                            child: Text("lbl_1".tr,
                                style: theme.textTheme.headlineSmall)),
                        Padding(
                            padding: EdgeInsets.only(top: 4.v, bottom: 1.v),
                            child: Text("lbl14".tr,
                                style: theme.textTheme.headlineSmall))
                      ]))),
          Expanded(
              child: CustomOutlinedButton(
                  text: "lbl15".tr, margin: EdgeInsets.only(left: 11.h)))
        ]));
  }

  /// Navigates to the androidLargeOneScreen when the action is triggered.
  toone(BuildContext context) {
    NavigatorService.popAndPushNamed(
      AppRoutes.androidLargeOneScreen,
    );
  }
}
