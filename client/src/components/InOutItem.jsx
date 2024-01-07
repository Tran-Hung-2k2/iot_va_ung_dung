import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import label from '../constants/label';
import service from '../services/device.service';
import recordService from '../services/record.service';
import mqttService from '../services/mqtt.service';
import cardService from '../services/card.service';
import notify from '../utils/notify';
import getImage from '../utils/getImage';
import inoutAction from '../redux/inout/inout.action';
import checkUUIDv4 from '../utils/checkUUIDv4';

function InOutItem({ Parking_ID, id, openTime }) {
    const dispatch = useDispatch();
    const { action, currDevice, cameraIP } = useSelector((state) => state.inout);
    const [devices, setDevices] = useState();
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState(null);
    const [user, setUser] = useState(null);
    const [color, setColor] = useState('primary');
    const [Card_ID, setCard_ID] = useState('');
    const [file, setFile] = useState(null);
    const [images, setImages] = useState(['/src/assets/images/default.jpg', '/src/assets/images/default.jpg']);

    useEffect(() => {
        async function getData() {
            const res = await service.getAllDevice({ Parking_ID });
            setDevices(res.data);
            setLoading(false);
            setClient(mqttService.connect(uuidv4()));
        }

        getData();
    }, []);

    useEffect(() => {
        mqttService.listen(client);

        return () => {
            if (client) mqttService.disconnect(client);
        };
    }, [client]);

    useEffect(() => {
        const handleMessage = async (topic, message) => {
            if (topic == currDevice[id] + '/info' && checkUUIDv4(message)) {
                if (cameraIP[id]) {
                    const { url, file } = await getImage(cameraIP[id], currDevice[id]);
                    if (url) {
                        const cardIdString = String.fromCharCode.apply(null, message);
                        if (action[id] == label.action.GO_OUT) {
                            const res = await recordService.getLastestRecord({ Parking_ID, Card_ID: cardIdString });
                            if (res?.data?.Image) setImages([res.data.Image, url]);
                            else setImages(['/src/assets/images/default.jpg', url]);
                        } else setImages(['/src/assets/images/default.jpg', url]);
                        const res = await cardService.getParkingCardInfo({ Card_ID: cardIdString });
                        setUser(res.data.User);
                        setFile(file);
                        setCard_ID(cardIdString);
                        setColor('green-700');
                    }
                } else notify('Vui lòng nhập địa chỉ IP của camera để chụp ảnh biển số xe', 'error');
            }
        };

        if (client) {
            // Loại bỏ hàm xử lý cũ trước khi thêm hàm xử lý mới
            client.removeListener('message', handleMessage);
            client.on('message', handleMessage);
        }

        // Clean up: Loại bỏ hàm xử lý khi component unmount
        return () => {
            if (client) {
                client.removeListener('message', handleMessage);
            }
        };
    }, [client, currDevice, cameraIP, action]);

    useEffect(() => {
        setColor('primary');
    }, [action]);

    useEffect(() => {
        if (currDevice[id]) {
            mqttService.subscribe(client, currDevice[id] + '/info');
        }

        return () => {
            if (currDevice[id]) mqttService.unsubscribe(client, currDevice[id] + '/info');
        };
    }, [currDevice, client]);

    return loading ? (
        <div></div>
    ) : (
        <div className="flex flex-col gap-4">
            <div>
                <label className="block font-medium mb-2">Địa chỉ IP của Camera (cùng mạng LAN)</label>
                <input
                    className="w-full max-w-xl input input-bordered input-primary"
                    type="text"
                    placeholder="Ví dụ: 192.168.0.1"
                    value={cameraIP[id]}
                    onChange={(event) => dispatch(inoutAction.setCameraIP(id, event.target.value))}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">Chọn thiết bị hoạt động</label>
                <select
                    name="select"
                    className="w-full max-h-2 select select-primary"
                    value={currDevice[id]}
                    onChange={(event) => dispatch(inoutAction.setDevice(id, event.target.value))}
                >
                    <option value="">Thiết bị</option>
                    {devices.map((device) => (
                        <option key={device.Device_ID} value={device.Device_ID}>
                            {device.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-medium mb-2">Hành động (vào/ ra)</label>
                <select
                    name="select"
                    className="w-full max-h-2 select select-primary"
                    value={action[id]}
                    onChange={(event) => dispatch(inoutAction.setAction(id, event.target.value))}
                >
                    {Object.entries(label.action).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <img
                className={`object-contain w-full rounded-lg h-72 border-2 ${
                    color == 'green-700' ? 'border-green-700' : 'border-primary'
                }`}
                src={images[0]}
            />
            <img
                className={`object-contain w-full rounded-lg h-60 border-2 ${
                    color == 'green-700' ? 'border-green-700' : 'border-primary'
                }`}
                src={images[1]}
            />
            {user && (
                <div>
                    <b>{user.Role == label.role.ADMIN ? 'Thẻ khách' : user.Name}</b> - <b>{user.Balance * 1000} VNĐ</b>
                </div>
            )}
            <button
                className="btn w-full btn-primary"
                onClick={async () => {
                    if (currDevice && file && Card_ID) {
                        if (color == 'green-700') {
                            const newRecord = new FormData();
                            newRecord.append('Action', action[id]);
                            newRecord.append('Card_ID', Card_ID);
                            newRecord.append('Parking_ID', Parking_ID);
                            newRecord.append('Image', file);
                            await recordService.addRecord(newRecord);
                            setColor('primary');
                            mqttService.publish(client, currDevice[id] + '/control', openTime);
                        } else notify('Chưa có thẻ nào được quẹt', 'error');
                    } else notify('Vui lòng chọn thiết bị trước khi mở barier', 'error');
                }}
            >
                Mở barier
            </button>
        </div>
    );
}

export default InOutItem;
