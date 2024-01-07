import { lazy } from 'react';

const InOutParking = lazy(() => import('../pages/InOutParking'));
const InOutManager = lazy(() => import('../pages/InOutManager'));

const coreRoutes = [
    {
        path: '/in-out/parking',
        component: InOutParking,
    },
    {
        path: '/in-out/manager/:Parking_ID',
        component: InOutManager,
    },
    {
        path: '/in-out/manager',
        component: InOutManager,
    },
];

const routes = [...coreRoutes];
export default routes;
