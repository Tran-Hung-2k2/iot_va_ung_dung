import axios from './axios.service';

const service = {
    getAllDevice: async (params) => {
        const queryParams = ['Device_ID', 'Parking_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/device', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    addDevice: async (data) => (await axios.post('/api/device', data, { withCredentials: true })).data,

    updateDevice: async (data, id) => {
        const response = await axios.patch(`/api/device/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteDevice: async (id) => {
        const response = await axios.delete(`/api/device/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
