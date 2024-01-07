'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Parking_Record extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Parking_Record.belongsTo(models.Parking_Card, {
                foreignKey: 'Card_ID',
                onDelete: 'CASCADE',
            });

            Parking_Record.belongsTo(models.Parking, {
                foreignKey: 'Parking_ID',
                onDelete: 'CASCADE',
            });
        }
    }

    Parking_Record.init(
        {
            Record_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Parking_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Card_ID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            Image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Fee: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            Balance: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            Action: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Parking_Record',
        },
    );
    return Parking_Record;
};
