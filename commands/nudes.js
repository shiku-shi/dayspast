module.exports = {
    name: 'nudes',
    description: '???',
    cooldown: 60,
    guildOnly: false,
    args: false,
    execute(message, args) {
        if (message.channel.type === 'dm') {
            return message.channel.send('https://i.imgur.com/A42pIMF.png');
        } else {
            return message.reply('ну не при всех же.');
        };
    }
}