import { Client, CommandInteraction, Guild, TextBasedChannel, Channel, AnyThreadChannel, CacheType } from"discord.js"
import { BaseCollectorOptions } from"../Types/Types"
import BaseCollector from "./Bases/BaseCollector"


class ApplicationCommandCollector extends BaseCollector<string, CommandInteraction>{
    channel: TextBasedChannel
    guild: Guild
    constructor(client: Client, channel: TextBasedChannel, options: BaseCollectorOptions){
        super(client, options)
        this.client.on("interactionCreate", (interaction) => { if(interaction.isCommand()){ this.handleCollect(interaction) }})
        this.client.on("channelDelete", (channel) => this.__handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.__handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.__handleGuildDeletion(guild))
        this.on("end", () => {
            this.client.off("interactionCreate", (interaction) => { if(interaction.isCommand()){ this.handleCollect(interaction) }})
            this.client.off("channelDelete", (channel) => this.__handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.__handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.__handleGuildDeletion(guild))
        })
        this.channel = channel
    }
    private handleCollect(item: CommandInteraction<CacheType>): void {
        if(this.options.filter && this.options.filter(item) || !this.options.filter){
            if(this.options.max && this.collected.size === this.options.max) {
                this.emit("limitFulled", this.collected)
                return;
            }
            this.collected.set(item.id, item)
            this.emit("collect", item)
        }
    }
    private __handleGuildDeletion(guild: Guild){
        if(this.channel.guild){
            if(guild.id === this.channel.guild?.id){
                this.stop("guildDelete")
            }
        }
    }
    private __handleChannelDeletion(channel: Channel){
        if(channel.id === this.channel.id){
            this.stop("channelDelete")
        }
    }
    private __handleThreadDeletion(thread: AnyThreadChannel){
        if(this.channel.isThread() && thread.id === this.channel.id){
            this.stop("threadDelete")
        }
    }
}



export default ApplicationCommandCollector