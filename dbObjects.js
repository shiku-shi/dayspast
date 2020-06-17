const Sequelize = require('sequelize');

const sequelize = new Sequelize('dayspast', 'thebot', 'thebot', {
    host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'dayspast.sqlite',
});

const Admins = sequelize.import('models/Admins');
const Events = sequelize.import('models/Events');
const Roles = sequelize.import('models/Roles');
const Users = sequelize.import('models/Users');

Users.hasMany(Events);
Events.belongsTo(Users);

module.exports = { Admins, Events, Roles, Users };