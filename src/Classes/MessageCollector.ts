import BaseCollector from"./Bases/BaseCollector";
import { MessageCollectorEvents } from "../interfaces/MessageCollectorEvents";
import { Client, DMChannel, Guild, Message, NonThreadGuildBasedChannel, PartialMessage, TextBasedChannel, ThreadChannel } from"discord.js"
import { MessageCollectorOptions } from "../interfaces/MessageCollectorOptions";

class MessageCollector extends BaseCollector<string, [message: Message | PartialMessage], MessageCollectorEvents>{
    channel: TextBasedChannel
    guild: Guild | null
    //@ts-ignore
    collectorOptions: MessageCollectorOptions
    constructor(client: Client, channel: TextBasedChannel, options: MessageCollectorOptions){
        super(client, options)
        if(!channel) throw new TypeError("Channel is not defined or not valid.")
        this.channel = channel;
        //@ts-ignore
        this.guild = channel.guild ?? null
        //listeners
        this.client.on("messageCreate", (m) => this.handleCollect(m))
        this.client.on("messageDelete", (m) => this.handleDispose(m))
        this.client.on("messageDeleteBulk", (msgs) => { for(const [k, m] of msgs) this.handleDispose(m) })
        this.client.on("messageUpdate", (oM, nM) => this.handleUpdate(oM, nM))
        this.client.on("channelDelete", (c) => this.handleChannelDeletion(c))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))

        this.once("end", (collected) => {
            //stopping listeners
            this.client.off("messageCreate", (m) => this.handleCollect(m))
            this.client.off("messageDelete", (m) => this.handleDispose(m))
            this.client.off("messageDeleteBulk", (msgs) => { for(const [k, m] of msgs) this.handleDispose(m) })
            this.client.off("messageUpdate", (oM, nM) => this.handleUpdate(oM, nM))
            this.client.off("channelDelete", (c) => this.handleChannelDeletion(c))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
        })
    }
    //@ts-ignore
    handleCollect(message: Message | PartialMessage) {
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(this.channel.id !== message.channel.id) return;
        if(message.guild && this.guild && this.guild.id !== message.guild.id) return;
        if(this.collectorOptions.max && (this.collected.size >= this.collectorOptions.max)) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(message) || !this.collectorOptions.collectFilter){
            this.collected.set(message.id, [message])
            this.emit("collect", message)
            this.idleTimer.resetTimer();
        }
    }
    //@ts-ignore
    handleDispose(message: Message | PartialMessage) {
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(this.channel.id !== message.channel.id) return;
        if(message.guild && this.guild && this.guild.id !== message.guild.id) return;
        if(!this.collectorOptions.dispose) return;
        if(this.collectorOptions.disposeFilter && this.collectorOptions.disposeFilter(message) || !this.collectorOptions.disposeFilter){
            this.collected.delete(message.id)
            this.emit("dispose", message)
            this.idleTimer.resetTimer();
        }
    }
    handleUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage){
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(newMessage.channel.id !== this.channel.id) return;
        if(newMessage.guild && this.guild && newMessage.guild.id === this.guild.id) return;
        if(this.collectorOptions.updateFilter && this.collectorOptions.updateFilter(oldMessage, newMessage) || !this.collectorOptions.updateFilter){
        if(this.collected.has(oldMessage.id)){
            this.collected.delete(oldMessage.id)
            this.collected.set(oldMessage.id, [newMessage])
            this.emit("update", oldMessage, newMessage)
        }
      }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.guild && this.guild.id === guild.id) this.stop("guildDelete")
    }
    private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel){
        if(channel.id === this.channel.id) this.stop("channelDelete")
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete")
    }
}

export default MessageCollector
