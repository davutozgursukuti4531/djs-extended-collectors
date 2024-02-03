import { AutocompleteInteraction, Client, CacheType, Guild, DMChannel, NonThreadGuildBasedChannel, ThreadChannel } from "discord.js";
import BaseCollector from"./Bases/BaseCollector.js";
import { BaseCollectorOptions } from "../interfaces/BaseCollectorOptions.js";
import { TextBasedChannel } from"discord.js"

class AutocompleteCollector extends BaseCollector<string, [autocompleteIntr: AutocompleteInteraction]>{
    channel: TextBasedChannel;
    guild: Guild | null
    constructor(client: Client, channel: TextBasedChannel, options: BaseCollectorOptions<[autocompleteIntr: AutocompleteInteraction<CacheType>]>){
        super(client, options)
        if(!channel) throw new TypeError("Channel is not defined or not valid.")
        this.channel = channel;
        //@ts-ignore
        this.guild = channel.guild ?? null
        this.client.on("interactionCreate", (interaction) => { if(interaction.isAutocomplete()){ this.handleCollect(interaction) }})
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.once("end", () => {
            this.client.off("interactionCreate", (interaction) => { if(interaction.isAutocomplete()){ this.handleCollect(interaction) }})
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
        })
    }
    public override handleCollect(autocompleteIntr: AutocompleteInteraction) {
        if(this.isEmitted("end")) return;
        if(this.timer.paused) return;
        if(autocompleteIntr.channel && this.channel.id !== autocompleteIntr.channel.id) return;
        if(this.guild && autocompleteIntr.guild && this.guild.id !== autocompleteIntr.guild.id) return;
        if(this.collectorOptions.max && this.collected.size >= this.collectorOptions.max) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(autocompleteIntr) || !this.collectorOptions.collectFilter){
            this.collected.set(autocompleteIntr.id, [autocompleteIntr])
            this.emit("collect", autocompleteIntr)
            this.idleTimer.resetTimer();
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



export default AutocompleteCollector
