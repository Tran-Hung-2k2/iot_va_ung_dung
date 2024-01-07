import type from './device.type';

const action = {
    addDevice: (id) => {
        return {
            type: type.ADD_DEVICE,
            payload: id,
        };
    },
};

export default action;
