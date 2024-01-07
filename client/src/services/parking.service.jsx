import axios from './axios.service';

const service = {
    getAllParking: async (params) => {
        const queryParams = ['Parking_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/parking', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    addParking: async (data) => (await axios.post('/api/parking', data, { withCredentials: true })).data,

    updateParking: async (data, id) => {
        const response = await axios.patch(`/api/parking/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateNumberOfVehicles: async (data, id) => {
        const response = await axios.patch(`/api/parking/num_of_vehicles/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteParking: async (id) => {
        const response = await axios.delete(`/api/parking/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
