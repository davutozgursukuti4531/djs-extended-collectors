import Discord from "discord.js";
import BaseCollector from"./Classes/Bases/BaseCollector.js";
import ApplicationCommandCollector from"./Classes/ApplicationCommandCollector.js";
import AutocompleteCollector from"./Classes/AutocompleteCollector.js";
import MessageCollector from"./Classes/MessageCollector.js";
import ModalSubmitCollector from"./Classes/ModalSubmitCollector.js";
import MessageReactionCollector from"./Classes/MessageReactionCollector.js"
import awaitMessages from"./Functions/awaitMessages.js";
import awaitModalSubmits from"./Functions/awaitModalSubmits.js";
import awaitAutocompletes from"./Functions/awaitAutocompletes.js";
import awaitApplicationCommands from"./Functions/awaitApplicationCommands.js";
import awaitMessageReactions from"./Functions/awaitMessageReactions.js"
import versionControl from"./Utils/versionControl.js";
import djsVersionControl from"./Utils/djsVersionControl.js";
import CollectorTimer from"./Classes/Bases/CollectorTimer.js";
import Colorizer from"string-colorizer";
import MessageComponentCollector from "./Classes/MessageComponentCollector.js";
import awaitMessageComponents from "./Functions/awaitMessageComponents.js";
const colorizer = new Colorizer()



Discord.TextChannel.prototype.createApplicationCommandCollector = function(options){
    return new ApplicationCommandCollector(this.client, this, options)
};
Discord.TextChannel.prototype.awaitApplicationCommands = async function(options){
    return await awaitApplicationCommands(this.client, this, options)
};
Discord.TextChannel.prototype.createApplicationCommandCollector = function(options){
    return new AutocompleteCollector(this.client, this, options)
};
Discord.TextChannel.prototype.awaitApplicationCommands = async function(options){
    return await awaitAutocompletes(this.client, this, options)
};
Discord.TextChannel.prototype.createExtendedMessageCollector = function(options){
    return new MessageCollector(this.client, this, options)
};
Discord.TextChannel.prototype.extendedAwaitMessages = async function(options){
    return await awaitMessages(this.client, this, options)
};
Discord.VoiceChannel.prototype.createApplicationCommandCollector = function(options){
    return new ApplicationCommandCollector(this.client, this, options)
};
Discord.VoiceChannel.prototype.awaitApplicationCommands = async function(options){
    return await awaitApplicationCommands(this.client, this, options)
};
Discord.VoiceChannel.prototype.createApplicationCommandCollector = function(options){
    return new AutocompleteCollector(this.client, this, options)
};
Discord.VoiceChannel.prototype.awaitApplicationCommands = async function(options){
    return await awaitAutocompletes(this.client, this, options)
};
Discord.VoiceChannel.prototype.createExtendedMessageCollector = function(options){
    return new MessageCollector(this.client, this, options)
};
Discord.VoiceChannel.prototype.extendedAwaitMessages = async function(options){
    return await awaitMessages(this.client, this, options)
};
Discord.Message.prototype.createMessageReactionCollector = function(options){
    return new MessageReactionCollector(this.client, this, options);
}
Discord.Message.prototype.awaitMessageReactions = async function(options){
    return await awaitMessageReactions(this.client, this, options)
}
Discord.Message.prototype.createExtendedMessageComponentCollector = function(options){
    return new MessageComponentCollector(this.client, this, options)
};
Discord.Message.prototype.extendedAwaitMessageComponents = async function(options){
    return await awaitMessageComponents(this.client, this, options)
};
Discord.CommandInteraction.prototype.createModalSubmitCollector = function(options){
    return new ModalSubmitCollector(this.client, this.channel, options);
}
Discord.CommandInteraction.prototype.extendedAwaitModalSubmits = async function(options){
    return await awaitModalSubmits(this.client, this.channel, options);
}
Discord.MessageComponentInteraction.prototype.createModalSubmitCollector = function(options){
    return new ModalSubmitCollector(this.client, this.channel, options);
}
Discord.MessageComponentInteraction.prototype.extendedAwaitModalSubmits = async function(options){
    return await awaitModalSubmits(this.client, this.channel, options);
}


versionControl(colorizer.styles.bright(colorizer.foregroundColors.red("The version of this Module is out of date. To update it: npm i djs-extended-collectors@latest")))
djsVersionControl(colorizer.styles.bright(colorizer.foregroundColors.red("The version of Discord.js is not 14, To update it: npm i discord.js@latest")))
export { BaseCollector, ApplicationCommandCollector, AutocompleteCollector, MessageCollector, ModalSubmitCollector, MessageReactionCollector, awaitAutocompletes, awaitApplicationCommands, awaitMessages, awaitModalSubmits, CollectorTimer, awaitMessageReactions }