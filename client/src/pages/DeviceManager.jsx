import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';

import Loader from '../components/Loader';
import convertTime from '../utils/convertTime';
import confirm from '../utils/confirm';
import action from '../redux/device/device.action';
import service from '../services/device.service';

const DeviceManager = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getAllDevice();
            const sortedDevices = _.orderBy(res.data, ['createdAt', 'Name'], 'asc');
            setDevices(sortedDevices);
            setLoading(false);
        };

        fetchData();
    }, []);

    const removeDevice = (id) => {
        setDevices((prev) => {
            return prev.filter((item) => item.Device_ID !== id);
        });
    };

    function deleteDevice(object) {
        confirm({
            title: 'Xóa thiết bị',
            message: `Khi bạn xác nhận thiết bị "${object.Name}" sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: async () => {
                await service.deleteDevice(object.Device_ID);
                removeDevice(object.Device_ID);
            },
        });
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="m-8 overflow-x-auto w-fit">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên thiết bị</th>
                                <th>Đang phục vụ bãi đỗ xe</th>
                                <th>ID thiết bị</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật gần nhất</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device, index) => (
                                <tr key={device.Device_ID}>
                                    <th>{index + 1}</th>
                                    <td>{device.Name}</td>
                                    <td>{device.Parking ? device.Parking.Name : 'Không phục vụ'}</td>
                                    <td>{device.Device_ID}</td>
                                    <td>{convertTime(device.createdAt)}</td>
                                    <td>{convertTime(device.updatedAt)}</td>
                                    <td className="flex items-center gap-3">
                                        <Link
                                            to="/device/edit"
                                            onClick={() => dispatch(action.addDevice(device.Device_ID))}
                                            className="ml-2 text-lg text-green-700"
                                        >
                                            <FaRegEdit />
                                        </Link>
                                        <Link className="text-xl text-error" onClick={() => deleteDevice(device)}>
                                            <TiDeleteOutline />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default DeviceManager;
