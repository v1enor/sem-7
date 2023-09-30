// 1. Создаем интерфейс для одежды
abstract class Clothing {
  String get name;
  double get price;
  void wear();
}

// 2. Создаем интерфейс для аксессуаров
abstract class Accessory {
  String get name;
  double get price;
  void accessorize();
}

// 3. Создаем абстрактный класс для общих свойств одежды и аксессуаров
abstract class FashionItem {
  String name;
  double price;

  FashionItem(this.name, this.price);

  void displayInfo();

  // Метод, который должен быть перегружен
  void use();

  // Getter и Setter
  String get getName => name;
  set setName(String newName) => name = newName;

  double get getPrice => price;
  set setPrice(double newPrice) => price = newPrice;

  // Static поле и функция
  static int itemCount = 0;

  static void increaseCount() {
    itemCount++;
  }

  // Функция с именованным параметром
  void addToCart({int quantity = 1}) {
    print('$quantity item(s) of $name added to cart.');
  }

  // Функция с параметром по умолчанию
  void shipOrder([String shippingMethod = 'Standard']) {
    print('Shipping $name using $shippingMethod shipping method.');
  }

  // Функция с параметром типа функция
  void customize(void Function() customFunction) {
    customFunction();
  }

  // Функция с необязательным параметром
  void giftWrap([bool includeCard = false]) {
    if (includeCard) {
      print('Gift-wrapping $name with a card.');
    } else {
      print('Gift-wrapping $name without a card.');
    }
  }
}

// 4. Класс для платья
class Dress extends FashionItem implements Clothing {
  String size;

  Dress(String name, double price, this.size) : super(name, price);

  @override
  void wear() {
    print('Wearing a $size-sized dress: $name');
  }

  @override
  void displayInfo() {
    print('$name - Size: $size, Price: \$${price.toStringAsFixed(2)}');
  }

  @override
  void use() {
    wear();
  }
}

// 5. Класс для шляпы
class Hat extends FashionItem implements Accessory {
  String style;

  Hat(String name, double price, this.style) : super(name, price);

  @override
  void accessorize() {
    print('Adding some style with a $style hat: $name');
  }

  @override
  void displayInfo() {
    print('$name - Style: $style, Price: \$${price.toStringAsFixed(2)}');
  }

  @override
  void use() {
    accessorize();
  }
}

void main() {
  // 6. Продемонстрируем работу с классами и интерфейсами

  Dress dress1 = Dress('Red Party Dress', 89.99, 'M');
  Hat hat1 = Hat('Fedora Hat', 29.99, 'Classic');

  dress1.use();
  dress1.displayInfo();
  dress1.addToCart(quantity: 2);
  dress1.shipOrder();
  dress1.customize(() {
    print('Adding a ribbon.');
  });
  dress1.giftWrap(true);

  hat1.use();
  hat1.displayInfo();
  hat1.addToCart();
  hat1.shipOrder('Express');
  hat1.customize(() {
    print('Changing the hatband.');
  });
  hat1.giftWrap();
}