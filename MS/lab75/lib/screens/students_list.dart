import 'package:flutter/material.dart';
import 'package:lab75/screens/add_student.dart';
import 'package:lab75/student.dart';
import 'package:hive/hive.dart';

class StudentListScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return StudentListScreenState();
  }
}

class StudentListScreenState extends State<StudentListScreen> {
  List<Student> listStudents = [];

  void getStudents() async {
    final box = await Hive.openBox<Student>('student');
    setState(() {
      listStudents = box.values.toList();
    });
  }

  @override
  void initState() {
    getStudents();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text("Flutter Hive Sample"),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.add),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => AddOrUpdateStudent(false,-1,null)));
              },
            )
          ],
        ),
        body: Container(
            padding: EdgeInsets.all(15),
            child: ListView.builder(
                itemCount: listStudents.length,
                itemBuilder: (context, position) {
                  Student getStudent = listStudents[position];
                  var email = getStudent.email;
                  var mobile = getStudent.mobile;
                  return Card(
                    elevation: 8,
                    child: Container(
                      padding: EdgeInsets.all(15),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              children: [
                                Text("${getStudent.name} | Mobile: $mobile",
                                    style: TextStyle(fontSize: 18),maxLines: 2,overflow: TextOverflow.ellipsis,),
                                SizedBox(height: 8,),
                                Text("email : $email ",
                                    style: TextStyle(fontSize: 18))
                              ],
                            ),
                          ),
                         Row(
                           children: [
                             Container(

                               child: IconButton(
                                   icon: Icon(Icons.edit,color: Colors.blue,),
                                   onPressed: () {
                                     Navigator.push(
                                         context,
                                         MaterialPageRoute(
                                             builder: (_) => AddOrUpdateStudent(
                                                 true, position, getStudent)));
                                   }),
                             ),
                             IconButton(
                                 icon: Icon(Icons.delete,color: Colors.red,),
                                 onPressed: (){
                                   final box = Hive.box<Student>('student');
                                   box.deleteAt(position);
                                   setState(() => {
                                     listStudents.removeAt(position)
                                   });
                                 })
                           ],
                         )

                        ],
                      ),
                    ),
                  );
                })),
      ),
    );
  }
}