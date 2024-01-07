import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import service from '../services/parking_manger.service';
import action from '../redux/parking/parking.action';
import parkingManagerAction from '../redux/parking_manager/parking_manager.action';

const InOutParking = () => {
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unload, setUnload] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getParkingManagerByManager();
            const sortedParkings = _.orderBy(res.data, ['createdAt', 'Name'], 'asc');
            setParkings(sortedParkings);
            setLoading(false);
        };

        const timeoutId = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [unload]);

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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkings.map((parking, index) => (
                                <tr key={parking.Parking_ID}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <Link
                                            onClick={() => {
                                                dispatch(action.addParking(parking.Parking_ID));
                                            }}
                                            to="/record/manager"
                                        >
                                            {parking.Name}
                                        </Link>
                                    </td>
                                    <td>{parking.Address}</td>
                                    <td>{parking && parking?.Charge * 1000 + ' VNĐ'}</td>
                                    <td>
                                        {parking.Number_Of_Vehicles} / {parking.Max_Space}
                                    </td>
                                    <td>
                                        {parking.Parking_Managers[0].Is_Managing ? (
                                            <button
                                                onClick={async () => {
                                                    dispatch(
                                                        parkingManagerAction.setManaging(
                                                            parking.Parking_ID,
                                                            false,
                                                            () => {
                                                                setUnload(!unload);
                                                            },
                                                        ),
                                                    );
                                                }}
                                                className="mx-1 text-white btn btn-error btn-xs"
                                            >
                                                Dừng quản lý
                                            </button>
                                        ) : (
                                            <button
                                                onClick={async () => {
                                                    dispatch(
                                                        parkingManagerAction.setManaging(
                                                            parking.Parking_ID,
                                                            true,
                                                            () => {
                                                                navigate('/in-out/manager');
                                                            },
                                                        ),
                                                    );
                                                }}
                                                className="mx-1 text-white btn btn-success btn-xs"
                                            >
                                                Quản lý
                                            </button>
                                        )}
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

export default InOutParking;
