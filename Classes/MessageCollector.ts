import BaseCollector from"./Bases/BaseCollector";
import { Channel, Client, Message, PartialMessage, Guild, ThreadChannel } from "discord.js";
import { MessageCollectorEvents, MessageCollectorOptions } from "../Types/Types"
import CollectorTimer from "./Bases/CollectorTimer";

class MessageCollector extends BaseCollector<string, Message | PartialMessage, MessageCollectorEvents>{
    channel: Channel;
    guild: Guild | null
    private timer: CollectorTimer
    constructor(client: Client, channel: Channel, options: MessageCollectorOptions = { time: Infinity }){
        super(client, options)
        this.channel = channel
        this.guild = this.channel.guild
        //listeners
        this.client.on("messageCreate", (m) => this.handleCollect(m))
        this.client.on("messageDelete", (m) => this.handleDispose(m))
        this.client.on("messageDeleteBulk", (msgs) => msgs.forEach((m) => this.handleDispose(m)))
        this.client.on("messageUpdate", (oM, nM) => this.handleUpdate(oM, nM))
        this.client.on("channelDelete", (c) => this.handleChannelDeletion(c))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.on("end", (collected) => {
            //stopping listeners
            this.client.off("messageCreate", (m) => this.handleCollect(m))
            this.client.off("messageDelete", (m) => this.handleDispose(m))
            this.client.off("messageDeleteBulk", (msgs) => msgs.forEach((m) => this.handleDispose(m)))
            this.client.off("messageUpdate", (oM, nM) => this.handleUpdate(oM, nM))
            this.client.off("channelDelete", (c) => this.handleChannelDeletion(c))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
        })
    }
    private handleCollect(item: Message | PartialMessage) {
        if(this.ended) return;
        if(this.channel.id !== item.channel.id) return;
        if(item.guild && this.guild.id !== item.guild.id) return;
        if(this.options.max && this.collected.size === this.options.max || this.collected.size > this.options.max) this.emit("limitFulled", this.collected)
        if(this.options.collectFilter && this.options.collectFilter(item) || !this.options.collectFilter){
            this.collected.set(item.id, item)
            this.emit("collect", item)
        }
    }
    private handleDispose(item: Message | PartialMessage) {
        if(this.ended) return;
        if(this.channel.id !== item.channel.id) return;
        if(item.guild && this.guild.id !== item.guild.id) return;
        if(!this.options.dispose) return;
        if(this.options.collectFilter && this.options.collectFilter(item) || !this.options.collectFilter){
            this.collected.delete(item.id)
            this.emit("dispose", item)
        }
    }
    private handleUpdate(oldItem: Message | PartialMessage, newItem: Message | PartialMessage){
        if(this.ended) return;
        if(newItem.channel.id !== this.channel.id) return;
        if(newItem.guild && newItem.guild.id === this.channel.guild?.id) return;
        if(this.options.updateFilter && this.options.updateFilter(oldItem, newItem) || !this.options.updateFilter){
        if(this.collected.has(oldItem.id)){
            this.collected.delete(oldItem.id)
            this.collected.set(newItem.id, newItem)
            this.emit("update", oldItem, newItem)
        }
      }
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.channel.isThread() && this.channel.id === thread.id){
            this.stop("threadDelete")
        }
    }
    private handleChannelDeletion(channel: Channel){
        if(channel.isTextBased()){
            if(channel.id === this.channel.id){
                this.stop("channelDelete")
            }
        }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.channel.guild && this.channel.guild?.id === guild.id){
            this.stop("guildDelete")
        }
    }
}

export default MessageCollector
