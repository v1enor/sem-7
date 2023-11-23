// ignore_for_file: must_be_immutable

part of 'android_large_two_bloc.dart';

/// Represents the state of AndroidLargeTwo in the application.
class AndroidLargeTwoState extends Equatable {
  AndroidLargeTwoState({this.androidLargeTwoModelObj});

  AndroidLargeTwoModel? androidLargeTwoModelObj;

  @override
  List<Object?> get props => [
        androidLargeTwoModelObj,
      ];
  AndroidLargeTwoState copyWith(
      {AndroidLargeTwoModel? androidLargeTwoModelObj}) {
    return AndroidLargeTwoState(
      androidLargeTwoModelObj:
          androidLargeTwoModelObj ?? this.androidLargeTwoModelObj,
    );
  }
}
