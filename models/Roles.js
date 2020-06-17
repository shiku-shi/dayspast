module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles',{
        role_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: DataTypes.STRING
    }, {
        timestamps: false
    });
}