const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, `Podaj nazwę emoji`)

    const emoji = client.emojis.cache.find(x => x.name === args[0])
    if (!emoji) return client.error(message, `Nie znalazłem tego emoji (musisz wpisać NAZWĘ bez dwukropek.)`)

    message.channel.send(emoji.toString().toLowerCase())
};

exports.help = {
    name: "nitro",
    description: "nitro",
    category: "fun"
}