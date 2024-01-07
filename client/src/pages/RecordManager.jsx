import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../components/Loader';
import service from '../services/record.service';
import label from '../constants/label';
import avatar from '../assets/images/avatar.jpg';
import convertTime from '../utils/convertTime';
import ButtonBack from '../components/ButtonBack';

const RecordManager = () => {
    const [records, setRecords] = useState([]);
    const [recordStore, setRecordStore] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { Parking_ID } = useSelector((state) => state.parking);
    const [email, setEmail] = useState('');
    const [card, setCard] = useState('');
    const [parking, setParking] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let res;
            if (user.Role == label.role.MANAGER) res = await service.getAllRecord({ Parking_ID });
            else res = await service.getAllRecord();
            const sortedRecords = _.orderBy(res.data, ['createdAt', 'Action'], 'desc');
            setRecordStore(sortedRecords);
            setRecords(
                sortedRecords.filter((record) => {
                    const userEmailMatch = email != '' ? record?.Parking_Card?.User?.Email === email : true;
                    const cardMatch = card != '' ? record?.Card_ID === card : true;
                    const parkingMatch = parking != '' ? record?.Parking.Name === parking : true;

                    return userEmailMatch && cardMatch && parkingMatch;
                }),
            );
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);
        setRecords(
            recordStore.filter((record) => {
                const userEmailMatch = email !== '' ? record?.Parking_Card?.User?.Email === email : true;
                const cardMatch = card !== '' ? record?.Card_ID === card : true;
                const parkingMatch = parking !== '' ? record?.Parking.Name === parking : true;

                return userEmailMatch && cardMatch && parkingMatch;
            }),
        );
        setLoading(false);
    }, [card, parking, email]);

    return (
        <>
            <div className="m-6">
                {user.Role == label.role.MANAGER && <ButtonBack />}
                <div className="ml-3 my-4 font-bold">
                    Lọc theo ID thẻ gửi xe:
                    <input
                        type="text"
                        placeholder="ID thẻ gửi xe"
                        className="input ml-4 h-10 input-bordered font-normal input-primary w-full max-w-xs"
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                    />
                </div>
                {user.Role != label.role.MANAGER && (
                    <div className="ml-3 my-4 font-bold">
                        Lọc theo tên bãi đỗ xe:
                        <input
                            type="text"
                            placeholder="Tên bãi đỗ xe"
                            className="input ml-4 h-10 input-bordered font-normal input-primary w-full max-w-xs"
                            value={parking}
                            onChange={(e) => setParking(e.target.value)}
                        />
                    </div>
                )}
                {user.Role == label.role.ADMIN && (
                    <div className="ml-3 my-4 font-bold">
                        Lọc theo Email:
                        <input
                            type="text"
                            placeholder="Địa chỉ Email"
                            className="input ml-4 h-10 input-bordered font-normal input-primary w-full max-w-xs"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                )}
            </div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="m-6 overflow-x-auto">
                        {records?.length <= 0 ? (
                            <div className="flex justify-center font-bold m-6">Bạn chưa có thông tin vào ra nào</div>
                        ) : (
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Thông tin gửi xe</th>
                                        <th>Bãi đỗ xe</th>
                                        <th>Hành động</th>
                                        <th>Phí gửi xe</th>
                                        <th>Số dư</th>
                                        <th>Thời gian ra/vào</th>
                                        {user.Role == label.role.ADMIN && <th>Email</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((record, index) => (
                                        <tr key={index}>
                                            <th>
                                                <label>{index + 1}</label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="">
                                                        <div className="w-24">
                                                            <img src={record.Image || avatar} alt="Image" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">ID thẻ gửi xe</div>
                                                        <div className="text-sm opacity-50">{record.Card_ID}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{record.Parking?.Name}</td>
                                            <td>{record.Action}</td>
                                            <td>{record.Fee * 1000 + ' VNĐ'}</td>
                                            <td>{record.Balance * 1000 + ' VNĐ'}</td>
                                            <td>{convertTime(record.createdAt)}</td>
                                            {user.Role == label.role.ADMIN && (
                                                <td>{record.Parking_Card?.User?.Email}</td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default RecordManager;
