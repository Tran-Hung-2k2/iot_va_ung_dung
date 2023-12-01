import db from '../models/index.js';

const validation = {
    uuidv4Id: (value, helpers) => {
        if (!value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)) {
            return helpers.message('"{{#label}}" phải là UUIDv4');
        }
        return value;
    },

    confirmPassword: (value, helpers) => {
        if (value.User_Password !== value.Confirm_Password)
            return helpers.message('Mật khẩu xác nhận không khớp với Mật khẩu đã nhập');
        return value;
    },

    isNotRegistered: async (value, helpers) => {
        try {
            const isUserExist = await db.User.findOne({ where: { Email: value } });
            if (isUserExist) return helpers.message('Email đã được đăng ký trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isRegistered: async (value, helpers) => {
        try {
            const isUserExist = await db.User.findOne({ where: { Email: value } });
            if (!isUserExist) return helpers.message('Email chưa được đăng ký tài khoản trước đó');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isUser: async (value, helpers) => {
        try {
            const isUser = await db.User.findByPk(value);
            if (!isUser) return helpers.message('Không tìm thấy người dùng');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isManager: async (value, helpers) => {
        try {
            const manager = await db.User.findByPk(value);
            if (!manager || (manager.Role != 'manager' && manager.Role != 'admin'))
                return helpers.message('Không tìm thấy người quản lý');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },

    isParking: async (value, helpers) => {
        try {
            const isParking = await db.Parking.findByPk(value);
            if (!isParking) return helpers.message('Không tìm thấy bãi đỗ xe');
            return value;
        } catch (error) {
            return helpers.message(error.message);
        }
    },
};

export default validation;
