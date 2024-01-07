import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/device/
    get_all_device: () => ({
        query: Joi.object({
            Device_ID: Joi.string().custom(cv.uuidv4Id),
            Parking_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/device/
    add_device: () => ({
        body: Joi.object({
            Parking_ID: Joi.string().allow(null).required().custom(cv.uuidv4Id),
            Name: Joi.string().label('Tên thiết bị'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/device/:id
    update_device: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            Name: Joi.string().label('Tên thiết bị'),
            Parking_ID: Joi.string().custom(cv.uuidv4Id).allow(null),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/device/:id
    delete_device: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
