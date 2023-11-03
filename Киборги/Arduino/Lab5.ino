#define LED_PIN_RED 9
#define LED_PIN_GREEN 10
#define LED_PIN_BLUE 11

String message;
bool ledState = false;

void setup()
{
  pinMode(LED_PIN_RED, OUTPUT);
  pinMode(LED_PIN_GREEN, OUTPUT);
  pinMode(LED_PIN_BLUE, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  while (Serial.available()) {
    char incomingChar = Serial.read();
    if (incomingChar != '\n') {
      message += incomingChar;

    }
    if (incomingChar == '\n') {
	  Serial.println(message);
      message.toLowerCase();
      if (message == "on") {
        Serial.println(message);
        ledState = true;
      } else if (message == "off") {
        ledState = false;
        analogWrite(LED_PIN_RED, 0);
        analogWrite(LED_PIN_GREEN, 0);
        analogWrite(LED_PIN_BLUE, 0);
      } else {
        if (ledState) {
          // Разделяем введенную строку на три значения цвета
          int commaIndex1 = message.indexOf(',');
          int commaIndex2 = message.indexOf(',', commaIndex1 + 1);
          if (commaIndex1 != -1 && commaIndex2 != -1) {
            // Извлекаем значения цвета из строки
            String redValueStr = message.substring(0, commaIndex1);
            String greenValueStr = message.substring(commaIndex1 + 1, commaIndex2);
            String blueValueStr = message.substring(commaIndex2 + 1);
            
            // Преобразуем значения цвета в целочисленный тип
            int redValue = redValueStr.toInt();
            int greenValue = greenValueStr.toInt();
            int blueValue = blueValueStr.toInt();
			Serial.println(redValue);
      Serial.println(greenValue);
      Serial.println(blueValue);
            
            // Проверяем, что значения цвета находятся в допустимом диапазоне
            if (redValue >= 0 && redValue <= 255 && greenValue >= 0 && greenValue <= 255 && blueValue >= 0 && blueValue <= 255) {
              // Устанавливаем значения цвета на соответствующих пинах
              analogWrite(LED_PIN_RED, redValue);
              analogWrite(LED_PIN_GREEN, greenValue);
              analogWrite(LED_PIN_BLUE, blueValue);
            } else {
              Serial.println("Error: color values must be between 0 and 255");
            }
          } else {
            Serial.println("Error: invalid color format");
          }
        } else {
          Serial.println("LED is off, can't set color");
        }
      }
      message = "";
    }
  }
}
