import axios from 'axios';
import store from '../redux/store';
import type from '../redux/auth/auth.type';
import notify from '../utils/notify';
const SERVER_URL = import.meta.env.VITE_REACT_APP_API_KEY;

const api_notify = [
    { url: '/api/auth', methods: ['post'] },
    { url: '/api/user', methods: ['post', 'patch', 'delete'] },
    { url: '/api/parking', methods: ['post', 'patch', 'delete'] },
    { url: '/api/device', methods: ['post', 'patch', 'delete'] },
    { url: '/api/parking_card', methods: ['post', 'patch', 'delete'] },
    { url: '/api/parking_record', methods: ['post', 'patch', 'delete'] },
    { url: '/api/parking_manger', methods: ['post', 'patch', 'delete'] },
];

const service = axios.create({
    baseURL: SERVER_URL || 'https://coursera-6wby.onrender.com',
});

service.interceptors.response.use(
    (response) => {
        const config = response.config;
        const isMatched = api_notify.some((entry) => {
            return config.url.startsWith(entry.url) && entry.methods.includes(config.method);
        });

        if (isMatched) {
            notify(response.data.message, 'success');
        }

        return response;
    },
    (error) => {
        if (error.code == 'ERR_NETWORK') notify('Không thể kết nối tới máy chủ. Vui lòng thử lại sau', 'error');
        else
            switch (error?.response?.status) {
                case 401:
                    notify(error.response.data.message, 'error');
                    store.dispatch({ type: type.LOGOUT });
                    break;
                default:
                    if (error.response?.data?.errors) {
                        error.response.data.errors.forEach((errorItem) => {
                            notify(errorItem.message, 'error');
                        });
                    } else if (error.response?.data?.message) notify(error.response.data.message, 'error');
                    else console.log(error);
            }

        return Promise.reject(error);
    },
);

export default service;
