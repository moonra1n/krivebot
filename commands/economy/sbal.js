exports.run = async (client, message, args) => {
    client.commandNotEnabled(message, "Przeniesione do wersji 3.1")
}
exports.help = {
    name: "sbal",
    aliases: [],
    category: "economy",
}