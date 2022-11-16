const Discord = require("discord.js")
const client = new Discord.Client({ intents: Object.values(Discord.GatewayIntentBits) })
const djsExtendedCollectors = require("../index.js")





client.on("ready", () => {
    console.log("Experiment is Ready!")
})




client.login("")
