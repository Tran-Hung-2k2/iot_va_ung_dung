import type from './inout.type';

const action = {
    setAction: (id, action) => {
        return {
            type: type.SET_ACTION,
            payload: { id, action },
        };
    },

    setDevice: (id, device) => {
        return {
            type: type.SET_DEVICE,
            payload: { id, device },
        };
    },

    setCameraIP: (id, cameraIP) => {
        return {
            type: type.SET_CAMERA_IP,
            payload: { id, cameraIP },
        };
    },
};

export default action;
