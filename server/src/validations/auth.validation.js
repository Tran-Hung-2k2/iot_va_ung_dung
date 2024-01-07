import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [POST] /api/auth/register/
    register: () => ({
        body: Joi.object({
            Name: Joi.string().trim().required().label('Tên người dùng'),
            Email: Joi.string().email().required().external(cv.isNotRegistered),
            Password: Joi.string().required().label('Mật khẩu'),
            Confirm_Password: Joi.string().required().label('Mật khẩu xác nhận'),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/verify_register/
    verify_register: () => ({
        body: Joi.object({
            register_token: Joi.string().required().label('Token xác thực'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/login/
    login: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            Password: Joi.string().required().label('Mật khẩu'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/change_password/
    change_password: () => ({
        body: Joi.object({
            Old_Password: Joi.string().required().label('Mật khẩu'),
            Password: Joi.string().required().label('Mật khẩu mới'),
            Confirm_Password: Joi.string().required().label('Mật khẩu xác nhận'),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/forget_password/
    forget_password: () => ({
        body: Joi.object({
            Email: Joi.string().email().required().external(cv.isRegistered),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/verify_forget_password/
    verify_forget_password: () => ({
        body: Joi.object({
            reset_pass_token: Joi.string().required().label('Token xác thực'),
            Password: Joi.string().required().label('Mật khẩu mới'),
            Confirm_Password: Joi.string().required().label('Mật khẩu xác nhận'),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token: () => ({
        cookies: Joi.object({
            refresh_token: Joi.string().required(),
        })
            .unknown(true)
            .prefs({ messages }),
    }),
};

export default validation;
