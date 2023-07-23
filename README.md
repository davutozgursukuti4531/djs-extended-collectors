# djs-extended-collectors

- Enhanced Collector Module for Discord.js

![Image](https://img.shields.io/npm/dt/djs-extended-collectors.svg?color=%2351FC0&maxAge=3600)
![Image](https://img.shields.io/npm/v/djs-extended-collectors?color=red&label=djs-extended-collectors)

# NOTE:
- You can write your suggestions on Discord.


# Why djs-extended-collectors?
- TypeScript Support(Full).
- ESM(ES Module) Support(Full).
- Optimized on ESM, CJS and TS
- More Collectors.
- Extended Discord.js Collectors.
- Useful & Basic.

# Not:
- Discord.js v14 or newer required

# Dependencies:
- string-colorizer: 1.0.4
- @wumpjs/utils: 1.0.1

# Classes
- ApplicationCommandCollector
- AutocompleteCollector
- BaseCollector(you can make your custom collector with this)
- MessageCollector
- MessageComponentCollector
- MessageReactionCollector
- ModalSubmitCollector

# Functions
- awaitApplicationCommands
- awaitAutoCompletes
- awaitMessages
- awaitModalSubmits
- awaitMessageComponents
- awaitMessageReactions

# 3.0.0

- module is recoded.
- added ESM support(full).
- more optimized.
- more open source.
- better typing.
- bug fix.

# Usage

## Usage
```js
import * as DjsExtendedCollectors from "djs-extended-collectors"//on esm.
/*
* on commonjs
* const DjsExtendedCollectors = require("djs-extended-collectors")
*/

const client = new Discord.Client({
    intents: [Object.values(Intents)]//activate all intents
})


//Interaction Collectors.
client.on("interactionCreate", async(interaction) => {
    if(interaction.isCommand() && interaction.commandName === "yes-or-no"){
        const collector = interaction.channel.createApplicationCommandCollector(options)//or: new DjsExtendedCollectors.ApplicationCommandCollector(client, interaction.channel, options)
        collector.on("collect", (intr) => {
            if(intr.commandName === "yes"){
                intr.reply("you say yes :)")
            }
        })
    }
})



client.login("your bot's token")
```


# Contact and Support

<a href="https://discord.com/users/586995957695119477">Discord</a>
