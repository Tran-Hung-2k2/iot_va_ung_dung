import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [GET] /api/parking_card/
    get_parking_card_info: () => ({
        query: Joi.object({
            Card_ID: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/parking_card/
    add_parking_card: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/parking_card/:id
    update_parking_card: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),

        body: Joi.object({
            Is_Lock: Joi.boolean().required().label('Trạng thái thẻ'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/parking_card/:id
    delete_parking_card: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
