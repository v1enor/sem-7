#define RED1    2
#define GREEN1  4
#define ORANGE2 10
#define BOUTON  7
int pause = 1000;

void setup() {
   pinMode(RED1, OUTPUT);
   pinMode(GREEN1, OUTPUT);
   pinMode(ORANGE2, OUTPUT);
   pinMode(BOUTON, INPUT);
   Serial.begin(9600); 
}

void loop() {
      String input = Serial.readString();
      if (input.equals("sleep")) {
         while(true){
            digitalWrite(RED1, LOW);
            digitalWrite(GREEN1, LOW);
            digitalWrite(ORANGE2, HIGH);
            delay(500);
            digitalWrite(RED1, LOW);
            digitalWrite(GREEN1, LOW);
            digitalWrite(ORANGE2, LOW);
            delay(500);
             if(digitalRead(BOUTON) == HIGH){
            break;
            }
         }
      } 
      if (input.equals("act")) {
         while(true){
         digitalWrite(RED1, LOW);
         digitalWrite(GREEN1, HIGH);
         digitalWrite(ORANGE2, LOW);
         if(digitalRead(BOUTON) == HIGH){
            break;
         }
         }
      } 
      if (input.equals("default")){
       while(true){
            digitalWrite(RED1, LOW);
            digitalWrite(GREEN1, HIGH);
            digitalWrite(ORANGE2, LOW);
            delay(pause);
            digitalWrite(RED1, LOW);
            digitalWrite(GREEN1, LOW);
            digitalWrite(ORANGE2, HIGH);
            delay(pause);
            digitalWrite(RED1, HIGH);
            digitalWrite(GREEN1, LOW);
            digitalWrite(ORANGE2, LOW);
            delay(pause);
            digitalWrite(RED1, HIGH);
            digitalWrite(GREEN1, LOW);
            digitalWrite(ORANGE2, HIGH);
            delay(pause);
            
          
            if(digitalRead(BOUTON) == HIGH){
            break;
            }
         
       }
         
      }
}
