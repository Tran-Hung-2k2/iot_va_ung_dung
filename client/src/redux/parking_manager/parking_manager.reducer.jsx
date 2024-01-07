import type from './parking_manager.type';

const initialState = {
    Parking_ID: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_MANAGING:
            return {
                ...state,
                Parking_ID: action.payload.Parking_ID,
            };

        default:
            return state;
    }
};

export default reducer;
