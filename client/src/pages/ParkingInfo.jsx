import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import service from '../services/parking.service';
import action from '../redux/parking/parking.action';

const ParkingInfo = () => {
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ParkingInfo;
