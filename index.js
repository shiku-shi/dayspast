const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { Users, Admins, Roles, Events } = require('./dbObjects');
const { Op } = require('sequelize');

const client = new Discord.Client();

const winston = require('winston');
logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log' }),
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${Date(Date.now()).replace(' GMT+0300 (Moscow Standard Time)', '')} - ${log.message}`)
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    logger.log('info', 'Bot is ready.');
});
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));
client.on('shardError', m => logger.log('error', `A websocket connection encountered an error: ${m}`));

client.on('message', async message => {
    if (message.mentions.users.size) {
        if (!message.content.startsWith(prefix) && message.mentions.users.first().id === '715285795090726933') return message.reply(`отправь ${prefix}help для списка команд.`);
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    logger.log('info', `${message.author.username}: ${message.content}`);
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Ты чё охуел в крысу доносы писать?')
    }

    if  (command.args && !args.length) {
        let reply = 'пальцем ткни чё ты хочешь.';
        if (command.usage) {
            reply += `\nВот так: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.reply(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`${timeLeft.toFixed(1)} сек, я не успеваю записывать. Повтори про \`${command.name}\` позже.`)
        }
    }

    if (command.admin) {
        const admin = await Admins.findOne({ where: { admin_id: message.author.id }});
        if (!admin)  {
            logger.log('warn', `Anauthorized try by user ${message.author.username}`);
            return message.reply('ты не админ.');
        } else logger.log('info', `Auth success for ${message.author.username}`) 
    }

    if (command.roleRestricted) {
        const roleRestriction = await Roles.findOne({ where: { role_id: message.member.roles.cache.map(role => role.id)}});
        if (!roleRestriction) {
            logger.log('warn', `Anauthorized try by user ${message.author.username}`);
            return message.reply('ты не можешь это делать.');
        } else logger.log('info', `Auth success for ${message.author.username}`);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        logger.log('error', error);
        message.reply('ошибка в выполнении команды.')
    }
});

process.on('uncaughtException', error => logger.log('error', error));
process.on('unhandledRejection', error => logger.log('error', `Unhandled promise rejection: ${error}`))

client.login(token);
