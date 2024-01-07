import { lazy } from 'react';

const UserManager = lazy(() => import('../pages/UserManager'));
const ManagerAdd = lazy(() => import('../pages/ManagerAdd'));
const UserParkingManager = lazy(() => import('../pages/UserParkingManager'));
const ParkingManagerAdd = lazy(() => import('../pages/ParkingManagerAdd'));
const BalanceAdd = lazy(() => import('../pages/BalanceAdd'));
const ParkingManager = lazy(() => import('../pages/ParkingManager'));
const ParkingAdd = lazy(() => import('../pages/ParkingAdd'));
const ParkingEdit = lazy(() => import('../pages/ParkingEdit'));
const DeviceManager = lazy(() => import('../pages/DeviceManager'));
const DeviceAdd = lazy(() => import('../pages/DeviceAdd'));
const DeviceEdit = lazy(() => import('../pages/DeviceEdit'));
const CardAdd = lazy(() => import('../pages/CardAdd'));


const coreRoutes = [
    {
        path: '/user/manager',
        component: UserManager,
    },
    {
        path: '/user/add',
        component: ManagerAdd,
    },
    {
        path: '/user/parking_manager',
        component: UserParkingManager,
    },
    {
        path: '/parking_manager/add',
        component: ParkingManagerAdd,
    },
    {
        path: '/balance/add',
        component: BalanceAdd,
    },
    {
        path: '/parking/manager',
        component: ParkingManager,
    },
    {
        path: '/parking/add',
        component: ParkingAdd,
    },
    {
        path: '/parking/edit',
        component: ParkingEdit,
    },
    {
        path: '/device/manager',
        component: DeviceManager,
    },
    {
        path: '/device/add',
        component: DeviceAdd,
    },
    {
        path: '/device/edit',
        component: DeviceEdit,
    },
    {
        path: '/card/add',
        component: CardAdd,
    },
];

const routes = [...coreRoutes];
export default routes;
