'use strict';
const bcrypt = require('bcrypt');
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashed_admin_password = await bcrypt.hash('admin', salt);
        const hashed_manager_password = await bcrypt.hash('manager', salt);
        const hashed_user_password = await bcrypt.hash('user', salt);

        const data = [
            {
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Name: 'Hust Parking Admin',
                Email: 'tranviethung912002@gmail.com',
                Password: hashed_admin_password,
                Gender: label.gender.MALE,
                Birthday: '2002-01-09',
                Phone_Number: '0983394837',
                Address: 'Hà Nội',
                Avatar: 'https://i.pinimg.com/originals/3f/34/b2/3f34b2b917029cc9a0caddaa0a4454fb.png',
                Balance: 0,
                Status: label.user.ACTIVE,
                Role: label.role.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '5f3e964e-8d2e-4b6a-9462-80bbdec33ae8',
                Name: 'Hust Parking Manager',
                Email: 'tranhung912002@gmail.com',
                Password: hashed_manager_password,
                Gender: label.gender.MALE,
                Birthday: '2002-10-10',
                Phone_Number: '0987654321',
                Address: 'Hà Nội',
                Avatar: 'https://cdn-icons-png.flaticon.com/512/708/708963.png',
                Balance: 0,
                Status: label.user.ACTIVE,
                Role: label.role.MANAGER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Name: 'Trần Việt Hùng',
                Email: 'hung912002@gmail.com',
                Password: hashed_user_password,
                Gender: label.gender.MALE,
                Birthday: '2002-08-20',
                Phone_Number: '0123456789',
                Address: 'Hà Nội',
                Avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                Balance: 0,
                Status: label.user.ACTIVE,
                Role: label.role.USER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Users', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
