import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';

import Loader from '../components/Loader';
import convertTime from '../utils/convertTime';
import confirm from '../utils/confirm';
import action from '../redux/parking/parking.action';
import service from '../services/parking.service';

const ParkingManager = () => {
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getAllParking();
            const sortedParkings = _.orderBy(res.data, ['createdAt', 'Name'], 'asc');
            setParkings(sortedParkings);
            setLoading(false);
        };

        fetchData();
    }, []);

    const removeParking = (id) => {
        setParkings((prevParkings) => {
            return prevParkings.filter((parking) => parking.Parking_ID !== id);
        });
    };

    function deleteParking(parking) {
        confirm({
            title: 'Xóa bãi đỗ xe',
            message: `Khi bạn xác nhận bãi đỗ xe "${parking.Name}" cùng với các thông tin liên quan đến bãi đỗ xe như thông tin ra vào và thông tin quản lý bãi đỗ xe sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: async () => {
                await service.deleteParking(parking.Parking_ID);
                removeParking(parking.Parking_ID);
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
                                <th>Tên bãi đỗ xe</th>
                                <th>Địa chỉ</th>
                                <th>Phí gửi xe</th>
                                <th>Số lượng xe</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật gần nhất</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkings.map((parking, index) => (
                                <tr key={parking.Parking_ID}>
                                    <th>{index + 1}</th>
                                    <td>{parking.Name}</td>
                                    <td>{parking.Address}</td>
                                    <td>{parking && parking?.Charge * 1000 + ' VNĐ'}</td>
                                    <td>
                                        {parking.Number_Of_Vehicles} / {parking.Max_Space}
                                    </td>
                                    <td>{convertTime(parking.createdAt)}</td>
                                    <td>{convertTime(parking.updatedAt)}</td>
                                    <td className="flex items-center gap-3">
                                        <Link
                                            to="/parking/edit"
                                            onClick={() => dispatch(action.addParking(parking.Parking_ID))}
                                            className="ml-2 text-lg text-green-700"
                                        >
                                            <FaRegEdit />
                                        </Link>
                                        <Link className="text-xl text-error" onClick={() => deleteParking(parking)}>
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

export default ParkingManager;
