import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import '/core/app_export.dart';
import 'package:lab9/presentation/android_large_two_screen/models/android_large_two_model.dart';
part 'android_large_two_event.dart';
part 'android_large_two_state.dart';

/// A bloc that manages the state of a AndroidLargeTwo according to the event that is dispatched to it.
class AndroidLargeTwoBloc
    extends Bloc<AndroidLargeTwoEvent, AndroidLargeTwoState> {
  AndroidLargeTwoBloc(AndroidLargeTwoState initialState) : super(initialState) {
    on<AndroidLargeTwoInitialEvent>(_onInitialize);
  }

  _onInitialize(
    AndroidLargeTwoInitialEvent event,
    Emitter<AndroidLargeTwoState> emit,
  ) async {}
}
