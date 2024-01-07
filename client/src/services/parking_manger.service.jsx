import axios from './axios.service';

const service = {
    getAllParkingManager: async () => (await axios.get('/api/parking_manager', { withCredentials: true })).data,

    getParkingManagerByManager: async (params) => {
        const queryParams = ['Parking_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/parking_manager/manager', {
            withCredentials: true,
            params: paramsObject,
        });

        return response.data;
    },

    addParkingManager: async (data) => (await axios.post('/api/parking_manager', data, { withCredentials: true })).data,

    updateParkingManager: async (data, id) => {
        const response = await axios.patch(`/api/parking_manager/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteParkingManager: async (user_id, parking_id) => {
        const response = await axios.delete(`/api/parking_manager/${user_id}/${parking_id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
