import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import '/core/app_export.dart';
import '../models/androidlarge_item_model.dart';
import 'package:lab9/presentation/android_large_one_screen/models/android_large_one_model.dart';
part 'android_large_one_event.dart';
part 'android_large_one_state.dart';

/// A bloc that manages the state of a AndroidLargeOne according to the event that is dispatched to it.
class AndroidLargeOneBloc
    extends Bloc<AndroidLargeOneEvent, AndroidLargeOneState> {
  AndroidLargeOneBloc(AndroidLargeOneState initialState) : super(initialState) {
    on<AndroidLargeOneInitialEvent>(_onInitialize);
  }

  _onInitialize(
    AndroidLargeOneInitialEvent event,
    Emitter<AndroidLargeOneState> emit,
  ) async {
    emit(state.copyWith(
        androidLargeOneModelObj: state.androidLargeOneModelObj
            ?.copyWith(androidlargeItemList: fillAndroidlargeItemList())));
    Future.delayed(const Duration(milliseconds: 3000), () {
      NavigatorService.popAndPushNamed(
        AppRoutes.androidLargeTwoScreen,
      );
    });
  }

  List<AndroidlargeItemModel> fillAndroidlargeItemList() {
    return [
      AndroidlargeItemModel(
          widget: ImageConstant.imgImage1,
          widget1: "АШКУДИШКА",
          widget2: ImageConstant.imgStar2,
          widget3: ImageConstant.imgStar1,
          widget4: ImageConstant.imgStar3,
          widget5: "Илья",
          price: "3.99",
          image: ImageConstant.imgGroup2),
      AndroidlargeItemModel(
          widget: ImageConstant.imgImage192x85,
          widget1: "Парилочка",
          widget2: ImageConstant.imgStar215x15,
          widget3: ImageConstant.imgStar115x15,
          widget4: ImageConstant.imgStar315x15,
          widget5: "максим",
          price: "3.99",
          image: ImageConstant.imgGroup2Pink800),
      AndroidlargeItemModel(
          widget: ImageConstant.imgImage11,
          widget1: "подик",
          widget2: ImageConstant.imgStar21,
          widget3: ImageConstant.imgStar11,
          widget4: ImageConstant.imgStar31,
          widget5: "андрей",
          price: "3.99",
          image: ImageConstant.imgGroup2Cyan300),
      AndroidlargeItemModel(
          widget: ImageConstant.imgImage12,
          widget1: "дудка",
          widget2: ImageConstant.imgStar22,
          widget3: ImageConstant.imgStar12,
          widget4: ImageConstant.imgStar32,
          widget5: "егор",
          price: "3.99",
          image: ImageConstant.imgGroup2Cyan500),
      AndroidlargeItemModel(
          widget: ImageConstant.imgImage13,
          widget1: "ням-ням",
          widget2: ImageConstant.imgStar23,
          widget3: ImageConstant.imgStar13,
          widget4: ImageConstant.imgStar33,
          widget5: "егор милшка",
          price: "3.99",
          image: ImageConstant.imgGroup2Indigo600)
    ];
  }
}
