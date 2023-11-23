// ignore_for_file: must_be_immutable

part of 'android_large_one_bloc.dart';

/// Represents the state of AndroidLargeOne in the application.
class AndroidLargeOneState extends Equatable {
  AndroidLargeOneState({this.androidLargeOneModelObj});

  AndroidLargeOneModel? androidLargeOneModelObj;

  @override
  List<Object?> get props => [
        androidLargeOneModelObj,
      ];
  AndroidLargeOneState copyWith(
      {AndroidLargeOneModel? androidLargeOneModelObj}) {
    return AndroidLargeOneState(
      androidLargeOneModelObj:
          androidLargeOneModelObj ?? this.androidLargeOneModelObj,
    );
  }
}
