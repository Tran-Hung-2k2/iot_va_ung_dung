'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Parkings", deps: []
 * createTable "Users", deps: []
 * createTable "Devices", deps: [Parkings]
 * createTable "Parking_Cards", deps: [Users]
 * createTable "Parking_Managers", deps: [Users, Parkings]
 * createTable "Parking_Records", deps: [Parkings, Parking_Cards]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2024-01-07T10:54:54.165Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Parkings",
            {
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "field": "Parking_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "allowNull": false
                },
                "Address": {
                    "type": Sequelize.STRING,
                    "field": "Address",
                    "allowNull": false
                },
                "Charge": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Charge",
                    "allowNull": false
                },
                "Number_Of_Vehicles": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Number_Of_Vehicles",
                    "defaultValue": 0
                },
                "Max_Space": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Max_Space",
                    "defaultValue": 0
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "field": "User_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true,
                    "allowNull": false
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password",
                    "allowNull": false
                },
                "Gender": {
                    "type": Sequelize.STRING,
                    "field": "Gender"
                },
                "Birthday": {
                    "type": Sequelize.DATEONLY,
                    "field": "Birthday"
                },
                "Phone_Number": {
                    "type": Sequelize.STRING,
                    "field": "Phone_Number"
                },
                "Address": {
                    "type": Sequelize.STRING,
                    "field": "Address"
                },
                "Avatar": {
                    "type": Sequelize.STRING,
                    "field": "Avatar"
                },
                "Balance": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Balance",
                    "defaultValue": 0
                },
                "Status": {
                    "type": Sequelize.STRING,
                    "field": "Status",
                    "defaultValue": "Bình thường",
                    "allowNull": false
                },
                "Role": {
                    "type": Sequelize.STRING,
                    "field": "Role",
                    "defaultValue": "User",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Devices",
            {
                "Device_ID": {
                    "type": Sequelize.UUID,
                    "field": "Device_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Parkings",
                        "key": "Parking_ID"
                    },
                    "field": "Parking_ID",
                    "allowNull": true
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parking_Cards",
            {
                "Card_ID": {
                    "type": Sequelize.UUID,
                    "field": "Card_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "User_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "field": "User_ID",
                    "allowNull": true
                },
                "Is_Lock": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Is_Lock",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parking_Managers",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "field": "User_ID",
                    "primaryKey": true,
                    "allowNull": false
                },
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parkings",
                        "key": "Parking_ID"
                    },
                    "field": "Parking_ID",
                    "primaryKey": true,
                    "allowNull": false
                },
                "Is_Managing": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Is_Managing",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parking_Records",
            {
                "Record_ID": {
                    "type": Sequelize.UUID,
                    "field": "Record_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parkings",
                        "key": "Parking_ID"
                    },
                    "field": "Parking_ID",
                    "allowNull": false
                },
                "Card_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parking_Cards",
                        "key": "Card_ID"
                    },
                    "field": "Card_ID",
                    "allowNull": false
                },
                "Image": {
                    "type": Sequelize.STRING,
                    "field": "Image",
                    "allowNull": false
                },
                "Fee": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Fee",
                    "allowNull": false
                },
                "Balance": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Balance",
                    "allowNull": false
                },
                "Action": {
                    "type": Sequelize.STRING,
                    "field": "Action",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
