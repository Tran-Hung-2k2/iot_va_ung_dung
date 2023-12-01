'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashed_admin_password = await bcrypt.hash('admin', salt);
        const hashed_manager_password = await bcrypt.hash('manager', salt);
        const hashed_user_password = await bcrypt.hash('user', salt);

        const userData = [
            {
                User_ID: 'a1234567-89ab-4cde-81gh-123456789001',
                User_Name: 'Trần Việt Hùng',
                Email: 'tranviethung912002@gmail.com',
                User_Password: hashed_admin_password,
                Gender: 'Nam',
                Birthday: '2002-01-09',
                Phone_Number: '0983394837',
                Address: 'Hà Nội',
                Avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                Balance: 0,
                Role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'a1234567-89ab-4cde-8fgh-123456789123',
                User_Name: 'Dương Ngọc Hải',
                Email: 'hai@gmail.com',
                User_Password: hashed_manager_password,
                Gender: 'Nam',
                Birthday: '2002-10-10',
                Phone_Number: '0987654321',
                Address: 'Hà Nội',
                Avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                Balance: 0,
                Role: 'manager',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                User_Name: 'Ngô Quốc Khánh',
                Email: 'khanh@gmail.com',
                User_Password: hashed_user_password,
                Gender: 'Nam',
                Birthday: '2002-08-20',
                Phone_Number: '0123456789',
                Address: 'Hà Nội',
                Avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                Balance: 0,
                Role: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Users', userData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
