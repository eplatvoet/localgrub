module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
        shop_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(12,6),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(12,6),
            allowNull: false,
        },
        address : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,150]
            }
        },
        hours : {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1,200]
            }
        },
        cost_for_two : {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        shop_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        cuisines: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        highlights: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shop_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_review: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true,
            }
        },
    });
    
    // need to ask if we ever need foreign key, or is having only onDelete cascade is fine.
    Restaurant.associate = function(models) {
        Restaurant.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Restaurant;
}