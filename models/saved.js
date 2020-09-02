module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
        latitute: {
            type: DataTypes.DECIMAL(12,6),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(12,6),
            allowNull: false,
        },
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
        neighborhood : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,150]
            }
        },
        hours : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,200]
            }
        },
        cost_for_two : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shop_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        shop_image: {
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
                isNumeric: true, // add smileys
            }
        },
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