
#include <Bounce2.h>

#define PIN_BUTTON 2
#define PIN_LED 10

Bounce debouncer = Bounce();

bool ledState = LOW;

void setup() {
  pinMode(PIN_BUTTON, INPUT_PULLUP);AllTopic:AllAllTopic:All

  debouncer.attach(PIN_BUTTON);
  debouncer.interval(10); 

  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  debouncer.update();

  int value = debouncer.read();

  if (value == LOW) {
    ledState = !ledState;
    digitalWrite(PIN_LED, ledState);
    while (debouncer.read() == LOW) {
      debouncer.update();
    }
  }
}

