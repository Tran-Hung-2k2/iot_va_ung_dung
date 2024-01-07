import jwt from 'jsonwebtoken';

const service = {
    verify_token(token, key, callback) {
        jwt.verify(token, key, callback);
    },

    generate_access_token(id) {
        return jwt.sign({ id }, process.env.JWT_ACCESS_KEY, { expiresIn: '3d' });
    },

    generate_refresh_token(id) {
        return jwt.sign({ id }, process.env.JWT_REFRESH_KEY, { expiresIn: '365d' });
    },

    generate_reset_password_token(Email) {
        return jwt.sign({ Email }, process.env.JWT_RESET_PASSWORD_KEY, { expiresIn: '1d' });
    },

    generate_register_token(data) {
        return jwt.sign({ ...data }, process.env.JWT_REGISTER_KEY, { expiresIn: '1d' });
    },
};

export default service;
