import type from './parking_manager.type';
import service from '../../services/parking_manger.service';

const action = {
    setManaging: (Parking_ID, Is_Managing, cb_success) => async (dispatch) => {
        await service.updateParkingManager(
            {
                Is_Managing,
            },
            Parking_ID,
        );

        dispatch({
            type: type.SET_MANAGING,
            payload: { Parking_ID },
        });

        if (cb_success) cb_success();
    },
};

export default action;
