module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users',{
        user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        timestamps: false
    });
}