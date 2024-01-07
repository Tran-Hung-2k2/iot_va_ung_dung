import bcrypt from 'bcrypt';
import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import hash_password from '../utils/hash_password.js';
import async_wrap from '../utils/async_wrap.js';
import token_service from '../services/token.service.js';
import email_service from '../services/email.service.js';
import label from '../constants/label.js';
import APIError from '../utils/api_error.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

const controller = {
    // [POST] /api/auth/register/
    register: async_wrap(async (req, res) => {
        const register_token = token_service.generate_register_token(req.body);

        await email_service.send_email(
            req.body.Email,
            'Xác nhận đăng ký tài khoản',
            `Nhấn vào link này để tiếp tục đăng ký: ${BASE_URL}/verify_signup?register_token=${register_token}`,
        );

        return res
            .status(200)
            .json(
                api_response(
                    false,
                    'Email xác nhận đăng ký đã được gửi tới bạn. Vui lòng kiểm tra hộp thư đến hoặc thư rác để xác nhận đăng ký.',
                ),
            );
    }),

    // [POST] /api/auth/verify_register/
    verify_register: async_wrap(async (req, res) => {
        token_service.verify_token(req.body.register_token, process.env.JWT_REGISTER_KEY, async (err, token_decode) => {
            if (err) throw new APIError(403, 'Thông tin xác thực không chính xác');

            try {
                const user = await db.User.create({
                    ...token_decode,
                    Password: await hash_password(token_decode.Password),
                });
                return res.status(201).json(api_response(false, 'Đăng ký thành công'));
            } catch (error) {}
        });
    }),

    // [POST] /api/auth/login/
    login: async_wrap(async (req, res) => {
        const user = await db.User.findOne({
            where: { Email: req.body.Email },
        });

        if (!user || !(await bcrypt.compare(req.body.Password, user.Password)))
            throw new APIError(400, 'Tài khoản hoặc mật khẩu không chính xác');

        if (user.Status == label.user.LOCK)
            throw new APIError(400, 'Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau.');

        res.cookie('access_token', token_service.generate_access_token(user.User_ID), {
            httpOnly: true,
            secure: true, // Chỉ gửi cookie qua HTTPS
            sameSite: 'None', // Cho phép gửi từ mọi nguồn
        });

        res.cookie('refresh_token', token_service.generate_refresh_token(user.User_ID), {
            httpOnly: true,
            secure: true, // Chỉ gửi cookie qua HTTPS
            sameSite: 'None', // Cho phép gửi từ mọi nguồn
        });

        return res.status(200).json(api_response(false, 'Đăng nhập thành công', user));
    }),

    // [POST] /api/auth/change_password/
    change_password: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.token.id);

        if (!user || !(await bcrypt.compare(req.body.Old_Password, user.Password)))
            throw new APIError(400, 'Mật khẩu không chính xác');

        user.Password = await hash_password(req.body.Password);
        await user.save();

        return res.status(200).json(api_response(false, 'Đổi mật khẩu thành công'));
    }),

    // [POST] /api/auth/forget_password/
    forget_password: async_wrap(async (req, res) => {
        const reset_pass_token = token_service.generate_reset_password_token(req.body.Email);
        await email_service.send_email(
            req.body.Email,
            'Thiết lập lại mật khẩu',
            `Click vào link sau để đặt lại mật khẩu cho tài khoản của bạn: ${BASE_URL}/verify_forget_password?reset_pass_token=${reset_pass_token}`,
        );
        return res
            .status(200)
            .json(api_response(false, 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư đến của bạn.'));
    }),

    // [POST] /api/auth/verify_forget_password/
    verify_forget_password: async_wrap(async (req, res) => {
        token_service.verify_token(
            req.body.reset_pass_token,
            process.env.JWT_RESET_PASSWORD_KEY,
            async (err, token_decode) => {
                if (err) return res.status(403).json(api_response(true, 'Token không chính xác'));
                const user = await db.User.findOne({ where: { Email: token_decode.Email } });
                user.Password = await hash_password(req.body.Password);
                await user.save();

                return res.status(200).json(api_response(false, 'Mật khẩu đã được đặt lại thành công.'));
            },
        );
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token: async_wrap(async (req, res) => {
        const refresh_token = req.cookies.refresh_token;

        if (!refresh_token) throw new APIError(401, 'Vui lòng đăng nhập để tiếp tục');

        token_service.verify_token(refresh_token, process.env.JWT_REFRESH_KEY, (err, token_decode) => {
            if (err) return res.status(403).json(api_response(true, 'Token đã hết hạn hoặc không chính xác'));
            const access_token = token_service.generate_access_token(token_decode.id);
            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: true, // Chỉ gửi cookie qua HTTPS
                sameSite: 'None', // Cho phép gửi từ mọi nguồn
            });
            return res.status(200).json(api_response(false, 'Làm mới access token thành công'));
        });
    }),

    // [POST] /api/auth/logout/
    logout: async_wrap(async (req, res) => {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(200).json(api_response(false, 'Đăng xuất thành công'));
    }),
};

export default controller;
