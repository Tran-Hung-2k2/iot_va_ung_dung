import { useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const UserOne = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEC-AcpMSEBeqwQdUVhjb5fciR-GG2-cuwQ&usqp=CAU';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // Mở dropdown khi hover và đóng sau 2 giây khi bỏ hover
    useEffect(() => {
        let timeoutId;

        const handleMouseEnter = () => {
            setDropdownOpen(true);
        };

        const handleMouseLeave = () => {
            timeoutId = setTimeout(() => {
                setDropdownOpen(false);
            }, 300);
        };

        trigger.current.addEventListener('mouseenter', handleMouseEnter);
        dropdown.current.addEventListener('mouseenter', handleMouseEnter);
        dropdown.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            trigger.current.addEventListener('mouseenter', handleMouseEnter);
            dropdown.current.addEventListener('mouseenter', handleMouseEnter);
            dropdown.current.addEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="relative">
            <Link ref={trigger} className="flex items-center gap-2" to="#">
                <span className="hidden text-right lg:block">
                    <span className="block text-md font-medium text-black dark:text-white">Trần Việt Hùng</span>
                    <span className="block text-xs">Admin</span>
                </span>

                <span className="h-12 w-12 rounded-full">
                    <img src={UserOne} alt="User" />
                </span>

                <RiArrowDropDownLine className={`text-2xl ${dropdownOpen ? 'rotate-180' : ''}`} />
            </Link>

            <div
                ref={dropdown}
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                    dropdownOpen === true ? 'block' : 'hidden'
                }`}
            >
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    <li>
                        <Link
                            to="/profile"
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        >
                            <FaRegUser className="h-5 w-6" />
                            Thông tin tài khoản
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        >
                            <IoSettingsOutline className="h-6 w-6" />
                            Cài đặt
                        </Link>
                    </li>
                </ul>
                <button className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                    <CiLogout className="h-8 w-6" />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default DropdownUser;
