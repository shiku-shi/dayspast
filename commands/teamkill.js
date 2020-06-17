module.exports = {
    name: 'teamkill',
    aliases: ['tk'],
    description: 'Сбрасывает счётчик Дней С Момента',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<user>',
    roleRestricted: true,
    execute(message, args) {
        const { Users, Admins, Roles, Events } = require('../dbObjects');
        if (!message.mentions.users.first()) return message.reply('eh?');
        async function addEvent() {
            const killer = await Users.findOne({ where: { user_id: message.mentions.users.first().id }});
            if (!killer) { return message.reply(`у меня нет досье на ${message.mentions.users.first()}`)};
            const lastDate = await Events.max('event_date', { where: { userId: killer.id }});
            const now = Date.now();
            await Events.create({
                event_date: now,
                userId: killer.id
            });
            const totalTks = await Events.count({ where: { userId: killer.id }});
            if (lastDate) {
                const msPast = now - lastDate;
                let daysPast;
                let mu;
                switch (true) {
                    case msPast < 1000:
                        daysPast = msPast;
                        mu = 'мс';
                        break;
                    case msPast >= 1000 && msPast < 60000:
                        daysPast = msPast / 1000;
                        mu = 'с';
                        break;
                    case msPast >= 60000 && msPast < 3600000:
                        daysPast = msPast / 60000;
                        mu = 'мин';
                        break;
                    case msPast >= 3600000 && msPast < 86400000:
                        daysPast = msPast / 3600000;
                        mu = 'ч';
                        break;
                    case msPast >= 86400000:
                        daysPast = msPast / 86400000;
                        mu = 'д';
                        break;
                }
                return message.channel.send(`Дней с последнего убийства союзника игроком ${message.mentions.users.first()}: 0\nВремени прошло с предыдущего убийства: ${daysPast.toFixed()} ${mu}.\nВсего ${message.mentions.users.first()} убивал своих ${totalTks} раз.`);
            };
            message.channel.send(`Дней с последнего убийства союзника игроком ${message.mentions.users.first()}: 0\nВсего ${message.mentions.users.first()} убивал своих ${totalTks} раз.`);
        }; 
        addEvent();
    }
}