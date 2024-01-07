import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowUpShortWide } from 'react-icons/fa6';
import { FaArrowUpWideShort } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import Loader from '../components/Loader';
import service from '../services/parking_manger.service';
import avatar from '../assets/images/avatar.jpg';
import confirm from '../utils/confirm';
import action from '../redux/parking/parking.action';

function UserParkingManager() {
    const [parkings, setParkings] = useState([]);
    const [sort, setSort] = useState({ field: 'updatedAt', dimension: 'desc' });
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getAllParkingManager();
            const sortedParkings = _.orderBy(res.data, ['createdAt', 'Name'], 'desc');
            setParkings(sortedParkings);
            setLoading(false);
        };

        fetchData();
    }, []);

    const removeParkingManager = (userId, parkingId) => {
        setParkings((prevParkings) => {
            return prevParkings.map((parking) => {
                if (parking.Parking_ID !== parkingId) {
                    return parking;
                }

                return {
                    ...parking,
                    Parking_Managers: parking.Parking_Managers.filter((parkingManager) => {
                        return parkingManager.User_ID !== userId;
                    }),
                };
            });
        });
    };

    function deleteParkingManager(parkingManager) {
        confirm({
            title: 'Xóa quyền quản lý bãi đỗ xe',
            message: `Khi bạn xác nhận quyền quản lý bãi đỗ xe của ${parkingManager.User.Name} sẽ bị xóa và không thể tiếp tục quản lý bãi đỗ xe này. Bạn vẫn muốn xóa?`,
            onConfirm: async () => {
                await service.deleteParkingManager(parkingManager.User_ID, parkingManager.Parking_ID);
                removeParkingManager(parkingManager.User_ID, parkingManager.Parking_ID);
            },
        });
    }

    const updateParkingManagerStatus = (userId, parkingId, newStatus) => {
        setParkings((prevParkings) => {
            return prevParkings.map((parking) => {
                if (parking.Parking_ID !== parkingId) {
                    return parking;
                }

                return {
                    ...parking,
                    Parking_Managers: parking.Parking_Managers.map((parkingManager) => {
                        if (parkingManager.User_ID !== userId) {
                            return parkingManager;
                        }

                        return {
                            ...parkingManager,
                            Is_Managing: newStatus,
                        };
                    }),
                };
            });
        });
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="m-6">
                    <h2 className='text-primary font-bold text-2xl mb-4'>Phân công người quản lý</h2>
                    {parkings.map((parking, index) => (
                        <div
                            key={parking.Parking_ID}
                            className="mt-2 border border-black rounded-md collapse collapse-arrow"
                        >
                            <input type="checkbox" />
                            <div className="flex items-center justify-between text-xl font-medium border-b collapse-title hover:bg-sky-50">
                                <div>
                                    Bãi đỗ xe {index + 1}: {parking.Name}
                                </div>
                                {parking.Parking_Managers.length > 0 && (
                                    <div className="ml-6 text-white badge badge-info badge-lg">
                                        {parking.Parking_Managers.length}
                                    </div>
                                )}
                            </div>
                            <div className="collapse-content">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Họ và tên</th>
                                            <th
                                                onClick={() => {
                                                    if (sort.field != 'User.Email')
                                                        setSort({ ...sort, field: 'User.Email' });
                                                    else
                                                        setSort({
                                                            ...sort,
                                                            dimension: sort.dimension == 'asc' ? 'desc' : 'asc',
                                                        });
                                                }}
                                            >
                                                <button>
                                                    Email
                                                    {sort.dimension == 'asc' ? (
                                                        <FaArrowUpWideShort className="inline-block w-4 h-4 ml-2" />
                                                    ) : (
                                                        <FaArrowUpShortWide className="inline-block w-4 h-4 ml-2" />
                                                    )}
                                                </button>
                                            </th>
                                            <th
                                                onClick={() => {
                                                    if (sort.field != 'Is_Managing')
                                                        setSort({ ...sort, field: 'Is_Managing' });
                                                    else
                                                        setSort({
                                                            ...sort,
                                                            dimension: sort.dimension == 'asc' ? 'desc' : 'asc',
                                                        });
                                                }}
                                            >
                                                <button>
                                                    Trạng thái quản lý
                                                    {sort.dimension == 'asc' ? (
                                                        <FaArrowUpWideShort className="inline-block w-4 h-4 ml-2" />
                                                    ) : (
                                                        <FaArrowUpShortWide className="inline-block w-4 h-4 ml-2" />
                                                    )}
                                                </button>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {_.orderBy(parking.Parking_Managers, sort.field, sort.dimension).map(
                                            (parkingManager, index) => (
                                                <tr key={index}>
                                                    <th>
                                                        <label>{index + 1}</label>
                                                    </th>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="w-12 h-12 mask mask-squircle">
                                                                    <img
                                                                        src={parkingManager.User.Avatar || avatar}
                                                                        alt="Avatar"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">
                                                                    {parkingManager.User.Name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{parkingManager.User.Email}</td>
                                                    <td>
                                                        {parkingManager.Is_Managing ? (
                                                            <FaCheck className="text-success w-6 h-6 ml-8" />
                                                        ) : (
                                                            <IoClose className="text-error w-6 h-6 ml-8" />
                                                        )}
                                                    </td>
                                                    <th>
                                                        {parkingManager.Is_Managing && (
                                                            <button
                                                                onClick={async () => {
                                                                    await service.updateParkingManager(
                                                                        {
                                                                            Is_Managing: false,
                                                                            User_ID: parkingManager.User_ID,
                                                                        },
                                                                        parkingManager.Parking_ID,
                                                                    );
                                                                    updateParkingManagerStatus(
                                                                        parkingManager.User_ID,
                                                                        parkingManager.Parking_ID,
                                                                        false,
                                                                    );
                                                                }}
                                                                className="px-2 mr-2 text-white btn btn-warning btn-xs"
                                                            >
                                                                Dừng
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                deleteParkingManager(parkingManager);
                                                            }}
                                                            className="px-2 text-white btn btn-error btn-xs"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </th>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                                <Link
                                    to="/parking_manager/add"
                                    onClick={() => {
                                        dispatch(action.addParking(parking.Parking_ID));
                                    }}
                                    className="w-full mt-4 btn btn-outline btn-primary"
                                >
                                    Thêm phân công quản lý
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default UserParkingManager;
