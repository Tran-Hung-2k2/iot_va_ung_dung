'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Parking_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Name: 'Sample Parking 1',
                Address: '123 Main Street',
                Max_Space: 100,
                Charge: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Parking_ID: '27fe9583-6365-4046-8c3c-021c38a6b351',
                Name: 'Sample Parking 2',
                Address: '456 Elm Street',
                Max_Space: 150,
                Charge: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parkings', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parkings', null, {});
    },
};
