import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import custom_validation from './custom.validation';

const validation = {
    // [GET] /api/parking_card/user/:id
    get_parking_card_by_user: () => ({
        params: Joi.object({
            id: Joi.string()
                .required()
                .external(custom_validation.isUser)
                .messages({
                    ...messages,
                }),
        })
            .unknown(false)
            .messages({
                ...messages,
            }),
    }),

    // [POST] api/parking_card/
    add_parking_card: () => ({
        body: Joi.object({
            Email: Joi.string()
                .email()
                .required()
                .messages({
                    ...messages,
                }),
        }),
    }),

    // [PATCH] api/parking_card/:id
    update_parking_card: () => ({
        body: Joi.object({
            Is_Lock: Joi.boolean()
                .required()
                .messages({
                    ...messages,
                }),
        }),
    }),
};

export default validation;
