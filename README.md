# djs-extended-collectors

- Enhanced Collector Module for Discord.js

![Image](https://img.shields.io/npm/dt/djs-extended-collectors.svg?color=%2351FC0&maxAge=3600)
![Image](https://img.shields.io/npm/v/djs-extended-collectors?color=red&label=djs-extended-collectors)

# NOTE:
- You can write your suggestions on Discord.


# Why djs-extended-collectors?
- TypeScript Support(Full).
- ESM(ES Module) Support.
- More Collectors.
- Extended Discord.js Collectors.
- Useful & Basic.

# Not:
- Discord.js v14 or fever required

# Dependencies:
- discord.js: 14.6.0
- colorette: 2.0.19
- rexar-tools: 2.7.0
- typed-emitter: 2.1.0

# Classes
- MessageCollector
- ApplicationCommandCollector
- BaseCollector(this is a base)
- ModalSubmitCollector
- AutocompleteCollector
- MessageReactionCollector

# Functions
- awaitApplicationCommands
- awaitAutoCompletes
- awaitMessages
- awaitModalSubmits
- awaitMessageReactions

# 1.9.0

- fixed some errors and bugs

# Using

### Importing

#### CommonJS(CJS)
```js
const DjsExtendedCollectors = require("djs-extended-collectors")
```
#### ESModule(ESM)
```mjs
import DjsExtendedCollectors from "djs-extended-collectors";
//or
const DjsExtendedCollectors = await import("djs-extended-collectors").then(m => m.default)
```
#### Typescript(TS)
```ts
import DjsExtendedCollectors from "djs-extended-collectors";
```

## Using
```js
const client = new Discord.Client({
    intents: [Object.values(Intents)]//activate all intents
})


//Interaction Collectors.
client.on("interactionCreate", async(interaction) => {
    if(interaction.isCommand()){

        //application command collector's basic usage
        if(interaction.commandName === "application-command-collector-test"){
            const cmdCollector = new DjsExtendedCollectors.ApplicationCommandCollector(client, interaction.channel, {
                collectFilter: (int) => {
                    return int.user.id === interaction.user.id
                },
            })

            cmdCollector.on("collect", (intr) => {
                console.log(intr.commandName)
            })
        }

        //await application commands's basic usage
        if(interaction.commandName === "await-application-commands-test"){
            const intr = await DjsExtendedCollectors.awaitApplicationCommands(client, interaction.channel, {
                collectFilter: (int) => {
                    return int.user.id === interaction.user.id
                }
            })

            console.log(intr.commandName)
        }

        //autocomplete collector's basic usage
        if(interaction.commandName === "autocomplete-collector-test"){
            const autoCompleteCollector = new DjsExtendedCollectors.AutocompleteCollector(client, interaction.channel, {})
            autoCompleteCollector.on("collect", (intr) => {
                console.log(intr.commandName)
            })
        }

        //await autocompletes's basic usage
        if(interaction.commandName === "await-autocomplete-test"){
            const intr = await DjsExtendedCollectors.awaitAutocompletes(client, interaction.channel, {})
            console.log(intr.commandName)
        }

        //modal submit collector's basic usage
        if(interaction.commandName === "modal-submit-collector-test"){
            const modalSubmitCollector = new DjsExtendedCollectors.ModalSubmitCollector(client, interaction.channel, {})
            modalSubmitCollector.on("collect", (intr) => {
                console.log(intr.customId)
            })
        }

        //await modal submits's basic usage
        if(interaction.commandName === "await-modal-submit-test"){
            const intr = new DjsExtendedCollectors.awaitModalSubmits(client, interaction.channel, {})
            console.log(intr.customId)
        }

        //await message reactions's basic usage
        if(interaction.commandName === "await-message-reactions"){
            const reaction = await DjsExtendedCollectors.awaitMessageReactions(client, interaction.message, {})
            console.log(reaction)
        }

        //message reaction collector's basic usage
        if(interaction.commandName === "reaction-collector"){
            const collector = new DjsExtendedCollectors.MessageReactionCollector(client, interaction.message, {})
            collector.on("collect", (reaction, user) => {
                console.log(reaction)
                console.log(user)
            })
        }
    }
})
client.on("messageCreate", async(m) => {
    //Message Collector.
    if(m.content === "message-collector-test"){
        const testMessage = await m.channel.send("collected last message: any")
        const collector = new DjsExtendedCollectors.MessageCollector(client, message.channel, {
            time: 30000,
            collectFilter: (message) => {
                return message.content.includes("collector")
            },//now it will only be included if there is a "collector" in the content of the message
            disposeFilter: (msg) => {
                return msg.content.includes("async-collector")
            },//Messages with "async-collector" will no longer be included when they are deleted
            updateFilter: (oldMsg, newMsg) => {
                return newMsg.author == m.author
            }//now only the message author's messages will be captured
        })
        collector.on("collect", (item) => {
            testMessage.edit("collected last message: " + item.content)
        })
        collector.on("update", (oldMessage, newMessage) => {
            testMessage.edit(oldMessage.content + " is edited to " + newMessage.content)
        })
    }

    //awaitMessages
    if(m.content === "await-message"){
        const intr = new DjsExtendedCollectors.awaitMessages(client, message.channel, {
            time: 30000,
            collectFilter: (message) => {
                return message.content.includes("collector")
            },//now it will only be included if there is a "collector" in the content of the message
            updateFilter: (oldMsg, newMsg) => {
                return newMsg.author == m.author
            }//now only the message author's messages will be captured
        })
        console.log(intr.content)
    }
})



client.login("your bot's token")
```


# Contact and Support

<a href="https://discord.com/users/586995957695119477">Discord</a>
