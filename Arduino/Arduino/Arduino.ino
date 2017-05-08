int left_0 = 0;
int left_1 = 1;
int right_0 = 2;
int right_1 = 3;

void setup() {
  pinMode(left_0, OUTPUT);
  pinMode(left_1, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(left_0, HIGH);
  digitalWrite(left_1, LOW);
  digitalWrite(right_0, HIGH);
  digitalWrite(right_1, LOW);
  //delay(1000);
  //digitalWrite(left_0, LOW);
  //digitalWrite(right_0, LOW);
  //delay(2000);
}

