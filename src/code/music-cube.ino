/*
Music Cube Official Program by Arduino
Version: 1.01
*/

int pin_red = 12;
int pin_green = 13;
int pin_blue = 14;

int amplitude[10];

int gain = 100;

void setup() {
  Serial.begin(115200);
  pinMode(pin_red, OUTPUT);
  pinMode(pin_green, OUTPUT);
  pinMode(pin_blue, OUTPUT);
}

void loop() {
  for (int i = 0; i < 10; i++) {
    unsigned long now = millis();
    int interval = 10;
    int sample;
    amplitude[i] = 0;
    int output;
    while (millis() < now + interval) {
      sample = analogRead(A0);
      if(sample > amplitude[i]) amplitude[i] = sample;
    }
  }

  for (int i = 0; i < 9; i++) {
      for (int j = 0; j < 9 - i; j++) {
          if (amplitude[j] > amplitude[j+1]) {
              int temp = amplitude[j+1];
              amplitude[j+1] = amplitude[j];
              amplitude[j] = temp;
          }
      }
  }

  int r = (amplitude[9] - amplitude[6])*gain;
  int g = (amplitude[8] - amplitude[5])*gain;
  int b = (amplitude[7] - amplitude[4])*gain;
  
  analogWrite(pin_red, r);
  analogWrite(pin_green, g);
  analogWrite(pin_blue, b);

  Serial.print(r);
  Serial.print(",");
  Serial.print(g);
  Serial.print(",");
  Serial.print(b);
  Serial.println();
  
}
