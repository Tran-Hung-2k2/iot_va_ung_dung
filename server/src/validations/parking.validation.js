import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/parking/
    get_all_parking: () => ({
        query: Joi.object({
            Parking_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/parking/
    add_parking: () => ({
        body: Joi.object({
            Name: Joi.string().required(),
            Address: Joi.string(),
            Charge: Joi.number().integer().min(0),
            Max_Space: Joi.number().integer().min(0),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/parking/:id
    update_parking: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            Name: Joi.string().label('Tên bãi đỗ xe'),
            Address: Joi.string().label('Địa chỉ'),
            Max_Space: Joi.number().integer().min(0).label('Chỗ trống tối đa'),
            Charge: Joi.number().integer().min(0),
            Number_Of_Vehicles: Joi.number().integer().min(0).label('Số lượng xe trong bãi'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/parking/num_of_vehicles/:id
    update_number_of_vehicles: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            Number_Of_Vehicles: Joi.number().integer().label('Số lượng xe muốn cập nhật'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/parking/:id
    delete_parking: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
