import 'package:flutter/material.dart';
import 'package:lab75/screens/students_list.dart';
import 'package:lab75/student.dart';
import 'package:hive/hive.dart';

class AddOrUpdateStudent extends StatefulWidget{
  bool isEdit;
  int position=-1;
  Student? studentModel=null;

  AddOrUpdateStudent(this.isEdit, this.position,this.studentModel);

  @override
  State<StatefulWidget> createState() {

    return AddOrUpdateStudentState();
  }

}

class AddOrUpdateStudentState extends State<AddOrUpdateStudent>{
  TextEditingController controllerName = new TextEditingController();
  TextEditingController controllerEmail = new TextEditingController();
  TextEditingController controllerMobile = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (widget.isEdit) {
      controllerName.text = widget.studentModel!.name;
      controllerEmail.text = widget.studentModel!.email;
      controllerMobile.text = widget.studentModel!.mobile;
    }

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(title :Text("Add/Update Student Data")),
          body: SingleChildScrollView(
            child: Container(
              margin: EdgeInsets.all(25),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Text("Student Name:", style: TextStyle(fontSize: 18)),
                      SizedBox(width: 20),
                      Expanded(
                        child: TextField(controller: controllerName,
                          textInputAction: TextInputAction.next,
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 60),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Text("Student Email:", style: TextStyle(fontSize: 18)),
                      SizedBox(width: 20),
                      Expanded(
                        child: TextField(
                            controller: controllerEmail,
                            textInputAction: TextInputAction.next,
                            keyboardType: TextInputType.emailAddress),
                      )
                    ],
                  ),
                  SizedBox(height: 60),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Text("Student Mobile:", style: TextStyle(fontSize: 18)),
                      SizedBox(width: 20),
                      Expanded(
                        child: TextField(
                          controller: controllerMobile,
                          keyboardType: TextInputType.number,
                          textInputAction: TextInputAction.done,),
                      )
                    ],
                  ),
                  SizedBox(height: 100),
                  MaterialButton(
                    color: Colors.deepOrange,
                    child: Text("Submit",
                        style: TextStyle(color: Colors.white, fontSize: 18)),
                    onPressed: () async {
                      var getStName = controllerName.text;
                      var getEmail = controllerEmail.text;
                      var getMobile = controllerMobile.text;
                      if (getStName.isNotEmpty &
                      getEmail.isNotEmpty &
                      getMobile.isNotEmpty) {
                        Student studentdata = new Student(
                            name: getStName,
                            email: getEmail,
                            mobile: getMobile);

                        if (widget.isEdit) {
                          var box = await Hive.openBox<Student>('student');
                          box.putAt(widget.position, studentdata);
                        } else {
                          var box = await Hive.openBox<Student>('student');
                          box.add(studentdata);
                        }
                        Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                                builder: (_) => StudentListScreen()),
                                (r) => false);
                      }
                    },
                  )
                ],
              ),
            ),
          )
      ),
    );
  }
}