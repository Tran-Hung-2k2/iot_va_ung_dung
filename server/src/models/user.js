'use strict';
const { Model } = require('sequelize');
const label = require('../constants/label');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            User.hasMany(models.Parking_Card, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });

            User.hasMany(models.Parking_Manager, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    User.init(
        {
            User_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Gender: DataTypes.STRING,
            Birthday: DataTypes.DATEONLY,
            Phone_Number: DataTypes.STRING,
            Address: DataTypes.STRING,
            Avatar: DataTypes.STRING,
            Balance: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: label.user.ACTIVE,
            },
            Role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: label.role.USER,
            },
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
