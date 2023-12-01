'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Parking_Card extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Parking_Card.belongsTo(models.User, {
                foreignKey: 'User_ID',
            });

            Parking_Card.hasMany(models.Parking_Record, {
                foreignKey: 'Card_ID',
            });
        }
    }

    Parking_Card.init(
        {
            Card_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            User_ID: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            Is_Lock: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Parking_Card',
        },
    );

    return Parking_Card;
};
