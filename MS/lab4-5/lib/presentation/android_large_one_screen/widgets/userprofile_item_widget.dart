import 'package:flutter/material.dart';
import 'package:ilya33223_s_application1/core/app_export.dart';

// ignore: must_be_immutable
class UserprofileItemWidget extends StatelessWidget {
  const UserprofileItemWidget({Key? key})
      : super(
          key: key,
        );

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 3.h),
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
            imagePath: ImageConstant.imgImage1,
            height: 90.v,
            width: 85.h,
            margin: EdgeInsets.only(left: 1.v,bottom: 1.v),
          ),
          Padding(
            padding: EdgeInsets.only(
              left: 8.h,
              top: 8.v,
              bottom: 8.v,
            ),
            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      "АШКУДИШКА",
                      style: theme.textTheme.bodySmall,
                    ),
                    CustomImageView(
                      svgPath: ImageConstant.imgStar2,
                      height: 15.adaptSize,
                      width: 15.adaptSize,
                      margin: EdgeInsets.only(
                        left: 42.h,
                        bottom: 1.v,
                      ),
                    ),
                    CustomImageView(
                      svgPath: ImageConstant.imgStar1,
                      height: 15.adaptSize,
                      width: 15.adaptSize,
                      margin: EdgeInsets.only(
                        left: 4.h,
                        bottom: 1.v,
                      ),
                    ),
                    CustomImageView(
                      svgPath: ImageConstant.imgStar3,
                      height: 15.adaptSize,
                      width: 15.adaptSize,
                      margin: EdgeInsets.only(
                        left: 4.h,
                        bottom: 1.v,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 3.v),
                Text(
                  "Илья",
                  style: CustomTextStyles.bodySmallBlack90002,
                ),
                SizedBox(height: 24.v),
                Row(
                  children: [
                    Padding(
                      padding: EdgeInsets.only(top: 1.v),
                      child: Text(
                        "3.99",
                        style: theme.textTheme.bodySmall,
                      ),
                    ),
                    Opacity(
                      opacity: 0.69,
                      child: CustomImageView(
                        svgPath: ImageConstant.imgUser,
                        height: 15.v,
                        width: 63.h,
                        margin: EdgeInsets.only(left: 84.h),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
