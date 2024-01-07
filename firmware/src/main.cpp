#include <Arduino.h>
#include <ESP32Servo.h>
#include <MFRC522.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

// Định nghĩa chân kết nối
#define SS_PIN    21
#define RST_PIN   22
#define SERVO_PIN 13

#define WIFI_SSID     "Bach Doan 1"
#define WIFI_PASS     "bachdoan2020"
#define MQTT_BROKER   "e23dadcd2df84208802b91b1f3c5f2cc.s1.eu.hivemq.cloud"
#define MQTT_PORT     8883
#define MQTT_USERNAME "tranhung912002"
#define MQTT_PASSWORD "Test123456"
#define DEVICE_ID     "2ce84ffe-9aba-448d-bea4-05bf0d3bfa03"

/****** root certificate *********/

static const char *root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";

char clientId[50];

// Tạo đối tượng MFRC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

/**** Secure WiFi Connectivity Initialisation *****/
WiFiClientSecure espClient;
/**** MQTT Client Initialisation Using WiFi Connection *****/
PubSubClient client(espClient);

Servo myservo;

void mqttPublish(const char *data) {
    char topicBuffer[50];
    strcpy(topicBuffer, DEVICE_ID);
    strcat(topicBuffer, "/info");
    client.publish(topicBuffer, data);
}

void callback(char *topic, byte *payload, unsigned int length) {
    // Xử lý dữ liệu nhận được từ MQTT broker
    String message;
    for (unsigned int i = 0; i < length; i++) {
        message += (char) payload[i];
    }

    char controlTopicBuffer[50];
    strcpy(controlTopicBuffer, DEVICE_ID);
    strcat(controlTopicBuffer, "/control");

    if (strcmp(topic, controlTopicBuffer) == 0) {
        int delayTime = message.toInt();
        if (delayTime <= 0) delayTime = 3;
        myservo.write(180);
        delay(1000 * delayTime);
        myservo.write(0);
    }
}

void wifiConnect() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
}

void mqttReconnect() {
    // Kết nối lại với MQTT broker
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...\n");
        long r = random(1000);
        sprintf(clientId, "clientId-%ld", r);
        if (client.connect(clientId, MQTT_USERNAME, MQTT_PASSWORD)) {
            Serial.print(clientId);
            Serial.println(" connected\n");

            // Subscribe topic
            String controlTopic = String(DEVICE_ID) + "/control";
            client.subscribe(controlTopic.c_str());
            Serial.println("Subscribe topic " + controlTopic + " success");
        } else {
            Serial.print("Failed, rc=");
            Serial.print(client.state());
            Serial.println(" Retrying in 5 seconds...");
            delay(5000);
        }
    }
}

void setup() {
    // Khởi tạo kết nối Serial
    Serial.begin(9600);
    // Khởi tạo giao tiếp SPI
    SPI.begin();
    // Khởi tạo module đọc thẻ RFID
    mfrc522.PCD_Init();
    // Allow allocation of all timers
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);
    myservo.setPeriodHertz(50);
    myservo.attach(SERVO_PIN, 1000, 2000);

    wifiConnect();
    Serial.println("WiFi connected");

    espClient.setCACert(root_ca);

    client.setServer(MQTT_BROKER, MQTT_PORT);
    client.setCallback(callback);
}
char uuidStr[24];
void loop() {
    // Kiểm tra kết nối MQTT broker
    if (!client.connected()) mqttReconnect();
    client.loop();
    delay(10);

    // Kiểm tra xem có thẻ mới nằm trên đầu đọc hay không
    if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial())
        return;

    // Lưu UUID vào chuỗi uuidStr
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        sprintf(uuidStr + i * 2, "%02X", mfrc522.uid.uidByte[i]);
    }

    if (strcmp(uuidStr, "33C93611") == 0)
        mqttPublish("ad9dea2e-7b47-4d35-9291-a60e69245523");
    else if (strcmp(uuidStr, "D316C70D") == 0)
        mqttPublish("d97987a4-696d-4632-a4a8-7c46e9522286");
    else
        mqttPublish("d97987a4-696d-4632-a4a8-7c46e3522286");

    // In ra Serial UUID của thẻ
    Serial.print("UUID: ");
    Serial.println(uuidStr);

    delay(2000);
}
