import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import custom_validation from './custom.validation';

const validation = {
    // [POST] api/parking_manager/
    add_parking_manager: () => ({
        body: Joi.object({
            User_ID: Joi.string()
                .required()
                .external(custom_validation.isManager)
                .messages({
                    ...messages,
                }),
            Parking_ID: Joi.string()
                .required()
                .external(custom_validation.isParking)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [PATCH] api/parking_manager/:user_id/:parking_id
    update_parking_manager: () => ({
        body: Joi.object({
            Is_Managing: Joi.boolean()
                .required()
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
        params: Joi.object({
            user_id: Joi.string()
                .required()
                .external(custom_validation.isManager)
                .messages({
                    ...messages,
                }),
            parking_id: Joi.string()
                .required()
                .external(custom_validation.isParking)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),
};

export default validation;
