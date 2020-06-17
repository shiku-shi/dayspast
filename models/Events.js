module.exports = (sequelize, DataTypes) => {
    return sequelize.define('events',{
        event_date: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true
        },
        quote: {
            type: DataTypes.TEXT,
            unique: true
        }
    });
}