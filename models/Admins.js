module.exports = (sequelize, DataTypes) => {
    return sequelize.define('admins',{
        admin_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        admin_name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        timestamps: false
    });
}