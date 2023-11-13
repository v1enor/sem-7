import '../android_large_one_screen/widgets/androidlarge_item_widget.dart';
import 'bloc/android_large_one_bloc.dart';
import 'models/android_large_one_model.dart';
import 'models/androidlarge_item_model.dart';
import 'package:flutter/material.dart';
import 'package:lab9/core/app_export.dart';

class AndroidLargeOneScreen extends StatelessWidget {
  const AndroidLargeOneScreen({Key? key}) : super(key: key);

  static Widget builder(BuildContext context) {
    return BlocProvider<AndroidLargeOneBloc>(
        create: (context) => AndroidLargeOneBloc(AndroidLargeOneState(
            androidLargeOneModelObj: AndroidLargeOneModel()))
          ..add(AndroidLargeOneInitialEvent()),
        child: AndroidLargeOneScreen());
  }

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    return SafeArea(
        child: Scaffold(
            body: Container(
                width: double.maxFinite,
                padding: EdgeInsets.symmetric(horizontal: 20.h, vertical: 5.v),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  SizedBox(height: 26.v),
                  GestureDetector(
                      onTap: () {
                        tosec(context);
                      },
                      child:
                          Text("lbl".tr, style: theme.textTheme.displayMedium)),
                  SizedBox(height: 16.v),
                  _buildPopularNewTrending(context),
                  SizedBox(height: 38.v),
                  _buildAndroidLarge(context)
                ]))));
  }

  /// Section Widget
  Widget _buildPopularNewTrending(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(left: 17.h, right: 11.h),
        child:
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Text("lbl_popular".tr, style: theme.textTheme.titleSmall),
          Text("lbl_new".tr, style: theme.textTheme.titleSmall),
          Padding(
              padding: EdgeInsets.only(bottom: 2.v),
              child: Text("lbl_trending".tr, style: theme.textTheme.labelLarge))
        ]));
  }

  /// Section Widget
  Widget _buildAndroidLarge(BuildContext context) {
    return Expanded(
        child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 10.h),
            child: BlocSelector<AndroidLargeOneBloc, AndroidLargeOneState,
                    AndroidLargeOneModel?>(
                selector: (state) => state.androidLargeOneModelObj,
                builder: (context, androidLargeOneModelObj) {
                  return ListView.separated(
                      physics: BouncingScrollPhysics(),
                      shrinkWrap: true,
                      separatorBuilder: (context, index) {
                        return SizedBox(height: 21.v);
                      },
                      itemCount: androidLargeOneModelObj
                              ?.androidlargeItemList.length ??
                          0,
                      itemBuilder: (context, index) {
                        AndroidlargeItemModel model = androidLargeOneModelObj
                                ?.androidlargeItemList[index] ??
                            AndroidlargeItemModel();
                        return AndroidlargeItemWidget(model);
                      });
                })));
  }

  /// Navigates to the androidLargeTwoScreen when the action is triggered.
  tosec(BuildContext context) {
    NavigatorService.popAndPushNamed(
      AppRoutes.androidLargeTwoScreen,
    );
  }
}
