import BaseCollector from"./Bases/BaseCollector.js";
import CollectorError from "./Errors/CollectorError.js";
import VersionError from "./Errors/VersionError.js";
const { TextChannel, VoiceChannel } = await import("discord.js").catch((e) => new VersionError(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {type: "InvalidVersion" })).then((v) => v);
 

class ApplicationCommandCollector extends BaseCollector{ 
    constructor(client, channel, options = { time: Infinity }){
        super(client, options)
        (!channel || !(channel instanceof TextChannel) || (!channel instanceof VoiceChannel)) ? new CollectorError("Channel is not defined or not valid.", {
            type: "TypeError"
        }).throw() : this.channel = channel;
        this.guild = channel.guild ? channel.guild : null
        this.client.on("interactionCreate", (interaction) => { if(interaction.isCommand()){ this.handleCollect(interaction) }})
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.once("end", () => {
            this.client.off("interactionCreate", (interaction) => { if(interaction.isCommand()){ this.handleCollect(interaction) }})
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
        })
    }
    handleCollect(item) {
        if(this.ended) return;
        if(this.timer.paused) return;
        if(item.channel && this.channel.id !== item.channel.id) return;
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
        if(this.guild && this.guild.id === guild.id) this.stop("guildDelete")
    }
    handleChannelDeletion(channel){
        if(channel.id === this.channel.id) this.stop("channelDelete")
    }
    handleThreadDeletion(thread){
        if(this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete")
    }
}



export default ApplicationCommandCollector
