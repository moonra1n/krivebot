const Discord = require("discord.js");
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    let dev = ["817883855310684180"];
    if (!dev.includes(message.author.id)) return message.channel.send("Niedostępne dla użytkowników!")

    let user = message.mentions.users.first()

    if (!user) return client.error(message, `Nie znaleziono użytkownika`)
    if (!args[0]) return client.error(message, `Nie podano użytkownika`)

    r.table("gbans").filter({userid: user.id}).delete().run(client.con)

    const embed = new Discord.MessageEmbed()
        .setDescription(`Usunięto gbana dla ${user.tag}`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "ungban",
    description: "Usuwa blokadę na korzystanie z bota",
    category: "developers"
}