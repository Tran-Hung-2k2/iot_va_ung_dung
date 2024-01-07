import axios from './axios.service';

const service = {
    getUser: async (params) => {
        const queryParams = ['User_ID', 'Email', 'Name', 'Role', 'Status'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/user', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    getUserDetail: async () => {
        const response = await axios.get('/api/user/detail', { withCredentials: true });

        return response.data;
    },

    addManager: async (data) => (await axios.post('/api/user/add', data, { withCredentials: true })).data,

    updateUser: async (data, id) => {
        const response = await axios.patch(`/api/user/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    addBalance: async (data) => {
        const response = await axios.patch(`/api/user/balance`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateUserDetail: async (data) => {
        const response = await axios.patch(`/api/user/detail`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteUser: async (id) => {
        const response = await axios.delete(`/api/user/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
