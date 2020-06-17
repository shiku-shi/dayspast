module.exports = {
    name: 'register',
    description: 'Добавить пользователя к отсчёту.',
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
                await Users.findOne({
                    where: {
                        user_id: user.id
                    }
                })
            ){
                logger.log('warn', `User ${user.id},${user.username} already exists.`);
                return message.reply(`пользователь ${user.username} уже есть.`);
            };
            await Users.create({
                user_id: user.id,
                user_name: user.username
            })
            .catch (error => {
                logger.log('error', error);
                return message.reply('что-то пошло не так. Обратитесь к @Cphs.'); 
            });
            message.channel.send(':white_check_mark: OK.');
            const userId = await Users.findOne({ where: { user_id: user.id }});
            logger.log('info', userId.id);
            /*if (
                await Events.findAll({
                    where: { userId: userId.id }
                })
            ){
                await Events.create({
                    event_date: Date.now(),
                    userId: userId.id
                }).catch (error => {
                    logger.log('error', error);
                    return message.reply('что-то пошло не так. Обратитесь к <@!134660327252951040>.'); 
                });
            }*/
        });
    }
}