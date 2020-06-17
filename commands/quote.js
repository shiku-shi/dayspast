module.exports = {
    name: 'quote',
    aliases: ['q'],
    description: 'Добавляет цитату к последнему событию. Активна в течении двух минут.',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<text>',
    roleRestricted: true,
    execute(message, args) {
        const { Users, Admins, Roles, Events } = require('../dbObjects');
        const lastDate = await Events.max('event_date');
        if (!lastDate) {message.reply('в базе нет событий!')};
        const now = Date.now();
        const msPast = now - lastDate;
        if (msPast <= 120000) {
            const quote = args.join(/ +/);
            await Events.update({
                quote: quote
            }, {
                where: {
                    event_date: lastDate
                }
            });
        } else {
            message.reply('припозднился ты.')
        }   
    }
}
