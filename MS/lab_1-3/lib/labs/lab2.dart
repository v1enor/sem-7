// 1. Создание иерархии классов

abstract class Transport {
  String name;
  int maxSpeed;

  Transport(this.name, this.maxSpeed);

  void move();
}

class Car extends Transport implements Movable {
  int numWheels;

  Car(String name, int maxSpeed, this.numWheels) : super(name, maxSpeed);

  @override
  void move() {
    print('$name с $numWheels колесами едет.');
  }

  void honk() {
    print('$name сигналит.');
  }


  void implementMe() {
    print('$name реализует интерфейс Movable.');
  }
}

class Bicycle extends Transport implements Movable {
  int numGears;

  Bicycle(String name, int maxSpeed, this.numGears) : super(name, maxSpeed);

  @override
  void move() {
    print('$name с $numGears передачами катается.');
  }

  void ringBell() {
    print('$name звонит в колокол.');
  }


  void implementMe() {
    print('$name реализует интерфейс Movable.');
  }
}

class Plane extends Transport {
  int maxAltitude;

  Plane(String name, int maxSpeed, this.maxAltitude) : super(name, maxSpeed);

  @override
  void move() {
    print('$name летит на высоте $maxAltitude футов.');
  }

  void takeOff() {
    print('$name взлетает.');
  }
  @override
  void land() {
    print('$name приземляется.');
  }
}

// 2. Создание интерфейса

abstract class Movable {
  void move();

  void implementMe();
}

// 3. Создание абстрактного класса

abstract class AbstractClass {
  void abstractMethod();
}

class ConcreteClass extends AbstractClass {
  @override
  void abstractMethod() {
    print('ConcreteClass реализует abstractMethod.');
  }
}

// 4. Класс с конструкторами, геттерами, сеттерами и статическими полями/функциями

class ExampleClass {
  String name;
  int age;
  static int count = 0;

  ExampleClass(this.name, this.age);

  ExampleClass.withDefaultAge(this.name) : age = 18;

  String get getName => name;

  set setName(String newName) {
    name = newName;
  }

  static void incrementCount() {
    count++;
  }

  void namedParameterFunction({int number = 0}) {
    print('Named parameter: $number');
  }

  void functionWithDefaultParameter(int number, [bool flag = false]) {
    print('Number: $number, Flag: $flag');
  }

  void functionWithFunctionParameter(void Function() callback) {
    print('Вызов функции из параметра');
    callback();
  }

  void functionWithOptionalParameter([String? message]) {
    if (message != null) {
      print('Optional parameter: $message');
    } else {
      print('Optional parameter not provided');
    }
  }
}

// 5. Демонстрация работы с массивом, коллекцией и множеством

void demonstrateCollections() {
  List<String> cars = ['BMW', 'Toyota', 'Honda'];
  print('Cars: $cars');

  Set<String> uniqueCars = {'BMW', 'Toyota', 'Honda'};
  print('Unique Cars: $uniqueCars');

  Map<String, int> carPrices = {
    'BMW': 50000,
    'Toyota': 30000,
    'Honda': 25000,
  };
  print('Car Prices: $carPrices');
}

// 6. Демонстрация работы с continue и break

void demonstrateContinueAndBreak() {
  for (int i = 0; i < 5; i++) {
    if (i == 2) {
      continue;
    }
    print('Continue: $i');
  }

  for (int i = 0; i < 5; i++) {
    if (i == 3) {
      break;
    }
    print('Break: $i');
  }
}

// 7. Демонстрация обработки исключений

void demonstrateExceptionHandling() {
  try {
    int result = 10 ~/ 0; // Деление на ноль
    print('Результат: $result');
  } catch (e) {
    print('Поймано иобработано исключение: $e');
  }
}

void main() {
  // Пример использования классов и функций

  Car car = Car('Audi', 200, 4);
  car.move();
  car.honk();
  car.implementMe();

  Bicycle bicycle = Bicycle('Trek', 30, 21);
  bicycle.move();
  bicycle.ringBell();
  bicycle.implementMe();

  Plane plane = Plane('Boeing', 500, 35000);
  plane.move();
  plane.takeOff();
  plane.land();

  AbstractClass abstractClass = ConcreteClass();
  abstractClass.abstractMethod();

  ExampleClass example1 = ExampleClass('John', 25);
  print('Name: ${example1.getName}, Age: ${example1.age}');
  example1.setName = 'Michael';
  print('Name: ${example1.getName}, Age: ${example1.age}');

  ExampleClass example2 = ExampleClass.withDefaultAge('Alice');
  print('Name: ${example2.getName}, Age: ${example2.age}');

  ExampleClass.incrementCount();
  print('Count: ${ExampleClass.count}');

  example1.namedParameterFunction(number: 10);

  example1.functionWithDefaultParameter(5);
  example1.functionWithDefaultParameter(5, true);

  example1.functionWithFunctionParameter(() {
    print('Callback function called');
  });

  example1.functionWithOptionalParameter();
  example1.functionWithOptionalParameter('Hello');

  demonstrateCollections();

  demonstrateContinueAndBreak();

  demonstrateExceptionHandling();


}