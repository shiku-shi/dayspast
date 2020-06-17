module.exports = {
    name: 'check',
    description: 'Проверить инфу о себе или о юзере',
    cooldown: 10,
    usage: '<user>, либо без аргументов.',
    execute(message, args) {
        const { Users, Admins, Roles, Events } = require('../dbObjects');
        if ( args.length && !message.mentions.users.first() ) {
            return message.reply('eh?');
        }
        async function checkEvents() {
            let killer;
            let selfcheck = false;
            if (!message.mentions.users.first()) { 
                killer = await Users.findOne({ where: { user_id: message.author.id }});
                selfcheck = true;
            } else {
                killer = await Users.findOne({ where: { user_id: message.mentions.users.first().id }});
                if (!killer) { return message.reply(`у меня нет досье на ${message.mentions.users.first()}`)};
            }
            const lastDate = await Events.max('event_date', { where: { userId: killer.id }});
            const now = Date.now();
            const totalTks = await Events.count({ where: { userId: killer.id }});
            let reply;
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
                if (selfcheck) {
                    return message.reply(`времени прошло с предыдущего убийства: ${daysPast.toFixed()} ${mu}.\nВсего ты убивал своих ${totalTks} раз.`);
                } else {
                    return message.channel.send(`Времени прошло с предыдущего убийства: ${daysPast.toFixed()} ${mu}.\nВсего ${message.mentions.users.first()} убивал своих ${totalTks} раз.`);
                }
            };
            if (selfcheck) {
                return message.reply('не вижу записей о тебе, либо никто не доносил, либо тебе повезло :thinking:');
            } else {
                message.channel.send(`Не вижу записей о ${message.mentions.users.first()}, либо никто не доносил, либо ${message.mentions.users.first()} повезло :thinking:`);
            }
        };
        checkEvents();
    }
}