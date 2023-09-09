import { Client, DMChannel, Guild, MessageReaction, NonThreadGuildBasedChannel, PartialMessage, PartialMessageReaction, PartialUser, TextBasedChannel, ThreadChannel, User } from "discord.js";
import BaseCollector from"./Bases/BaseCollector.js";
import { Collection, Message } from"discord.js"
import { MessageReactionCollectorEvents } from "../interfaces/MessageReactionCollectorEvents.js";
import { MessageReactionCollectorOptions } from "../interfaces/MessageReactionCollectorOptions.js";

class MessageReactionCollector extends BaseCollector<string, [reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser], MessageReactionCollectorEvents>{
    message: Message
    channel: TextBasedChannel
    guild: Guild | null
    users: Collection<string, User | PartialUser>
    //@ts-ignore
    collectorOptions: MessageReactionCollectorOptions
    constructor(client: Client, message: Message, options: MessageReactionCollectorOptions){
        super(client, options)
        if(!message) throw new TypeError("Message is not defined or not valid.");
        this.message = message
        this.channel = message.channel;
        this.guild = message.guild ?? null
        this.users = new Collection()
        this.client.on("messageReactionAdd", (reaction, user) => this.handleCollect(reaction, user))
        this.client.on("messageReactionRemove", (reaction, user) => this.handleDispose(reaction, user))
        this.client.on("messageReactionRemoveAll", (message) => {if(message.id === this.message.id) this.users.clear(); this.collected.clear(); })
        this.client.on("messageReactionRemoveEmoji", (reaction) => this.handleReactionEmojiRemove(reaction))
        this.client.on("messageDelete", (m) => this.handleMessageDeletion(m))
        this.client.on("messageDeleteBulk", (messages) => {for(const [k, m] of messages) this.handleMessageDeletion(m)})
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.once("end", () => {
            this.client.off("messageReactionAdd", (reaction, user) => this.handleCollect(reaction, user))
            this.client.off("messageReactionRemove", (reaction, user) => this.handleDispose(reaction, user))
            this.client.off("messageReactionRemoveAll", (message) => {if(message.id === this.message.id) this.users.clear(); this.collected.clear(); })
            this.client.off("messageReactionRemoveEmoji", (reaction) => this.handleReactionEmojiRemove(reaction))
            this.client.off("messageDelete", (m) => this.handleMessageDeletion(m))
            this.client.off("messageDeleteBulk", (messages) => {for(const [k, m] of messages) this.handleMessageDeletion(m)})
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
        })
    }
    //@ts-ignore
    public handleCollect(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser){
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(reaction.message.id !== this.message.id) return;
        if(this.collectorOptions.max && this.collected.size >= this.collectorOptions.max) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(reaction, user) || !this.collectorOptions.collectFilter){
            //@ts-ignore
            this.collected.set(reaction.emoji.id, [reaction, user])
            this.users.set(user.id, user)
            this.emit("collect", reaction, user)
            this.idleTimer.resetTimer();
        }
    }
    public handleReactionEmojiRemove(reaction: MessageReaction | PartialMessageReaction){
        if(this.ended) return;
        if(this.timer.paused) return;
        if(reaction.message.id !== this.message.id) return;
        if(this.collectorOptions.removeFilter && this.collectorOptions.removeFilter(reaction) || !this.collectorOptions.removeFilter){
            //@ts-ignore
            this.collected.delete(reaction.emoji.id)
            this.emit("remove", reaction)
            this.idleTimer.resetTimer();
        }
    }
    //@ts-ignore
    public handleDispose(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser){
        if(this.ended) return;
        if(this.timer.paused) return;
        if(reaction.message.id !== this.message.id) return;
        if(!this.collectorOptions.dispose) return;
        if(this.collectorOptions.disposeFilter && this.collectorOptions.disposeFilter(reaction, user) || !this.collectorOptions.disposeFilter){
            //@ts-ignore
            this.collected.delete(reaction.emoji.id)
            this.users.delete(user.id)
            this.emit("dispose", reaction, user)
            this.idleTimer.resetTimer();
        }
    }
    private handleMessageDeletion(message: Message | PartialMessage){
        if(this.message.id === message.id) this.stop("messageDelete")
    }
    private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel){
        if(this.message.channel.id === channel.id) this.stop("channelDelete")
    }
    private handleGuildDeletion(guild: Guild){
        if(this.message.guild && this.message.guild.id === guild.id) this.stop("guildDelete")
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.message.channel.isThread() && this.message.channel.id === thread.id) this.stop("threadDelete")
    }
}




export default MessageReactionCollector;