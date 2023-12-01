import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import custom_validation from './custom.validation';

const validation = {
    // [POST] api/parking/
    add_parking: () => ({
        body: Joi.object({
            Parking_Name: Joi.string()
                .required()
                .messages({
                    ...messages,
                }),
            Address: Joi.string().messages({
                ...messages,
            }),
            Max_Space: Joi.number()
                .integer()
                .min(0)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .custom(custom_validation.confirmPassword)
            .messages({
                ...messages,
            }),
    }),

    // [PATCH] api/parking/:id
    update_parking: () => ({
        body: Joi.object({
            Parking_Name: Joi.string().messages({
                ...messages,
            }),
            Address: Joi.string().messages({
                ...messages,
            }),
            Max_Space: Joi.number()
                .integer()
                .min(0)
                .messages({
                    ...messages,
                }),
            Number_Of_Vehicles: Joi.number()
                .integer()
                .min(0)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .custom(custom_validation.confirmPassword)
            .messages({
                ...messages,
            }),
    }),
};

export default validation;
