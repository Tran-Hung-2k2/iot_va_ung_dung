import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [GET] api/parking_record/lastest
    get_lastest_record: () => ({
        query: Joi.object({
            Parking_ID: Joi.string().required().custom(cv.uuidv4Id),
            Card_ID: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] api/parking_record/
    add_parking_record: () => ({
        body: Joi.object({
            Card_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID người gửi xe'),
            Parking_ID: Joi.string().required().custom(cv.uuidv4Id).label('ID bãi đỗ xe'),
            Action: Joi.string()
                .valid(...Object.values(label.action))
                .required()
                .label('Hành động'),
            Image: Joi.string().label('Ảnh biển số xe'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
