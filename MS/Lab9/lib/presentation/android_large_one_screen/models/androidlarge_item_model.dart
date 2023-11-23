import '../../../core/app_export.dart';

/// This class is used in the [androidlarge_item_widget] screen.
class AndroidlargeItemModel {
  AndroidlargeItemModel({
    this.widget,
    this.widget1,
    this.widget2,
    this.widget3,
    this.widget4,
    this.widget5,
    this.price,
    this.image,
    this.id,
  }) {
    widget = widget ?? ImageConstant.imgImage1;
    widget1 = widget1 ?? "АШКУДИШКА";
    widget2 = widget2 ?? ImageConstant.imgStar2;
    widget3 = widget3 ?? ImageConstant.imgStar1;
    widget4 = widget4 ?? ImageConstant.imgStar3;
    widget5 = widget5 ?? "Илья";
    price = price ?? "3.99";
    image = image ?? ImageConstant.imgGroup2;
    id = id ?? "";
  }

  String? widget;

  String? widget1;

  String? widget2;

  String? widget3;

  String? widget4;

  String? widget5;

  String? price;

  String? image;

  String? id;
}
