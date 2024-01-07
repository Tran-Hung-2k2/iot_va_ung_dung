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
            Parking.hasMany(models.Parking_Manager, {
                foreignKey: 'Parking_ID',
                onDelete: 'CASCADE',
            });

            Parking.hasMany(models.Parking_Record, {
                foreignKey: 'Parking_ID',
                onDelete: 'CASCADE',
            });

            Parking.hasMany(models.Device, {
                foreignKey: 'Parking_ID',
                onDelete: 'SET NULL',
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
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Charge: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
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
