import type from './inout.type';

const initialState = {
    action: ['', ''],
    currDevice: ['', ''],
    cameraIP: ['', ''],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_ACTION:
            const newAction = [...state.action];
            newAction[action.payload.id] = action.payload.action;

            if (state.currDevice[0] == state.currDevice[1] && state.currDevice[0] != '') {
                if (action.payload.id == 0) newAction[1] = newAction[0];
                else newAction[0] = newAction[1];
            }

            return {
                ...state,
                action: newAction,
            };

        case type.SET_DEVICE:
            const newDevice = [...state.currDevice];
            newDevice[action.payload.id] = action.payload.device;
            if (newDevice[0] == newDevice[1] && newDevice[0] != '') {
                const newAction = [...state.action];
                if (action.payload.id == 0) newAction[0] = newAction[1];
                else newAction[1] = newAction[0];
                return {
                    ...state,
                    currDevice: newDevice,
                    action: newAction,
                };
            } else
                return {
                    ...state,
                    currDevice: newDevice,
                };

        case type.SET_CAMERA_IP:
            const newCameraIP = [...state.cameraIP];
            newCameraIP[action.payload.id] = action.payload.cameraIP;
            return {
                ...state,
                cameraIP: newCameraIP,
            };

        default:
            return state;
    }
};

export default reducer;
