'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Parking extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Parking.belongsToMany(models.User, {
                through: 'Parking_Manager',
                foreignKey: 'Parking_ID',
                otherKey: 'User_ID',
            });

            Parking.hasMany(models.Parking_Record, {
                foreignKey: 'Parking_ID',
            });
        }
    }

    Parking.init(
        {
            Parking_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Parking_Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Address: DataTypes.STRING,
            Number_Of_Vehicles: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            Max_Space: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Parking',
        },
    );
    return Parking;
};
