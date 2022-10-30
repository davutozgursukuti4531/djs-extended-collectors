const Discord = require("discord.js")
const client = new Discord.Client({ intents: Object.values(Discord.GatewayIntentBits) })
const MessageCollector = require("../Classes/MessageCollector.js")
const ApplicationCommandCollector = require("../Classes/ApplicationCommandCollector.js")




client.on("ready", () => {
    console.log("Experiment is Ready!")
    client.application.commands.create({
        name: "modal-submit-collector",
        description: "testing the ModalSubmitCollector",
        type: Discord.ApplicationCommandType.ChatInput
    })
    client.application.commands.create({
        name: "yes-no",
        description: "testing the ApplicationCommandCollector",
        type: Discord.ApplicationCommandType.ChatInput
    })
    client.application.commands.create({
        name: "yes",
        description: "say yes",
        type: Discord.ApplicationCommandType.ChatInput
    })
    client.application.commands.create({
        name: "no",
        description: "say no",
        type: Discord.ApplicationCommandType.ChatInput
    })
})

client.on("interactionCreate", async(interaction) => {
    if(interaction.commandName === "yes-no"){
        const collector = new ApplicationCommandCollector(client, interaction.channel, {
            time: 30000
        })
        collector.on("collect", (a) => {
            if(a.commandName === "yes"){
                console.log("yes")
            }
            if(a.commandName === "no"){
                console.log("no")
            }
        })
    }
})
client.on("messageCreate", async(message) => {
    if(message.content === "bulk-delete"){
        await message.channel.messages.channel.bulkDelete(10)
    }
    if(message.content === "start-message-collector"){
        const collector = new MessageCollector(client, message.channel, {
            time: 15000,
            dispose: true,
            filter: (msg) => msg.content !== "test amk",
            disposeFilter: (msg) => msg.content !== "qwe",
            updateFilter: (oldMsg, newMsg) => newMsg.content === "test2" && oldMsg.content !== "test1"
        })
        collector.on("collect", (item) => {
            console.log(item.content)
        })
        collector.on("update", (o, n) => {
            console.log("old Message: " + o.content + ", new Message: " + n.content)
        })
        collector.on("dispose", (m) => {
            console.log('"' + m.content + '"' + " is deleted")
        })
        collector.on("end", (collected, reason) => {
            console.log("collector ended")
        })
    };
})




client.login("")