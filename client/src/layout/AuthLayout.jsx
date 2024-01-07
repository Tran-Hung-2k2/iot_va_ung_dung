import { NavLink, Outlet } from 'react-router-dom';
import image from '../assets/images/signin.png';

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <NavLink to="/" className="w-3/5">
                <div className="w-full p-32">
                    <img className=" rounded-lg border border-primary" src={image} alt="Bách khoa Hà Nội" />
                </div>
            </NavLink>
            <Outlet />
        </div>
    );
}
