import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import parkingManagerAction from '../redux/parking_manager/parking_manager.action';
import service from '../services/parking_manger.service';
import InOutItem from '../components/InOutItem';
import ButtonBack from '../components/ButtonBack';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [parking, setParking] = useState('');
    const [openTime, setOpenTime] = useState('3');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Parking_ID } = useSelector((state) => state.parking_manger);

    useEffect(() => {
        let Is_Managing = false;

        async function checkStatus() {
            const res = await service.getParkingManagerByManager({ Parking_ID });
            setParking(res.data[0]);
            Is_Managing = res.data[0]?.Parking_Managers[0]?.Is_Managing;

            if (Is_Managing) {
                setLoading(false);
            } else navigate(-1);
        }

        checkStatus();

        return () => {
            if (Is_Managing) {
                dispatch(
                    parkingManagerAction.setManaging(Parking_ID, false, () => {
                        // Navigate to the specified route after stopping managing
                        navigate('/in-out/parking');
                    }),
                );
            }
        };
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="m-8 overflow-x-auto w-full">
            <ButtonBack />
            <h2 className="font-bold text-2xl mt-4">Bãi đỗ xe {parking?.Name}</h2>
            <div className="mt-4">
                <label className="block font-medium mb-2">Thời gian mở barier (giây)</label>
                <input
                    className="w-full max-w-xl input input-bordered input-primary"
                    type="text"
                    placeholder="Ví dụ: 2 (2 giây)"
                    value={openTime}
                    onChange={(event) => setOpenTime(event.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-8 w-full pr-16 mt-2">
                <InOutItem openTime={openTime} id={0} Parking_ID={Parking_ID} />
                <InOutItem openTime={openTime} id={1} Parking_ID={Parking_ID} />
            </div>
        </div>
    );
};

export default App;
