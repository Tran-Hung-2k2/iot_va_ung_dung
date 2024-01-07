import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import { PiPassword } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';

import action from '../redux/auth/auth.action';
import avatar from '../assets/images/avatar.jpg';
import { NavLink, useParams } from 'react-router-dom';

const MainHeader = ({ className }) => {
    const { user } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.category);
    const { id } = useParams();
    const dispatch = useDispatch();

    return (
        <header className={`sticky top-0 z-20 px-20 bg-white border-2 ${className}`}>
            <div className="flex justify-between navbar bg-base-100">
                <NavLink to="/" className="flex items-center">
                    <p className="px-0 py-3 text-4xl font-bold text-primary">coursera</p>
                </NavLink>
                <form
                    action="/course"
                    method="GET"
                    className="justify-center flex-1 hidden rounded-full just join md:flex"
                >
                    <div className="flex w-2/5">
                        <input
                            name="Name"
                            className="flex-1 input input-bordered join-item"
                            placeholder="Nhập để tìm kiếm khóa học"
                        />
                    </div>
                    <div className="">
                        <select name="Category_ID" className="w-32 select select-bordered join-item bg-cyan-50">
                            <option value="">Tất cả</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.Category_ID}>
                                    {category.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="h-full indicator">
                        <span className="font-bold shadow-lg bg-slate-100 indicator-item badge badge-secondary">
                            mới
                        </span>
                        <button type="submit" className="btn btn-primary join-item">
                            Tìm kiếm
                        </button>
                    </div>
                </form>

                <div className="flex-none">
                    {user ? (
                        <div className="w-full dropdown dropdown-end">
                            <span className="inline-block -translate-y-1">
                                <p className="mr-2 text-base font-bold text-primary">{user.Name}</p>
                                <p className="mr-2 text-sm">{user.Role}</p>
                            </span>
                            <div tabIndex={0} role="button" className="inline-block btn btn-ghost btn-circle avatar">
                                <div className="w-12 h-12 border-2 rounded-full shadow border-primary">
                                    <img alt="Avatar" src={user.Avatar || avatar} />
                                </div>
                            </div>

                            <ul className="mt-3 z-[1] p-2 drop-shadow-2xl menu menu-md dropdown-content bg-base-100 rounded-box w-60">
                                <li>
                                    <a href="/profile" className="text-lg hover:text-lime-700">
                                        <CgProfile className="w-5 h-5" /> Thông tin tài khoản
                                    </a>
                                </li>
                                <li>
                                    <a href="/change_password" className="text-lg hover:text-lime-700">
                                        <PiPassword className="w-5 h-5" /> Đổi mật khẩu
                                    </a>
                                </li>
                                <li>
                                    <a href="/setting" className="text-lg hover:text-lime-700">
                                        <IoSettingsOutline className="w-5 h-5" /> Cài đặt
                                    </a>
                                </li>
                                <li
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(action.logout());
                                    }}
                                >
                                    <a href="#" className="text-lg border-t-2 hover:text-lime-700">
                                        <HiOutlineLogout className="w-5 h-5" /> Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to="/signin"
                                className="px-4 py-2 bg-white border-none text-primary hover:underline"
                            >
                                Đăng nhập
                            </NavLink>
                            <NavLink to="/signup" className="font-bold text-white btn btn-primary">
                                Đăng ký
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
            {!id ? (
                <nav>
                    <ul className="flex gap-4 list-none">
                        <NavLink
                            className={({ isActive }) => 'px-4 py-2 ' + (isActive && 'border-b-4 border-primary')}
                            to="/"
                        >
                            Trang chủ
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => 'px-4 py-2 ' + (isActive && 'border-b-4 border-primary')}
                            to="/course"
                        >
                            Khóa học
                        </NavLink>
                        {user && (
                            <NavLink
                                className={({ isActive }) => 'px-4 py-2 ' + (isActive && 'border-b-4 border-primary')}
                                to="/my_course"
                            >
                                Khóa học của tôi
                            </NavLink>
                        )}
                    </ul>
                </nav>
            ) : (
                ''
            )}
        </header>
    );
};

export default MainHeader;
