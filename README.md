# 2022 J. B. Hunt Hackathon - Grow Butler

Our solution to sustainability - a smart flower pot that turns on a light in the most optimal way possible to conserve power and grow your plant.

C++ code for the ESP8266
```cpp
#include <ESP8266WiFi.h>
#include <thread>
#include <iostream>
#include <future>
#include <chrono>
const char* ssid = "test";
const char* password = "testtest";

// webserver configuration
WiFiServer server(80);

String header;  // store the request in a string

unsigned long currentTime = millis();  // set current to now
unsigned long previousTime = 0;        // set to 0 as starting
const long timeoutTime = 2000;         // web server times out after 2000ms

const int led1 = 13;
const int led2 = 12;
const int led3 = 14;

void turnAllLEDsOff() {
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW);
}

bool breakLED = true;
int currentLED = 0;

unsigned long int onDelay = 0;
unsigned long int offDelay = 0;
unsigned long int onDelayLoop = 0;
unsigned long int offDelayLoop = 0;
unsigned long int endLEDTime = 0;
unsigned long int currentLEDTime = 0;

void setup() {

  Serial.begin(115200);
  delay(100);

  // turn off all LEDs
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);

  turnAllLEDsOff();
  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Netmask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());

  server.begin();  // begin web server
}

void loop() {
  using namespace std;

  // led on code task to fake multithreading
  if (!breakLED) {  // run if breakLED is false
    if (currentLEDTime > onDelayLoop) {
      digitalWrite(currentLED, 0);  // turn the LED off
    } else {
      digitalWrite(currentLED, 255);  // turn the LED on
    }

    if (currentLEDTime >= endLEDTime)  // the delay is fully up and we stop the led loop, set variables back
    {
      // update timings for loop to run continuously
      onDelayLoop = millis() + onDelay;
      endLEDTime = onDelayLoop + offDelay;
      currentLEDTime = millis();
    } else {
      // still running, increment time
      currentLEDTime = millis();
    }
  }

  WiFiClient client = server.available();  // listen for client

  if (client) {  // client is connecting

    Serial.println("Incoming connection");  // connection yay

    // set variables needed
    String currentLine = "";     // incoming data
    currentTime = millis();      // current time
    previousTime = currentTime;  // previous time

    while (client.connected() && currentTime - previousTime <= timeoutTime) {  // loop while the client's connected
      currentTime = millis();                                                  // s
      if (client.available()) {                                                // if client sending request
        char c = client.read();                                                // read each byte
        header += c;                                                           // and add to header
        if (c == '\n') {                                                       // if the byte is a newline character, end of request headers
          if (currentLine.length() == 0) {                                     // should be 0 of end, else clear the line & rerun

            // send headers
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println("Access-Control-Allow-Origin: *");
            client.println();

            if (header.indexOf("GET /plants/asparagus") != -1)  // asparagus
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led1;

              onDelay = 1000, onDelayLoop = millis() + 1000;
              offDelay = 4000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            if (header.indexOf("GET /plants/tulips") != -1)  // tulips
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led2;

              onDelay = 2000, onDelayLoop = millis() + 2000;
              offDelay = 1000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            if (header.indexOf("GET /plants/cactus") != -1)  // cactus
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led3;

              onDelay = 1000, onDelayLoop = millis() + 1000;
              offDelay = 1000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            if (header.indexOf("GET /plants/btree") != -1)  // cactus
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led1;

              onDelay = 6000, onDelayLoop = millis() + 6000;
              offDelay = 18000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            if (header.indexOf("GET /plants/corn") != -1)  // cactus
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led2;

              onDelay = 7000, onDelayLoop = millis() + 7000;
              offDelay = 17000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            if (header.indexOf("GET /plants/cilantro") != -1)  // cactus
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led3;

              onDelay = 8000, onDelayLoop = millis() + 8000;
              offDelay = 16000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            if (header.indexOf("GET /plants/potato") != -1)  // cactus
            {
              turnAllLEDsOff();

              breakLED = false;
              currentLED = led1;

              onDelay = 6000, onDelayLoop = millis() + 6000;
              offDelay = 18000;
              endLEDTime = onDelayLoop + offDelay;  // total time
              currentLEDTime = millis();

              client.println("ok");
              break;
            }

            // this would be default route,
            // do nothing
            client.println("no route");
            break;

          } else {
            currentLine = "";  // new line, clear the current line
          }
        } else if (c != '\r') {
          currentLine += c;  // add carrier to end of the line
        }
      }
    }

    header = "";    // reset header for next request
    client.stop();  // close the connection
  }
}
```
