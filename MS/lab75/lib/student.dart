import 'package:hive/hive.dart';

part 'student.g.dart';

@HiveType(typeId: 1,adapterName: "StudentAdapter")
class Student{
  @HiveField(0)
  String name;

  @HiveField(1)
  String email;

  @HiveField(2)
  String mobile;

  Student({required this.name,required this.email,required this.mobile});
}