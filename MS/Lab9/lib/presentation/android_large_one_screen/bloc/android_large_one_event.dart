// ignore_for_file: must_be_immutable

part of 'android_large_one_bloc.dart';

/// Abstract class for all events that can be dispatched from the
///AndroidLargeOne widget.
///
/// Events must be immutable and implement the [Equatable] interface.
@immutable
abstract class AndroidLargeOneEvent extends Equatable {}

/// Event that is dispatched when the AndroidLargeOne widget is first created.
class AndroidLargeOneInitialEvent extends AndroidLargeOneEvent {
  @override
  List<Object?> get props => [];
}
