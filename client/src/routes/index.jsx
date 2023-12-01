import { lazy } from 'react';

const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
    {
        path: '/profile',
        title: 'Profile',
        component: Profile,
    },
    {
        path: '/forms/form-elements',
        title: 'Forms Elements',
        component: FormElements,
    },
    {
        path: '/forms/form-layout',
        title: 'Form Layouts',
        component: FormLayout,
    },
    {
        path: '/tables',
        title: 'Tables',
        component: Tables,
    },
    {
        path: '/settings',
        title: 'Settings',
        component: Settings,
    },
    {
        path: '/ui/alerts',
        title: 'Alerts',
        component: Alerts,
    },
    {
        path: '/ui/buttons',
        title: 'Buttons',
        component: Buttons,
    },
];

const routes = [...coreRoutes];
export default routes;
