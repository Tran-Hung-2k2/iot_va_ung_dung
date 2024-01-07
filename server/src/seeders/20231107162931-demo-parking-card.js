'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Card_ID: 'd97987a4-696d-4632-a4a8-7c46e9522286',
                User_ID: 'ebf65320-86f7-4268-a634-4b24e52f700e',
                Is_Lock: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Card_ID: 'ad9dea2e-7b47-4d35-9291-a60e69245523',
                User_ID: '06dab5f6-46bc-46df-9f76-4ed1f019017d',
                Is_Lock: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Cards', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Cards', null, {});
    },
};
