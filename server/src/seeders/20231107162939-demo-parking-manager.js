'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                User_ID: '5f3e964e-8d2e-4b6a-9462-80bbdec33ae8',
                Parking_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: '5f3e964e-8d2e-4b6a-9462-80bbdec33ae8',
                Parking_ID: '27fe9583-6365-4046-8c3c-021c38a6b351',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Managers', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Managers', null, {});
    },
};
