import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    return (
        <main className="flex">
            <div className="sticky top-0 left-0 h-full drawer drawer-open max-w-fit">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <Sidebar />
            </div>
            <div className="w-screen">
                <Header />
                <Outlet />
            </div>
        </main>
    );
};

export default MainLayout;
