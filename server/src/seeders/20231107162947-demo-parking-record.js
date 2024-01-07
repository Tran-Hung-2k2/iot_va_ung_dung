'use strict';
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = [
            {
                Record_ID: '1b4ca2dc-6bf8-44b5-90e7-7f45b2443ab9',
                Parking_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Card_ID: 'd97987a4-696d-4632-a4a8-7c46e9522286',
                Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKQBnRyS1zr50if3iwWZ2HvHzPpMJKp_dc_A&usqp=CAU',
                Fee: 0,
                Balance: 3,
                Action: label.action.GO_IN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Record_ID: 'a146ac00-a13c-4f43-8618-f996b1140acf',
                Parking_ID: '4f85c61a-2a20-41ff-b8ed-fbe2940d4c68',
                Card_ID: 'd97987a4-696d-4632-a4a8-7c46e9522286',
                Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKQBnRyS1zr50if3iwWZ2HvHzPpMJKp_dc_A&usqp=CAU',
                Fee: 3,
                Balance: 0,
                Action: label.action.GO_OUT,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Records', data, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Records', null, {});
    },
};
