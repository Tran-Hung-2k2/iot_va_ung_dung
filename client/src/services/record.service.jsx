import axios from './axios.service';

const service = {
    getAllRecord: async (params) => {
        const queryParams = ['Parking_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/parking_record', { withCredentials: true, params: paramsObject });
        return response.data;
    },

    getLastestRecord: async (params) => {
        const queryParams = ['Parking_ID', 'Card_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/parking_record/lastest', {
            withCredentials: true,
            params: paramsObject,
        });
        return response.data;
    },

    addRecord: async (data) => {
        const response = await axios.post('/api/parking_record', data, { withCredentials: true });
        return response.data;
    },
};

export default service;
