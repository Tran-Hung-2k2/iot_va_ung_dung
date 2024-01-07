import db from '../models/index.js';
import label from '../constants/label.js';
import api_response from '../utils/api_response.js';
import token_service from '../services/token.service.js';

const middleware = {
    verify_token(req, res, next) {
        const access_token = req.cookies.access_token;
        if (access_token) {
            token_service.verify_token(access_token, process.env.JWT_ACCESS_KEY, (err, token_decode) => {
                if (err) {
                    return res.status(403).json(api_response(true, 'Bạn không có quyền truy cập tài nguyên này'));
                }
                req.token = token_decode;
                next();
            });
        } else {
            return res.status(401).json(api_response(true, 'Vui lòng đăng nhập để tiếp tục'));
        }
    },

    verify(req, res, next, roles) {
        middleware.verify_token(req, res, async () => {
            const user = await db.User.findByPk(req.token.id);
            if (user && roles.includes(user.Role)) {
                req.token.role = user.Role;
                next();
            } else {
                return res.status(403).json(api_response(true, 'Bạn không có quyền truy cập tài nguyên này'));
            }
        });
    },

    verify_user(req, res, next) {
        middleware.verify(req, res, next, [label.role.USER]);
    },

    verify_manager(req, res, next) {
        middleware.verify(req, res, next, [label.role.MANAGER]);
    },

    verify_admin(req, res, next) {
        middleware.verify(req, res, next, [label.role.ADMIN]);
    },

    verify_admin_and_user(req, res, next) {
        middleware.verify(req, res, next, [label.role.ADMIN, label.role.USER]);
    },

    verify_admin_and_manager(req, res, next) {
        middleware.verify(req, res, next, [label.role.ADMIN, label.role.MANAGER]);
    },

    verify_all_user(req, res, next) {
        middleware.verify(req, res, next, [label.role.ADMIN, label.role.MANAGER, label.role.USER]);
    },
};

export default middleware;
