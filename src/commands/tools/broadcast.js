const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")
    if (!args[0]) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    const channel = await r.table("settings").get(message.guild.id)("broadcastChannel").run(client.con)
    if (!channel) return message.channel.send("Nie ustawiono kanału!")

    const notifyRole = await r.table("settings").get(message.guild.id)("broadcastPing").run(client.con)
    if (!notifyRole) return null;

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe ogłoszenie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    client.channels.cache.get(channel).send(embed)
    client.channels.cache.get(channel).send(`<@&${notifyRole}>`).then(ping => {
        ping.delete({timeout: 1000})
    })
    const sent = new Discord.MessageEmbed()
        .setDescription("Wysłano ogłoszenie!")
        .setColor("GREEN")
    message.channel.send(sent)

    const logChannel = await r.table("logs")
}
exports.help = {
    name: "broadcast",
    description: "Wyswietla ogłoszenie",
    category: "tools",
}