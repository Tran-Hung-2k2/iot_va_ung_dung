import type from './device.type';

const initialState = {
    Device_ID: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_DEVICE:
            return {
                ...state,
                Device_ID: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
