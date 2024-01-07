import { GrUserManager } from 'react-icons/gr';
import { GoArrowSwitch } from 'react-icons/go';
import { LuParkingCircle } from 'react-icons/lu';
import { CiCreditCard1 } from 'react-icons/ci';
import { BsFillDeviceSsdFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import label from '../constants/label';
import favicon from '../assets/images/favicon.ico';

const menuItem = [
    { label: 'MENU' },
    {
        title: 'Người dùng',
        role: [label.role.ADMIN],
        child: [
            {
                path: '/user/manager',
                title: 'Quản lý người dùng',
                role: [label.role.ADMIN],
            },
            {
                path: '/user/add',
                title: 'Thêm người quản lý',
                role: [label.role.ADMIN],
            },
            {
                path: '/user/parking_manager',
                title: 'Phân công người quản lý',
                role: [label.role.ADMIN],
            },
            {
                path: '/balance/add',
                title: 'Nạp tiền cho người dùng',
                role: [label.role.ADMIN],
            },
        ],
        icon: <GrUserManager />,
    },
    {
        title: 'Thông tin ra vào',
        role: [...Object.values(label.role)],
        child: [
            {
                path: '/in-out/parking',
                title: 'Quản lý vào ra',
                role: [label.role.MANAGER],
            },
            {
                path: '/record/manager',
                title: 'Lịch sử ra vào',
                role: [label.role.USER, label.role.ADMIN],
            },
        ],
        icon: <GoArrowSwitch />,
    },
    {
        title: 'Bãi đỗ xe',
        role: [...Object.values(label.role)],
        child: [
            {
                path: '/parking/info',
                title: 'Thông tin các bãi đỗ xe',
                role: [label.role.USER, label.role.MANAGER],
            },
            {
                path: '/parking/manager',
                title: 'Quản lý bãi đỗ xe',
                role: [label.role.ADMIN],
            },
            {
                path: '/parking/add',
                title: 'Thêm bãi đỗ xe',
                role: [label.role.ADMIN],
            },
        ],
        icon: <LuParkingCircle />,
    },
    {
        title: 'Thẻ gửi xe',
        role: [label.role.ADMIN, label.role.USER],
        child: [
            {
                path: '/card/manager',
                title: 'Quản lý thẻ gửi xe',
                role: [label.role.ADMIN, label.role.USER],
            },
            {
                path: '/card/add',
                title: 'Thêm thẻ gửi xe',
                role: [label.role.ADMIN],
            },
        ],
        icon: <CiCreditCard1 />,
    },
    {
        title: 'Thiết bị',
        role: [label.role.ADMIN],
        child: [
            {
                path: '/device/manager',
                title: 'Quản lý thiết bị',
                role: [label.role.ADMIN],
            },
            {
                path: '/device/add',
                title: 'Thêm thiết bị',
                role: [label.role.ADMIN],
            },
        ],
        icon: <BsFillDeviceSsdFill />,
    },
    {
        label: 'OTHER',
    },
    {
        path: '/signin',
        title: 'Đăng xuất',
        role: [...Object.values(label.role)],
    },
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="overflow-x-hidden bg-white shadow-md drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="p-3 bg-white menu">
                {/* Sidebar content here */}
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-between gap-2 px-6 pt-5.5">
                    <NavLink to="/" className="flex items-center justify-center w-full">
                        <img className="rounded-sm border border-primary w-10 h-10 mr-4" src={favicon} alt="Parking" />
                        <p className="px-0 py-3 text-4xl font-bold text-primary">HUST</p>
                    </NavLink>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="lg:px-2">
                        {/* <!-- Menu Group --> */}
                        <ul className="w-full menu rounded-box">
                            {menuItem.map((item, index) =>
                                item.label ? (
                                    <h3
                                        key={index}
                                        className="pt-1 pb-1 mt-6 ml-4 text-base font-bold text-bodylight2 dark:text-white"
                                    >
                                        {item.label}
                                    </h3>
                                ) : item.role.includes(user.Role) ? (
                                    <li key={index}>
                                        {item.child ? (
                                            <details open>
                                                <summary className="relative text-lg gap-2.5 rounded-sm py-2 px-4 font-medium text-bodylight1 duration-300 ease-in-out dark:hover:bg-meta-4 dark:text-white">
                                                    <span className={`w-6 h-4.5`}>{item.icon}</span>
                                                    {item.title}
                                                </summary>
                                                <ul>
                                                    {item.child.map((subItem, subIndex) =>
                                                        subItem.role.includes(user.Role) ? (
                                                            <li key={subIndex}>
                                                                <NavLink
                                                                    to={subItem.path}
                                                                    className={({ isActive }) =>
                                                                        'text-base relative flex items-center gap-2.5 rounded-md font-medium duration-300 ease-in-out hover:text-bodylight dark:text-white transform hover:scale-105 ' +
                                                                        (isActive && 'link-primary')
                                                                    }
                                                                >
                                                                    {subItem.title}
                                                                </NavLink>
                                                            </li>
                                                        ) : (
                                                            <p key={subIndex}></p>
                                                        ),
                                                    )}
                                                </ul>
                                            </details>
                                        ) : (
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    (isActive && '!bg-primary !text-white') +
                                                    ' dark:hover:bg-meta-4 text-lg rounded-md  font-medium text-bodylight1 duration-300 ease-in-out dark:text-white transform hover:scale-105'
                                                }
                                            >
                                                <span className={`w-6 h-4.5`}>{item.icon}</span>
                                                {item.title}
                                            </NavLink>
                                        )}
                                    </li>
                                ) : (
                                    <p key={index}></p>
                                ),
                            )}
                        </ul>
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </ul>
        </div>
    );
};

export default Sidebar;
