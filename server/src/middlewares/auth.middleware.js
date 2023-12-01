import db from '../models/index.js';
import token from '../utils/token.js';

const middleware = {
    verify_token(req, res, next) {
        const access_token = req.cookies.access_token;
        if (access_token) {
            token.verify_token(access_token, process.env.JWT_ACCESS_KEY, (err, token_decode) => {
                if (err) {
                    return res.status(403).json({
                        is_error: true,
                        message: 'Bạn không có quyền truy cập tài nguyên này',
                    });
                }
                req.token = token_decode;
                next();
            });
        } else {
            return res.status(401).json({
                is_error: true,
                message: 'Vui lòng đăng nhập để tiếp tục',
            });
        }
    },

    verify(req, res, next, roles) {
        middleware.verify_token(req, res, async () => {
            const is_user = await db.User.findByPk(req.token.id);
            if (is_user && roles.includes(is_user.Role)) {
                next();
            } else {
                return res.status(403).json({
                    is_error: true,
                    message: 'Bạn không có quyền truy cập tài nguyên này',
                });
            }
        });
    },

    verify_user(req, res, next) {
        middleware.verify(req, res, next, ['user']);
    },

    verify_manager(req, res, next) {
        middleware.verify(req, res, next, ['manager']);
    },

    verify_admin(req, res, next) {
        middleware.verify(req, res, next, ['admin']);
    },

    verify_admin_and_user(req, res, next) {
        middleware.verify(req, res, next, ['admin', 'user']);
    },

    verify_admin_and_manager(req, res, next) {
        middleware.verify(req, res, next, ['admin', 'manager']);
    },

    verify_all_user(req, res, next) {
        middleware.verify(req, res, next, ['admin', 'manager', 'user']);
    },
};

export default middleware;
