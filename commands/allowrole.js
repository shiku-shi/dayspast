module.exports = {
    name: 'allowrole',
    description: 'Разрешить роль, из которой можно выполнять teamkill.',
    cooldown: 10,
    guildOnly: false,
    args: true,
    usage: '<@role1> <@role2> ...',
    admin: true,
    execute(message, args) {
        const { Users, Admins, Roles, Events } = require('../dbObjects');
        if (!message.mentions.roles.first()) return message.reply('eh?');
        message.mentions.roles.map( async role => {
            if (
                await Roles.findOne({
                    where: {
                        role_id: role.id
                    }
                })
            ){
                logger.log('warn', `Role ${role.id},${role.name} already exists.`);
                return message.reply(`роль ${role.name} уже есть.`);
            };
            await Roles.create({
                role_id: role.id,
                name: role.name 
            })
            .then(message.channel.send(':white_check_mark: OK.'))
            .catch (error => {
                logger.log('error', error);
                return message.reply('что-то пошло не так. Обратитесь к Скс.'); 
            });
        });
    }
}