module.exports = {
	name: 'reload',
    description: 'Reloads a command',
    admin: true,
	execute(message, args) {
        if (!args.length) return message.channel.send('Choose a command.');
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return message.channel.send(`No command with this name \`${commandName}\``);
        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            logger.log('error', error);
            message.channel.send(`Error reloading \`${command.name}\`:\n\`${error.message}\``);
        }
        message.channel.send(`Command \`${command.name}\` was reloaded successfully.`)
    }
};