const Sequelize = require('sequelize');

const winston = require('winston');
logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log' }),
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
});

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

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    logger.log('info', 'Database synced');
    sequelize.close();
}).catch(error => logger.log('error', error));