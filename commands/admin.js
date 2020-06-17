module.exports = {
    name: 'admin',
    description: 'Добавить админа к боту.',
    cooldown: 10,
    guildOnly: false,
    args: true,
    usage: '<@user1> <@user2> ...',
    admin: true,
    execute(message, args) {
        const { Users, Admins, Roles, Events } = require('../dbObjects');

        if (!message.mentions.users.first()) return message.reply('eh?');
        message.mentions.users.map( async user => {
            if (
                await Admins.findOne({
                    where: {
                        admin_id: user.id
                    }
                })
            ){
                logger.log('warn', `User ${user.id},${user.username} is already an admin.`);
                return message.reply(`пользователь ${user.username} уже есть.`);
            };
            await Admins.create({
                admin_id: user.id,
                admin_name: user.username 
            })
            .then(message.channel.send(':white_check_mark: OK.'))
            .catch (error => {
                logger.log('error', error);
                return message.reply('что-то пошло не так. Обратитесь к <@!134660327252951040>.'); 
            });
        });
    }
}