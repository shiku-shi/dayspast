const { Users, Admins, Roles, Events } = require("../dbObjects");
const Discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  description: "Самые лучшие (нет) стрелки этой конфы",
  cooldown: 10,
  execute(message, args) {
    leaderboardArray = new Array();
    async function leaderboard() {
      await Users.findAll().map(async (u) => {
        const events = await u.countEvents({
          attributes: ["event_date"],
          where: { userId: u.id },
        });
        const record = {
          id: u.user_id,
          count: events,
        };
        leaderboardArray.push(record);
      });
      leaderboardArray.sort((a, b) => b.count - a.count);

      async function getList() {
        let list = new String();
        for (member of leaderboardArray) {
          await message.guild.members.fetch(member.id).then((user) => {
            list += `${user.user.username} - ${member.count}\n`;
          })
          .catch(console.error);
        }
        return list;
      }
      async function sendMessage() {
        const leaderboardEmbed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle("Таблица самых метких бойцов")
        .addFields({
          name: "Вот они, сверху вниз:",
          value: "```" + await getList() + "```",
          inline: true,
        })
        .setTimestamp();
      message.channel.send(leaderboardEmbed);
      }
      sendMessage();
    }
    leaderboard();
  },
};
