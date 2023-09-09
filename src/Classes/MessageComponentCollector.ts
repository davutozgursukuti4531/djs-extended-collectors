import BaseCollector from"./Bases/BaseCollector.js";
import { Client, DMChannel, Guild, Message, MessageComponentInteraction, NonThreadGuildBasedChannel, PartialMessage, TextBasedChannel, ThreadChannel } from"discord.js"
import { BaseCollectorOptions } from "../interfaces/BaseCollectorOptions";

class MessageComponentCollector extends BaseCollector<string, [messageComponentIntr: MessageComponentInteraction]>{ 
    message: Message
    channel: TextBasedChannel
    guild: Guild | null
    constructor(client: Client, message: Message, options: BaseCollectorOptions<[messageComponentIntr: MessageComponentInteraction]>){
        super(client, options)
        if(!message) throw new TypeError("Message is not defined or not valid.");
        this.message = message
        this.channel = message.channel
        this.guild = message.guild ?? null
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
    //@ts-ignore
    public handleCollect(messageComponentIntr: MessageComponentInteraction) {
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(messageComponentIntr.channel && this.channel.id !== messageComponentIntr.channel.id) return;
        if(messageComponentIntr.message && messageComponentIntr.message.id !== this.message.id) return;
        if(messageComponentIntr.guild && this.guild && this.guild.id !== messageComponentIntr.guild.id) return;
        if(this.collectorOptions.max && this.collected.size >= this.collectorOptions.max) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(messageComponentIntr) || !this.collectorOptions.collectFilter){
            this.collected.set(messageComponentIntr.id, [messageComponentIntr])
            this.emit("collect", messageComponentIntr)
            this.idleTimer.resetTimer();
        }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.guild && guild.id === this.guild.id) this.stop("guildDelete")
    }
    private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel){
        if(channel.id === this.channel.id) this.stop("channelDelete")
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete")
    }
    private handleMessageDeletion(message: Message | PartialMessage){
        if(this.message.id === message.id) this.stop("messageDelete")
    }
}



export default MessageComponentCollector