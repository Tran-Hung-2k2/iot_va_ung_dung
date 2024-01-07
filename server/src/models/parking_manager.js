'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Parking_Manager extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ ở đây
            Parking_Manager.belongsTo(models.User, {
                foreignKey: 'User_ID',
                onDelete: 'CASCADE',
            });

            Parking_Manager.belongsTo(models.Parking, {
                foreignKey: 'Parking_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Parking_Manager.init(
        {
            User_ID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            Parking_ID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            Is_Managing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Parking_Manager',
        },
    );
    return Parking_Manager;
};
