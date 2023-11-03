mixin class getOIl{
  String company = "oil";
  void oil()=>print("works on $company");
}
mixin getGas{
  String university = "gas";
  void gas() =>print("works on $university");
}
class Trn with getGas, getOIl{

  String name;
  Trn(this.name);
}
void main (){

  Trn car = Trn("hionda");
  car.oil();
  car.gas();
}

