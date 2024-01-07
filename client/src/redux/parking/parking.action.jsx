import type from './parking.type';

const action = {
    addParking: (id) => {
        return {
            type: type.ADD_PARKING,
            payload: id,
        };
    },
};

export default action;
