import BaseCollector from"./Bases/BaseCollector";
import { Client, Channel, AutocompleteInteraction, Guild, AnyThreadChannel } from "discord.js"
import { BaseCollectorOptions } from "discord.js"


class AutocompleteCollector extends BaseCollector<string, AutocompleteInteraction>{
    constructor(client: Client, channel: Channel, options: BaseCollectorOptions<AutocompleteInteraction> = { time: Infinity }){
        super(client, options)
        this.client.on("interactionCreate", (interaction) => { if(interaction.isAutocomplete()){ this.handleCollect(interaction) }})
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.on("end", () => {
            this.client.off("interactionCreate", (interaction) => { if(interaction.isAutocomplete()){ this.handleCollect(interaction) }})
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
        })
        this.channel = channel
    }
    private handleCollect(item: AutocompleteInteraction) {
        if(this.ended) return;
        if(item.channel.id !== this.channel.id) return;
        if(item.guild && item.guild.id === this.channel.guild?.id) return;
        if(this.options.filter && this.options.filter(item) || !this.options.filter){
            if(this.options.max && this.collected.size === this.options.max) {
                this.emit("limitFulled", this.collected)
                return;
            }
            this.collected.set(item.id, item)
            this.emit("collect", item)
        }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.channel.guild){
            if(guild.id === this.channel.guild?.id){
                this.stop("guildDelete")
            }
        }
    }
    private handleChannelDeletion(channel: Channel){
        if(channel.id === this.channel.id){
            this.stop("channelDelete")
        }
    }
    private handleThreadDeletion(thread: AnyThreadChannel){
        if(this.channel.isThread() && thread.id === this.channel.id){
            this.stop("threadDelete")
        }
    }
}



export default AutocompleteCollector