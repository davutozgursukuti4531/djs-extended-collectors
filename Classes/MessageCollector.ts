import { Message, PartialMessage, Guild, TextBasedChannel, AnyThreadChannel, Channel } from "discord.js";
import BaseCollector from "./Bases/BaseCollector";
import { MessageCollectorEvents } from "../Types/Types"

class MessageCollector extends BaseCollector<string, Message<boolean> | PartialMessage, MessageCollectorEvents>{
    channel: TextBasedChannel;
    constructor(client, channel: TextBasedChannel, options){
        super(client, options)
        this.channel = channel
        //listeners
        this.client.on("messageCreate", (m) => this.handleCollect(m))
        this.client.on("messageDelete", (m) => this.handleDispose(m))
        this.client.on("messageDeleteBulk", (msgs) => msgs.forEach((m) => this.handleDispose(m)))
        this.client.on("messageUpdate", (oM: Message<boolean> | PartialMessage, nM: Message<boolean> | PartialMessage) => this.__handleUpdate(oM, nM))
        this.client.on("channelDelete", (c) => this.__handleChannelDeletion(c))
        this.client.on("guildDelete", (guild) => this.__handleGuildDeletion(guild))
        this.client.on("threadDelete", (thread) => this.__handleThreadDeletion(thread))
        this.on("end", (collected) => {
            //stopping listeners
            this.client.off("messageCreate", (m) => this.handleCollect(m))
            this.client.off("messageDelete", (m) => this.handleDispose(m))
            this.client.off("messageDeleteBulk", (msgs) => msgs.forEach((m) => this.handleDispose(m)))
            this.client.off("messageUpdate", (oM: Message<boolean> | PartialMessage, nM: Message<boolean> | PartialMessage) => this.__handleUpdate(oM, nM))
            this.client.off("channelDelete", (c) => this.__handleChannelDeletion(c))
            this.client.off("guildDelete", (guild) => this.__handleGuildDeletion(guild))
            this.client.off("threadDelete", (thread) => this.__handleThreadDeletion(thread))
        })
    }
    private handleCollect(item: Message<boolean> | PartialMessage): void {
        if(this.ended) return;
        if(this.options.filter && this.options.filter(item) || !this.options.filter){
            if(this.options.max && this.collected.size === this.options.max) {
                this.emit("limitFulled", this.collected)
                return;
            }
            this.collected.set(item.id, item)
            this.emit("collect", item)
        }
    }
    private handleDispose(item: Message<boolean> | PartialMessage): void {
        if(this.ended) return;
        if(this.options.dispose){
            if(this.options.disposeFilter && this.options.disposeFilter(item) || !this.options.disposeFilter){
                this.collected.delete(item.id)
                this.emit("dispose", item)
            }
        }
    }
    private __handleUpdate(oldItem: Message<boolean> | PartialMessage, newItem: Message<boolean>| PartialMessage){
        if(this.ended) return;
        if(this.options.updateFilter && this.options.updateFilter(oldItem, newItem) || !this.options.updateFilter) {
        if(this.collected.has(oldItem.id)){
            this.collected.delete(oldItem.id)
            this.collected.set(newItem.id, newItem)
            this.emit("update", oldItem, newItem)
        } else {
            this.handleCollect(newItem)
        }
      }
    }
    private __handleThreadDeletion(thread: AnyThreadChannel){
        if(thread.isTextBased()){
            if(this.channel.id === thread.id){
                this.stop("threadDelete")
            }
        }
    }
    private __handleChannelDeletion(channel: Channel){
        if(channel.isTextBased()){
            if(channel.id === this.channel.id){
                this.stop("channelDelete")
            }
        }
    }
    private __handleGuildDeletion(guild: Guild){
        if(this.channel.guild && this.channel.guild?.id === guild.id){
            this.stop("guildDelete")
        }
    }
}

export default MessageCollector
