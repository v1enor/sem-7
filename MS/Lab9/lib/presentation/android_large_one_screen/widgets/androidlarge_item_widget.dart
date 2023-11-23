import '../models/androidlarge_item_model.dart';
import 'package:flutter/material.dart';
import 'package:lab9/core/app_export.dart';

// ignore: must_be_immutable
class AndroidlargeItemWidget extends StatelessWidget {
  AndroidlargeItemWidget(
    this.androidlargeItemModelObj, {
    Key? key,
  }) : super(
          key: key,
        );

  AndroidlargeItemModel androidlargeItemModelObj;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 6.h,
        vertical: 7.v,
      ),
      decoration: AppDecoration.outlineBlack90002.copyWith(
        borderRadius: BorderRadiusStyle.roundedBorder17,
      ),
      child: Row(
        children: [
          CustomImageView(
            imagePath: androidlargeItemModelObj?.widget,
            height: 92.v,
            width: 85.h,
            margin: EdgeInsets.only(bottom: 1.v),
          ),
          Padding(
            padding: EdgeInsets.only(
              left: 8.h,
              top: 8.v,
              bottom: 8.v,
            ),
            child: Column(
              children: [
                Container(
                  width: 176.h,
                  margin: EdgeInsets.only(right: 5.h),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        androidlargeItemModelObj.widget1!,
                        style: theme.textTheme.bodySmall,
                      ),
                      Spacer(),
                      CustomImageView(
                        imagePath: androidlargeItemModelObj?.widget2,
                        height: 15.adaptSize,
                        width: 15.adaptSize,
                        margin: EdgeInsets.only(bottom: 1.v),
                      ),
                      CustomImageView(
                        imagePath: androidlargeItemModelObj?.widget3,
                        height: 15.adaptSize,
                        width: 15.adaptSize,
                        margin: EdgeInsets.only(
                          left: 4.h,
                          bottom: 1.v,
                        ),
                      ),
                      CustomImageView(
                        imagePath: androidlargeItemModelObj?.widget4,
                        height: 15.adaptSize,
                        width: 15.adaptSize,
                        margin: EdgeInsets.only(
                          left: 4.h,
                          bottom: 1.v,
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 3.v),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    androidlargeItemModelObj.widget5!,
                    style: CustomTextStyles.bodySmallBlack90002,
                  ),
                ),
                SizedBox(height: 24.v),
                SizedBox(
                  width: 181.h,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: EdgeInsets.only(top: 1.v),
                        child: Text(
                          androidlargeItemModelObj.price!,
                          style: theme.textTheme.bodySmall,
                        ),
                      ),
                      Opacity(
                        opacity: 0.69,
                        child: CustomImageView(
                          imagePath: androidlargeItemModelObj?.image,
                          height: 15.v,
                          width: 63.h,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
