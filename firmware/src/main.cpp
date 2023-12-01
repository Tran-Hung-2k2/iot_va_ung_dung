#include <Arduino.h>
// Libraries
#include <MFRC522.h>  //GitHub - miguelbalboa/rfid: Arduino RFID Library for MFRC522 4
#include <SPI.h>  //SPI - Arduino Reference 3
/*
Vcc <-> 3V3 (ou Vin(5V), dependendo da versão do módulo)
RST (Reset) <-> D22
GND (Masse) <-> GND
MISO (Master Input Slave Output) <-> 19
MOSI (Master Output Slave Input) <-> 23
SCK (Serial Clock) <-> 18
SS/SDA (Slave select) <-> 21
*/

// Constants
#define SS_PIN  21
#define RST_PIN 22
// Parameters

MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
    Serial.begin(9600);
    SPI.begin();
    mfrc522.PCD_Init();
}

void loop() {
    if (!mfrc522.PICC_IsNewCardPresent()) {
        return;
    }
    if (!mfrc522.PICC_ReadCardSerial()) {
        return;
    }
    mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
}
