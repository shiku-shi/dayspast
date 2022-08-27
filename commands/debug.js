const { Users, Admins, Roles, Events } = require("../dbObjects");
const Discord = require('discord.js');

module.exports = {
	name: "debug",
	aliases: ["d"],
	description: "Shows debug info",
	admin: true,
	execute(message, args) {
		const leaderboardEmbed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle("Таблица самых метких бойцов")
		.addFields(
			{
				name: "Вот они, сверху вниз:",
				value: "```Benks - 50\nBorsjik - 40\n```",
				inline: true,
			}
		)
		.setTimestamp();
	message.channel.send(leaderboardEmbed);
		// leaderboardArray = new Array();
		// async function leaderboard() {
		// 	test = message.guild.members.fetch("323858994357731328");
		// 	// .then(console.log)
		// 	// .catch(console.error);
		// 	console.log(test.joinedTimestamp);
		// }
		// leaderboard();
		// message.channel.send(message.author.id);
		/*message.channel.send('<@!134660327252951040>');
		logger.log('info', `{${message.author.id}: ${message.author.username}#${message.author.discriminator}}, ${message.member.roles.cache.map(element => element.id)}`) // add channel check if I care enough
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nYour username: ${message.author}\nYour ID: ${message.author.id}`);*/
		/*	const { Users, Admins, Roles, Events } = require('../dbObjects');
			async function isUserAdmin(author) {
				return await Admins.findOne({ 
					where: { admin_id: author }
				});
			}
			isUserAdmin(message.author.id)
			.catch (error => {
				logger.log('error', error);
				return message.reply('что-то пошло не так. Обратитесь к <@!134660327252951040>.'); 
			})
			.then(function(result){
				if (!result) {message.reply('ты не админ.')}
			});
			/*Benks | 30.05.2020 | 27.05.2020 | 24.05.2020 | 14.04.2020 |
	Imarika | 05.04.2020 |
	Sikusi | - |
	Relatio | 27.05.2020 | 08.05.2020 |
	Mukyuu | 29.05.2020 | 08.05.2020 | 12.04.2020 |
	Borschik | 19.05.2020 | 14.05.2020 | 11.05.2020 | 25.04.2020 | 12.04.2020 |*/

		/*.catch (error => {logger.log('error', error)});
		logger.log('info', message.author.id);
		if (!isUserAdmin) return message.reply('нет');
if (isUserAdmin) return message.reply('да');*/
	},
};
