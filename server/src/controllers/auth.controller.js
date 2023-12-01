import bcrypt from 'bcrypt';
import db from '../models/index.js';
import token from '../utils/token.js';
import api_response from '../utils/api_response.js';
import hash_password from '../utils/hash_password.js';
import send_email from '../utils/send_email.js';
import generate_random_password from '../utils/generate_random_password.js';
import async_wrap from '../utils/async_wrap.js';

const PORT = process.env.PORT || 8080;

const controller = {
    // [POST] /api/auth/register/
    register: async_wrap(async (req, res) => {
        const user = await db.User.create({
            ...req.body,
            User_Password: await hash_password(req.body.User_Password),
        });
        return res.status(201).json(api_response(false, 'Đăng ký thành công', user));
    }),

    // [POST] /api/auth/login/
    login: async_wrap(async (req, res) => {
        const user = await db.User.findOne({
            where: { Email: req.body.Email },
        });

        if (!user || !(await bcrypt.compare(req.body.User_Password, user.User_Password)))
            return res.status(401).json(api_response(true, 'Email hoặc mật khẩu không chính xác'));

        res.cookie('access_token', token.generate_access_token(user.User_ID), {
            httpOnly: true,
        });
        res.cookie('refresh_token', token.generate_refresh_token(user.User_ID), {
            httpOnly: true,
        });

        return res.status(200).json(api_response(false, 'Đăng nhập thành công', user));
    }),

    // [POST] /api/auth/change_password/
    change_password: async_wrap(async (req, res) => {
        const user = await db.User.findOne({
            where: { Email: req.body.Email },
        });

        if (!user || !(await bcrypt.compare(req.body.Old_Password, user.User_Password)))
            return res.status(401).json(api_response(true, 'Email hoặc mật khẩu không chính xác'));

        user.User_Password = await hash_password(req.body.User_Password);
        await user.save();

        return res.status(401).json(api_response(true, 'Đổi mật khẩu thành công'));
    }),

    // [POST] /api/auth/forget_password/
    forget_password: async_wrap(async (req, res) => {
        const reset_pass_token = token.generate_reset_password_token(req.body.Email);
        await send_email(
            req.body.Email,
            'Reset Password',
            `Click the following link to reset your password: http://127.0.0.1:${PORT}/api/auth/verify_forget_password?reset_pass_token=${reset_pass_token}`,
        );
        return res
            .status(200)
            .json(api_response(false, 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư đến của bạn.'));
    }),

    // [GET] /api/auth/verify_forget_password/
    verify_forget_password: async_wrap(async (req, res) => {
        token.verify_token(
            req.query.reset_pass_token,
            process.env.JWT_RESET_PASSWORD_KEY,
            async (err, token_decode) => {
                if (err) return res.status(403).json(api_response(true, 'Token không chính xác'));
                const user = await db.User.findOne({ where: { Email: token_decode.Email } });
                const new_password = generate_random_password(6);
                user.User_Password = await hash_password(new_password);
                await user.save();

                await send_email(
                    token_decode.Email,
                    'Đặt lại mật khẩu thành công',
                    `Mật khẩu của bạn đã được đặt lại thành công. Mật khẩu mới của bạn là ${new_password}, vui lòng không chia sẻ mật khẩu với người khác.`,
                );

                return res
                    .status(200)
                    .json(
                        api_response(
                            false,
                            'Mật khẩu đã được đặt lại thành công và được gửi về email của bạn. Vui lòng kiểm tra hộp thư đến của bạn.',
                        ),
                    );
            },
        );
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token: async_wrap(async (req, res) => {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) return res.status(401).json(api_response(true, 'Vui lòng đăng nhập để tiếp tục'));

        token.verify_token(refresh_token, process.env.JWT_REFRESH_KEY, (err, token_decode) => {
            if (err) {
                return res.status(403).json(api_response(true, 'Token đã hết hạn hoặc không chính xác'));
            }
            const access_token = token.generate_access_token(token_decode.id);
            res.cookie('access_token', access_token, {
                httpOnly: true,
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
