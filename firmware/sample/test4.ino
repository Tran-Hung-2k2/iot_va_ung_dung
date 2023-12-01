#include <MFRC522.h>
#include <SPI.h>

#define SS_PIN  21
#define RST_PIN 22

int UID[4], i;

int ID1[4] = {91, 37, 120, 34};  // Thẻ bật tắt đèn
int led = 8;

int dem = 0;

MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {

    Serial.begin(9600);

    pinMode(led, OUTPUT);
    digitalWrite(led, LOW);

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

    Serial.print("UID của thẻ: ");

    for (byte i = 0; i < mfrc522.uid.size; i++) {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
        UID[i] = mfrc522.uid.uidByte[i];
        Serial.print(UID[i]);
    }

    Serial.println("   ");

    if (UID[i] == ID1[i]) {
        dem++;
        Serial.print("Biến Đếm: ");
        Serial.println(dem);

        if ((dem % 2) == 1)  // Số lẻ đèn ON
        {
            digitalWrite(led, HIGH);
            Serial.println("ĐÈN ON");
        } else {
            digitalWrite(led, LOW);
            Serial.println("ĐÈN OFF");
        }
    }

    else {
        Serial.println("SAI THẺ........");
    }

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
}
