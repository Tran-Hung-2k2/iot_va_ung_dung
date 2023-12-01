'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const parkingManagerData = [
            {
                User_ID: 'a1234567-89ab-4cde-81gh-123456789001',
                Parking_ID: 'b2345678-9abc-4def-gh12-345678901234',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'a1234567-89ab-4cde-81gh-123456789001',
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                User_ID: 'a1234567-89ab-4cde-8fgh-123456789123',
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Managers', parkingManagerData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Managers', null, {});
    },
};
