'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const parkingData = [
            {
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Parking_Name: 'Sample Parking 1',
                Address: '123 Main Street',
                Max_Space: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Parking_ID: 'b2345678-9abc-4def-gh12-345678901234',
                Parking_Name: 'Sample Parking 2',
                Address: '456 Elm Street',
                Max_Space: 150,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parkings', parkingData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parkings', null, {});
    },
};
