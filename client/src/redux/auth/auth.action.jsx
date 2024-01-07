import type from './auth.type';
import service from '../../services/auth.service';

const action = {
    login: (data, callback) => async (dispatch) => {
        const response = await service.login(data);
        dispatch({
            type: type.LOGIN,
            payload: response.data,
        });
        if (callback) callback();
    },

    updateUser: (data) => {
        return {
            type: type.UPDATE_USER,
            payload: data,
        };
    },

    logout: () => async (dispatch) => {
        await service.logout();

        dispatch({
            type: type.LOGOUT,
        });
    },
};

export default action;
