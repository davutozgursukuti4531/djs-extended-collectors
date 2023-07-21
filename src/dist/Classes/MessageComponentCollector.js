import BaseCollector from"./Bases/BaseCollector.js";
const { Message } = await import("discord.js").catch((e) => new VersionError(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {type: "UnvalidVersion" }));
import CollectorError from "./Errors/CollectorError.js";
import VersionError from "./Errors/VersionError.js";

class MessageComponentCollector extends BaseCollector{ 
    
    constructor(client, message, options = { time: Infinity }){
        super(client, options)
        (channel === undefined || !(message instanceof Message)) ? new CollectorError("Message is not defined or not valid.", {
            type: "TypeError"
        }) : this.message = message;
        this.channel = message.channel
        this.guild = this.channel.guild ? this.channel.guild : null
        this.client.on("messageDelete", (message) => this.handleMessageDeletion(message))
        this.client.on("interactionCreate", (interaction) => { if(interaction.isMessageComponent()){ this.handleCollect(interaction) }})
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.once("end", () => {
            this.client.off("messageDelete", (message) => this.handleMessageDeletion(message))
            this.client.off("interactionCreate", (interaction) => { if(interaction.isMessageComponent()){ this.handleCollect(interaction) }})
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
        })
    }
    handleCollect(item) {
        if(this.ended) return;
        if(item.channel && this.channel.id !== item.channel.id) return;
        if(item.message && item.message.id !== this.message.id) return;
        if(item.guild && this.guild.id !== item.guild.id) return;
        if(this.options.max && this.collected.size === this.options.max || this.options.max && this.collected.size > this.options.max) this.emit("limitFulled", this.collected)
        if(this.options.collectFilter && this.options.collectFilter(item) || !this.options.collectFilter){
            if(this.emitted("limitFulled")) return;
            this.collected.set(item.id, item)
            this.emit("collect", item)
            this.idleTimer.resetTimer();
        }
    }
    handleGuildDeletion(guild){
        if(this.channel.guild && guild.id === this.guild?.id) this.stop("guildDelete")
    }
    handleChannelDeletion(channel){
        if(channel.id === this.channel.id) this.stop("channelDelete")
    }
    handleThreadDeletion(thread){
        if(this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete")
    }
    handleMessageDeletion(message){
        if(this.message.id === message.id) this.stop("messageDelete")
    }
}



export default MessageComponentCollector