'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Device extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Device.belongsTo(models.Parking, {
                foreignKey: 'Parking_ID',
                onDelete: 'SET NULL',
            });
        }
    }

    Device.init(
        {
            Device_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Parking_ID: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Device',
        },
    );
    return Device;
};
