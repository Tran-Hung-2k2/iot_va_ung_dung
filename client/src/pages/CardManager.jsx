import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FaArrowDownAZ } from 'react-icons/fa6';
import { FaArrowUpAZ } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Indicator from '../components/Indicator';
import label from '../constants/label';
import avatar from '../assets/images/avatar.jpg';
import convertTime from '../utils/convertTime';
import confirm from '../utils/confirm';
import service from '../services/card.service';

const UserManager = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [sort, setSort] = useState({ field: 'User.Role', dimension: 'asc' });
    const [count, setCount] = useState({});
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let res;
            res =
                user.Role == label.role.ADMIN
                    ? await service.getAllParkingCard()
                    : await service.getParkingCardByUser();

            const sortedCards = _.orderBy(res.data, sort.field, sort.dimension);
            const statusCounts = {};
            sortedCards.forEach((card) => {
                statusCounts[card.Is_Lock] = (statusCounts[card.Is_Lock] || 0) + 1;
            });

            setCount(statusCounts);
            setCards(sortedCards.filter((card) => card.Is_Lock === status));
            setLoading(false);
        };

        fetchData();
    }, [status, sort]);

    function deleteCard(card) {
        confirm({
            title: 'Xóa thẻ gửi xe',
            message: `Khi bạn xác nhận thẻ gửi xe sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: async () => {
                await service.deleteParkingCard(card.Card_ID);
                setCount({ ...count, [card.Is_Lock]: count[card.Is_Lock] - 1 });
                setCards(cards.filter((item) => item.Card_ID != card.Card_ID));
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
                            active={status == false}
                            subLabel={count[false] || 0}
                            onClick={() => setStatus(false)}
                        />
                        <Indicator
                            primaryColor="primary"
                            className="bg-white"
                            label="Đã khóa"
                            active={status == true}
                            subLabel={count[true] || 0}
                            onClick={() => setStatus(true)}
                        />
                    </div>
                    <div className="m-6">
                        <span className="ml-3 font-bold">Sắp xếp theo</span>
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Tên người dùng"
                            active={sort.field == 'User.Name'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'User.Name') setSort({ ...sort, field: 'User.Name' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Email"
                            active={sort.field == 'User.Email'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'User.Email') setSort({ ...sort, field: 'User.Email' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            className="bg-success"
                            className1="bg-success"
                            primaryColor="success"
                            label="Vai trò"
                            active={sort.field == 'User.Role'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'User.Role') setSort({ ...sort, field: 'User.Role' });
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
                        {cards?.length <= 0 ? (
                            <div className='flex justify-center font-bold m-6'>Bạn chưa có thẻ gửi xe nào</div>
                        ) : (
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Họ và tên</th>
                                        <th>Email</th>
                                        <th>ID thẻ gửi xe</th>
                                        <th>Ngày tạo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cards.map((card, index) => (
                                        <tr key={index}>
                                            <th>
                                                <label>{index + 1}</label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-12 h-12 mask mask-squircle">
                                                            <img src={card.User.Avatar || avatar} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{card.User.Name}</div>
                                                        <div className="text-sm opacity-50">{card.User.Role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{card.User.Email}</td>
                                            <td>{card.Card_ID}</td>
                                            <td>{convertTime(card.createdAt)}</td>
                                            <th>
                                                {status ? (
                                                    <button
                                                        onClick={async () => {
                                                            await service.updateParkingCard(
                                                                { Is_Lock: false },
                                                                card.Card_ID,
                                                            );
                                                            setStatus(false);
                                                        }}
                                                        className="mx-1 text-white btn btn-success btn-xs"
                                                    >
                                                        Mở khóa
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={async () => {
                                                            await service.updateParkingCard(
                                                                { Is_Lock: true },
                                                                card.Card_ID,
                                                            );
                                                            setStatus(true);
                                                        }}
                                                        className="mx-1 text-white btn btn-warning btn-xs"
                                                    >
                                                        Khóa
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteCard(card)}
                                                    className="mx-1 text-white btn btn-error btn-xs"
                                                >
                                                    Xóa
                                                </button>
                                            </th>
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

export default UserManager;
