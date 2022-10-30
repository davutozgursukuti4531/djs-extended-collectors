 djs-extended-collectors

# NOT:
- You can write your suggestions on Discord.
- Async Collectors is coming soon.


# Why djs-extended-collectors?
- TypeScript Support(Full).
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
- Base Collector(this is a base)

# 1.2.0
- fixed bugges
- removed discord.js version controller

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
        //application command collector
        if(interaction.commandName === "basic-yes-no"){
            const cmdCollector = new DjsExtendedCollectors.ApplicationCommandCollector(client, interaction.channel, {
                filter: (int) => {
                    int.user.id === interaction.user.id
                },
                disposeFilter: (int) => {
                    int.commandName === "test"
                }
            })
            cmdCollector.on("collect", (intr) => {
                if(intr.commandName === "yes"){
                    console.log(`${intr.user.username} say yes`)
                }
                if(intr.commandName === "no"){
                    console.log(`${intr.user.username} say no`)
                }
            })
        }
    }
})
//Message Collector.
client.on("messageCreate", async(m) => {
    if(m.content === "sync-message-collector"){
        const testMessage = await m.channel.send("collected last message: any")
        const collector = new DjsExtendedCollectors.MessageCollector(client, message.channel, {
            time: 30000
        })
        collector.on("collect", (item) => {
            testMessage.edit("collected last message: " + item.content)
        })
        collector.on("update", (oldMessage, newMessage) => {
            testMessage.edit(oldMessage.content + " is edited to " + newMessage.content)
        })
    }
})



client.login("your bot's token")
```


# Contact and Support

<a href="https://discord.com/users/586995957695119477">Discord</a>
