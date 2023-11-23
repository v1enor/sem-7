import 'package:flutter/material.dart';
import 'package:ilya33223_s_application1/core/app_export.dart';
import 'package:ilya33223_s_application1/widgets/custom_outlined_button.dart';
import 'package:ilya33223_s_application1/widgets/custom_rating_bar.dart';

class AndroidLargeTwoScreen extends StatelessWidget {
  const AndroidLargeTwoScreen({Key? key})
      : super(
          key: key,
        );

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);

    return SafeArea(
      child: Scaffold(
        backgroundColor: appTheme.blueGray900,
        body: SizedBox(
          width: double.maxFinite,
          child: Column(
            children: [
              Padding(
                padding: EdgeInsets.only(
                  left: 21.h,
                  top: 11.v,
                  right: 5.h,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        top: 79.v,
                        bottom: 160.v,
                      ),
                      child: Column(
                        children: [
                          Container(
                            height: 30.adaptSize,
                            width: 30.adaptSize,
                            decoration: BoxDecoration(
                              color: appTheme.greenA700,
                              borderRadius: BorderRadius.circular(
                                5.h,
                              ),
                            ),
                          ),
                          SizedBox(height: 17.v),
                          Container(
                            height: 30.adaptSize,
                            width: 30.adaptSize,
                            decoration: BoxDecoration(
                              color: appTheme.black90002,
                              borderRadius: BorderRadius.circular(
                                5.h,
                              ),
                            ),
                          ),
                          SizedBox(height: 11.v),
                          Container(
                            height: 30.adaptSize,
                            width: 30.adaptSize,
                            decoration: BoxDecoration(
                              color: appTheme.purple900,
                              borderRadius: BorderRadius.circular(
                                5.h,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    CustomImageView(
                      imagePath: ImageConstant.imgA2dadf05938faf0,
                      height: 357.v,
                      width: 303.h,
                      margin: EdgeInsets.only(left: 1.h),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 32.v),
              Container(
                padding: EdgeInsets.symmetric(
                  horizontal: 24.h,
                  vertical: 26.v,
                ),
                decoration: AppDecoration.outlineBlack900021.copyWith(
                  borderRadius: BorderRadiusStyle.roundedBorder33,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        left: 12.h,
                        top: 9.v,
                      ),
                      child: Text(
                        "АШКУДИШКА",
                        style: theme.textTheme.displaySmall,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                        left: 12.h,
                        top: 6.v,
                      ),
                      child: Text(
                        "ИЛЬЯ",
                        style: CustomTextStyles.headlineSmallBlack90002,
                      ),
                    ),
                    Align(
                      alignment: Alignment.center,
                      child: Padding(
                        padding: EdgeInsets.only(
                          left: 12.h,
                          top: 21.v,
                          right: 5.h,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "6.90",
                              style: theme.textTheme.displaySmall,
                            ),
                            CustomRatingBar(
                              margin: EdgeInsets.only(
                                top: 7.v,
                                bottom: 6.v,
                              ),
                              initialRating: 0,
                            ),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: 340.h,
                      margin: EdgeInsets.only(
                        left: 12.h,
                        top: 14.v,

                      ),
                      child: Text(
                        "супер подик 13 ой какой он ну прям да ням и потом бам вставляет как в детсве не по детски а еще цвета сразу все о как все твое брат купи пж там жижу дам хаски а че ты как это таго самого",
                        maxLines: 5,
                        overflow: TextOverflow.ellipsis,
                        style: theme.textTheme.bodyLarge,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                        top: 21.v,
                        right: 5.h,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Expanded(
                            child: Container(
                              margin: EdgeInsets.only(right: 11.h),
                              padding: EdgeInsets.symmetric(
                                horizontal: 15.h,
                                vertical: 2.v,
                              ),
                              decoration:
                                  AppDecoration.outlineBlack900022.copyWith(
                                borderRadius: BorderRadiusStyle.roundedBorder17,
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Padding(
                                    padding: EdgeInsets.only(
                                      top: 5.v,
                                      bottom: 5.v,
                                    ),
                                    child: Text(
                                      "-",
                                      style: theme.textTheme.headlineSmall,
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsets.only(
                                      left: 27.h,
                                      bottom: 2.h,
                                    ),
                                    child: Text(
                                      "1",
                                      style: theme.textTheme.headlineSmall,
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsets.only(
                                      left: 26.h,
                                      top: 7.v,
                                      bottom: 5.v,
                                    ),
                                    child: Text(
                                      "+",
                                      style: theme.textTheme.headlineSmall,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Expanded(
                            child: CustomOutlinedButton(
                              text: "В корзину",
                              margin: EdgeInsets.only(left: 11.h),

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
        ),
      ),
    );
  }
}
