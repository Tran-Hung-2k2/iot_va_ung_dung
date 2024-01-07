import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FaArrowDownAZ } from 'react-icons/fa6';
import { FaArrowUpAZ } from 'react-icons/fa6';

import Loader from '../components/Loader';
import service from '../services/user.service';
import label from '../constants/label';
import Indicator from '../components/Indicator';
import avatar from '../assets/images/avatar.jpg';
import confirm from '../utils/confirm';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(label.user.ACTIVE);
    const [sort, setSort] = useState({ field: 'Role', dimension: 'asc' });
    const [count, setCount] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getUser({});
            const sortedUsers = _.orderBy(res.data, sort.field, sort.dimension);

            const statusCounts = {};
            sortedUsers.forEach((user) => {
                statusCounts[user.Status] = (statusCounts[user.Status] || 0) + 1;
            });

            setCount(statusCounts);
            setUsers(sortedUsers.filter((user) => user.Status === status));
            setLoading(false);
        };

        fetchData();
    }, [status, sort]);

    function deleteUser(user) {
        confirm({
            title: 'Xóa người dùng',
            message: `Khi bạn xác nhận Người dùng "${user.Name}" với Email là "${user.Email}"  sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: async () => {
                await service.deleteUser(user.User_ID);
                setCount({ ...count, [user.Status]: count[user.Status] - 1 });
                setUsers(users.filter((item) => item.User_ID != user.User_ID));
            },
        });
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="m-6">
                        <Indicator
                            primaryColor="primary"
                            className="bg-white"
                            label="Bình thường"
                            active={status == label.user.ACTIVE}
                            subLabel={count[label.user.ACTIVE] || 0}
                            onClick={() => setStatus(label.user.ACTIVE)}
                        />
                        <Indicator
                            primaryColor="primary"
                            className="bg-white"
                            label="Đã khóa"
                            active={status == label.user.LOCK}
                            subLabel={count[label.user.LOCK] || 0}
                            onClick={() => setStatus(label.user.LOCK)}
                        />
                    </div>
                    <div className="m-6">
                        <span className="ml-3 font-bold">Sắp xếp theo</span>
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Tên người dùng"
                            active={sort.field == 'Name'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'Name') setSort({ ...sort, field: 'Name' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Email"
                            active={sort.field == 'Email'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'Email') setSort({ ...sort, field: 'Email' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Vai trò"
                            active={sort.field == 'Role'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'Role') setSort({ ...sort, field: 'Role' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Ngày cập nhật"
                            active={sort.field == 'updatedAt'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'updatedAt') setSort({ ...sort, field: 'updatedAt' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                    </div>

                    <div className="m-6 overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số dư</th>
                                    <th>Vai trò</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <th>
                                            <label>{index + 1}</label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 mask mask-squircle">
                                                        <img src={user.Avatar || avatar} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.Name}</div>
                                                    <div className="text-sm opacity-50">{user.User_ID}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.Email}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">
                                                {user.Phone_Number || 'Chưa cung cấp số điện thoại'}
                                            </span>
                                        </td>
                                        <td>{user.Balance * 1000 + ' VNĐ'}</td>
                                        <td>{user.Role}</td>
                                        <th>
                                            {status == label.user.ACTIVE && user.Role != label.role.ADMIN && (
                                                <button
                                                    onClick={async () => {
                                                        await service.updateUser(
                                                            { Status: label.user.LOCK },
                                                            user.User_ID,
                                                        );
                                                        setStatus(label.user.LOCK);
                                                    }}
                                                    className="mx-1 text-white btn btn-warning btn-xs"
                                                >
                                                    Khóa
                                                </button>
                                            )}
                                            {status == label.user.ACTIVE && user.Role != label.role.ADMIN && (
                                                <button
                                                    onClick={() => deleteUser(user)}
                                                    className="mx-1 text-white btn btn-error btn-xs"
                                                >
                                                    Xóa
                                                </button>
                                            )}
                                            {status == label.user.LOCK && (
                                                <button
                                                    onClick={async () => {
                                                        await service.updateUser(
                                                            { Status: label.user.ACTIVE },
                                                            user.User_ID,
                                                        );
                                                        setStatus(label.user.ACTIVE);
                                                    }}
                                                    className="mx-1 text-white btn btn-success btn-xs"
                                                >
                                                    Mở khóa
                                                </button>
                                            )}
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default UserManager;
