const Discord = require("discord.js");
const r = require("rethinkdb")
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

exports.run = async (client, message, args) => {
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
        const remaining = humanizeDuration(cooldown - Date.now());

        return message.channel.send(`Musisz jeszcze poczekać ${remaining} aby użyć ponownie tej komendy!`)
    } else {

        let luck = (Math.floor(Math.random() * (85 - 0) + 0))

        const embed = new Discord.MessageEmbed()
            .setDescription(`Otrzymujesz ${luck} monet`)
            .setColor("GREEN")
        message.channel.send(embed)

        r.table("economy").insert({
            money: luck,
            userid: message.author.id,
        }).run(client.con)

        const d = await r.table("economy").get(message.author.id).run(client.con)

         r.table("economy").update({money: d.money + luck}).run(client.con)
    }
    cooldowns.set(message.author.id, Date.now() + 180);
    setTimeout(() => cooldowns.delete(message.author.id), 20000);
}
exports.help = {
    name: "work",
    aliases: ["pracuj"],
    category: "economy",
}