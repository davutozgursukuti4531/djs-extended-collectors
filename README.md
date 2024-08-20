# djs-extended-collectors

- Enhanced Collector Module for Discord.js

![Image](https://img.shields.io/npm/dt/djs-extended-collectors.svg?color=%2351FC0&maxAge=3600)
![Image](https://img.shields.io/npm/v/djs-extended-collectors?color=red&label=djs-extended-collectors)

# NOTE:
- You can write your suggestions on Discord.


# Why djs-extended-collectors?
- TypeScript Support(Full).
- UMD, CJS and ESM Build
- More Collectors.
- Extended Discord.js Collectors.
- Useful & Basic.

# Not:
- Discord.js v14 or newer required

# Dependencies:
- @chocolatemilkdev/emitter: 1.0.7

# Collectors
- ApplicationCommandCollector
- AutocompleteCollector
- BaseCollector(you can make your custom collector with this)
- MessageCollector
- MessageComponentCollector
- MessageReactionCollector
- ModalSubmitCollector
- PollAnswerCollector

# Async Collectors
- awaitApplicationCommands
- awaitAutoCompletes
- awaitMessages
- awaitModalSubmits
- awaitMessageComponents
- awaitMessageReactions
- awaitPollAnswers

# 3.3.0

- added PollAnswerCollector/awaitPollAnswers.

# Usage
```js
import * as DjsExtendedCollectors from "djs-extended-collectors"//on esm & ts.
/*
* on commonjs
* const DjsExtendedCollectors = require("djs-extended-collectors")
*/

const client = new Discord.Client({
    intents: [Object.values(Intents)]//activate all intents
})


client.on("interactionCreate", async(interaction) => {
    if(interaction.isCommand() && interaction.commandName === "yes-or-no"){
        const collector = new DjsExtendedCollectors.ApplicationCommandCollector(client, interaction.channel, {
            time: 5000,
            idleTime: 10000,
            collectFilter: (interaction) => {
                return interaction.commandName === "yes" || interaction.commandName === "no"
            }
        })
        collector.on("collect", (intr) => {
            if(intr.commandName === "yes"){
                intr.reply("you say yes :)")
            }
        })
    }
})



client.login("your bot's token")
```
- This module is support to you create your custom Collector and typing with [TypeScript](https://www.typescriptlang.org/).
```ts
import { BaseCollector, BaseCollectorOptions, TextBasedChannel } from "djs-extended-collectors";
import { Client, Channel } from "discord.js"


interface MyCollectorEvents extends BaseCollectorEvents<[msg: Message]>{
   event(msg: Message): any;
};
class MyCollector extends BaseCollector<string, [msg: Message], MyCollectorEvents>{
    channel: TextBasedChannel
    constructor(client: Client, channel: Channel, options: BaseCollectorOptions<[msg: Message]>){
        super(client, options)
        this.channel = channel

        this.client.on("messageCreate", (msg) => this.handleCollect(msg))
    }
    handleCollect(msg: Message){
        if(msg.channel.id !== this.channel.id) return;
        this.collected.set(msg.id, [msg])
        this.emit("collect", msg)
    }
}
```


# Contact and Support

<a href="https://discord.com/users/586995957695119477">Discord</a>
