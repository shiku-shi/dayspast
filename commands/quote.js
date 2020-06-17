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
        const lastDate = await Events.max('event_date', { where: { userId: killer.id }});
        const now = Date.now();
        const totalTks = await Events.count({ where: { userId: killer.id }});
        let reply;
        if (lastDate) {
            const msPast = now - lastDate;
        const quote = message.args.join(/ +/);
    }
}