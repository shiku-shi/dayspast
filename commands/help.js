module.exports = {
    name: 'help',
    aliases: ['?', 'h', 'commands', 'cmd'],
    description: 'Список команд',
    cooldown: 10,
    guildOnly: false,
    args: false,
    execute(message, args) {
        const { Users, Admins, Roles, Events } = require('../dbObjects');
        const { prefix } = require('../config.json');
        const Discord = require('discord.js');
        const { commands } = message.client;
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('Вот всё что я умею:')
            .setThumbnail('https://i.imgur.com/qIlUF87.png');
        commands.map(command => {
            const data = [];
            if (command.admin && !Admins.findOne({where: {admin_id: message.author.id}})) return;
            if (command.aliases) data.push(`**Алиасы:** \`${command.aliases.join(', ')}\``);
            if (command.description) data.push('**Описание:**', `${command.description}`);
            if (command.usage) data.push('**Использование:**', `\`${prefix}${command.name} ${command.usage}\``);
            data.push(`**Откат:** ${command.cooldown || 3} секунд(ы)`);
            helpEmbed.addField(`**Команда:** \`${command.name}\``, data); 
        });
        return message.author.send(helpEmbed)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('проскользил в твою личку, жди нюдесы.');
            })
            .catch(error => {
                logger.log('error', `Could not send help DM to ${message.author.tag}.\n${error}`)
                message.reply('не смог отправить нюдесы, у тебя личка закрыта.')
            });
	}
};