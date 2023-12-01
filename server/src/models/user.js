'use strict';
const { Model } = require('sequelize');

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
            });

            User.belongsToMany(models.Parking, {
                through: 'Parking_Manager',
                foreignKey: 'User_ID',
                otherKey: 'Parking_ID',
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
            User_Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            User_Password: {
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
            Role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user',
            },
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
