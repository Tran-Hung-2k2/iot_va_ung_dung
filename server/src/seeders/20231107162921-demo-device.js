'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Device_ID: '2ce84ffe-9aba-448d-bea4-05bf0d3bfa03',
                Parking_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Name: 'Device 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Device_ID: 'eb1ec7f9-b306-457e-b07e-1bca2c2a8a09',
                Parking_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Name: 'Device 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Devices', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Devices', null, {});
    },
};
