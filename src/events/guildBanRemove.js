const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, guild, user) => {
    try {
        const logChannel = await r.table("settings").get(guild.id)("guildBanRemoveLog").run(client.con)

        const logEmbed = new Discord.MessageEmbed()
            .setTitle("Odbanowano użytkownika!")
            .setColor("GREEN")
            .addField("Nazwa użytkownika", user.username ||"Brak")
            .addField("Tag użytkownika", user.discriminator ||"Brak")
            .addField("Pełna nazwa użytkownika", user.tag ||"Brak")
            .addField("ID", user.id ||"Brak")

        guild.channels.cache.get(logChannel).send(logEmbed)
    } catch {
        null;
    }

}