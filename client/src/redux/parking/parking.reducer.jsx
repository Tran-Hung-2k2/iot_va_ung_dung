import type from './parking.type';

const initialState = {
    Parking_ID: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_PARKING:
            return {
                ...state,
                Parking_ID: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
