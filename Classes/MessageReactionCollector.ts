import BaseCollector from"./Bases/BaseCollector";
import { Channel, Client, Message, PartialMessage, Guild, MessageReaction, User, LimitedCollection, GuildEmoji, ThreadChannel, PartialMessageReaction, PartialUser, CollectorFilter } from "discord.js";
import { BaseCollectorOptions, MessageReactionCollectorEvents } from "../Types/Types"


class MessageReactionCollector extends BaseCollector<string, MessageReaction | PartialMessageReaction, MessageReactionCollectorEvents>{
    message: Message | PartialMessage
    users: LimitedCollection<string, User | PartialUser>
    constructor(client: Client, message: Message | PartialMessage, options: BaseCollectorOptions<MessageReaction | PartialMessageReaction> & { removeFilter: CollectorFilter<PartialMessageReaction[] | MessageReaction[]> }){
        super(client, options)
        this.message = message
        this.users = new LimitedCollection()
        this.client.on("messageReactionAdd", (reaction, user) => this.handleCollect(reaction, user))
        this.client.on("messageReactionRemove", (reaction, user) => this.handleDispose(reaction, user))
        this.client.on("messageReactionRemoveEmoji", (reaction) => this.handleReactionEmojiRemove(reaction))
        this.client.on("messageDelete", (m) => this.handleMessageDeletion(m))
        this.client.on("messageDeleteBulk", (messages) => messages.forEach((m) => this.handleMessageDeletion(m)))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.on("end", () => {
            this.client.on("messageReactionAdd", (reaction, user) => this.handleCollect(reaction, user))
            this.client.on("messageReactionRemove", (reaction, user) => this.handleDispose(reaction, user))
            this.client.on("messageReactionRemoveEmoji", (reaction) => this.handleReactionEmojiRemove(reaction))
            this.client.on("messageDelete", (m) => this.handleMessageDeletion(m))
            this.client.on("messageDeleteBulk", (messages) => messages.forEach((m) => this.handleMessageDeletion(m)))
            this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
            this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        })
        
    }
    private handleCollect(reaction: PartialMessageReaction | MessageReaction, user: User | PartialUser){
        if(this.ended) return;
        if(reaction.message.id !== this.message.id) return;
        if(this.options.max && this.collected.size === this.options.max || this.collected.size > this.options.max) this.emit("limitFulled", this.collected)
        if(this.options.collectFilter && this.options.collectFilter(reaction) || !this.options.collectFilter){
            this.collected.set(reaction.emoji.id, reaction)
            this.users.set(user.id, user)
            this.emit("collect", reaction, user)
        }
    }
    private handleReactionEmojiRemove(reaction: MessageReaction | PartialMessageReaction){
        if(this.ended) return;
        if(reaction.message.id !== this.message.id) return;
        if(this.options.removeFilter && this.options.removeFilter(reaction) || !this.options.removeFilter){
            this.emit("remove", reaction)
            this.collected.delete(reaction.emoji.id)
        }
    }
    private handleDispose(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser){
        if(this.ended) return;
        if(reaction.message.id !== this.message.id) return;
        if(!this.options.dispose) return;
        if(this.options.disposeFilter && this.options.disposeFilter(reaction) || !this.options.disposeFilter){
            this.collected.delete(reaction.emoji.id, reaction)
            this.users.delete(user.id)
            this.emit("dispose", reaction, user)
        }
    }
    private handleMessageDeletion(message: PartialMessage | Message){
        if(this.message.id === message.id){
            this.stop("messageDelete")
        }
    }
    private handleChannelDeletion(channel: Channel){
        if(this.message.channel.id === channel.id){
            this.stop("channelDelete")
        }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.message.guild && this.message.guild.id === guild.id){
            this.stop("guildDelete")
        }
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.message.channel.isThread() && this.message.channel.id === thread.id){
            this.stop("threadDelete")
        }
    }
}




export default MessageReactionCollector
