import axios from './axios.service';

const service = {
    login: async (data) =>
        (
            await axios.post('/api/auth/login', data, {
                withCredentials: true,
            })
        ).data,

    register: async (data) => (await axios.post('/api/auth/register', data)).data,

    change_password: async (data) =>
        (
            await axios.post('/api/auth/change_password', data, {
                withCredentials: true,
            })
        ).data,
    verify_register: async (data) => (await axios.post('/api/auth/verify_register', data)).data,
    forget_password: async (data) => (await axios.post('/api/auth/forget_password', data)).data,
    verify_forget_password: async (data) => (await axios.post('/api/auth/verify_forget_password', data)).data,

    refresh_token: async () => (
        await axios.post('/api/auth/refresh_token'),
        {
            withCredentials: true,
        }
    ),

    logout: async () => await axios.post('/api/auth/logout'),
};

export default service;
