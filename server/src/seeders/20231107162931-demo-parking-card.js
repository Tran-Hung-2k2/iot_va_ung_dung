'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const parkingCardData = [
            {
                Card_ID: 'c3456789-abcd-4efg-f515-456789012345',
                User_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Is_Lock: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Card_ID: 'c3456789-abcd-4efg-h123-456789012345',
                User_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Is_Lock: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Cards', parkingCardData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Cards', null, {});
    },
};
