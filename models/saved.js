module.exports = function(sequelize, DataTypes) {
    const Saved = sequelize.define("Saved", {
        shop_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,150]
            }
        },
        latitute: {
            type: DataTypes.DECIMAL(12,6),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(12,6),
            allowNull: false,
        },
        shop_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        shop_imag: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        user_review: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1,100]
            }
        },
        user_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true,
            }
        },
        api_review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        api_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
            }
        }
    });
    Saved.associate = function(models) {
        Saved.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Saved;
}