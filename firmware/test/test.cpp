#include <Arduino.h>
#include <MFRC522.h>
#include <SPI.h>
// a6708b41-1595-40f4-8ee4-06e159f8ade7
// Định nghĩa chân kết nối
#define SS_PIN  21
#define RST_PIN 22

// Tạo đối tượng MFRC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
    // Khởi tạo kết nối Serial
    Serial.begin(9600);
    // Khởi tạo giao tiếp SPI
    SPI.begin();
    // Khởi tạo module đọc thẻ RFID
    mfrc522.PCD_Init();
}

void loop() {
    // Kiểm tra xem có thẻ mới nằm trên đầu đọc hay không
    if (!mfrc522.PICC_IsNewCardPresent()) {
        return;
    }

    // Đọc thông tin từ thẻ nếu có thẻ mới
    if (!mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    // In thông tin từ thẻ (UID) lên cổng Serial
    mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
}
