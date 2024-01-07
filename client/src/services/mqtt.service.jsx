import mqtt from 'mqtt';

const MQTT_ADDR = `wss://e23dadcd2df84208802b91b1f3c5f2cc.s1.eu.hivemq.cloud:8884/mqtt`;
const USERNAME = 'tranhung912002';
const PASSWORD = 'Test123456';

const service = {
    connect: (clien_id) => {
        // console.log('Connecting...');
        return mqtt.connect(MQTT_ADDR, {
            clientId: clien_id,
            username: USERNAME,
            password: PASSWORD,
            clean: true,
        });
    },

    listen: (client, cb_process_msg) => {
        if (client) {
            // Sự kiện khi có lỗi kết nối
            client.on('error', (error) => {
                console.error('MQTT Error:', error);
            });

            // Sự kiện khi kết nối bị đóng
            client.on('close', () => {
                // console.log('Connection to MQTT broker closed');
            });

            // Sự kiện khi kết nối bị mất
            client.on('offline', () => {
                // console.log('MQTT client is offline');
            });

            // Sự kiện khi kết nối được khôi phục
            client.on('reconnect', () => {
                // console.log('Reconnecting to MQTT broker');
            });

            // Sự kiện khi kết nối được lưu trữ
            client.on('offline', () => {
                // console.log('MQTT client is offline');
            });

            // cb_process_msg(topic, message)
            // client.on('message', cb_process_msg);

            client.once('connect', function () {
                // console.log('Connect to broker successfully');
            });
        }
    },

    subscribe: (client, topic, cb_success) => {
        if (client) {
            client.subscribe(topic, (error) => {
                if (error) {
                    // console.log('Subscribe to topics error', error);
                } else {
                    console.log(`Subscribe to topics '${topic}' success`);
                    if (cb_success) cb_success();
                }
            });
        }
    },

    unsubscribe: (client, topic, cb_success) => {
        if (client) {
            client.unsubscribe(topic, (error) => {
                if (error) {
                    // console.log('Unsubscribe error', error);
                } else {
                    // console.log(`Unsubscribe from topic '${topic}' success`);
                    if (cb_success) cb_success();
                }
            });
        }
    },

    publish: (client, topic, message, cb_success) => {
        if (client) {
            client.publish(topic, message, (error) => {
                if (error) {
                    // console.log('Publish error: ', error);
                } else {
                    // console.log(`Publish message to topic '${topic}' success`);
                    if (cb_success) cb_success();
                }
            });
        }
    },

    disconnect: (client) => {
        if (client) {
            client.end(() => {
                // console.log('Disconnect');
            });
        }
    },
};

export default service;
