import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/parking_manager/manager
    get_parking_manager_by_manager: () => ({
        query: Joi.object({
            Parking_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] api/parking_manager/
    add_parking_manager: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            Parking_ID: Joi.string().required().custom(cv.uuidv4Id).external(cv.isParking),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] api/parking_manager/:id
    update_parking_manager: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id).external(cv.isParking),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            User_ID: Joi.string().custom(cv.uuidv4Id),
            Is_Managing: Joi.boolean().required(),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/parking_manager/:user_id/:parking_id
    delete_parking_manager: () => ({
        params: Joi.object({
            user_id: Joi.string().required().custom(cv.uuidv4Id),
            parking_id: Joi.string().required().custom(cv.uuidv4Id).external(cv.isParking),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
