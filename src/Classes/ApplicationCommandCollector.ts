import { CacheType, CommandInteraction, Guild, TextBasedChannel, ThreadChannel, DMChannel, NonThreadGuildBasedChannel, Client } from "discord.js";
import BaseCollector from"./Bases/BaseCollector.js";
import { BaseCollectorOptions } from "../interfaces/BaseCollectorOptions";

class ApplicationCommandCollector extends BaseCollector<string, [cmdIntr: CommandInteraction<CacheType>]>{ 
    channel: TextBasedChannel
    guild: Guild | null
    constructor(client: Client, channel: TextBasedChannel, options: BaseCollectorOptions<[cmdIntr: CommandInteraction<CacheType>]>){
        super(client, options)
        if(!channel) throw new TypeError("Channel is not defined or not valid.")
        this.channel = channel;
        //@ts-ignore
        this.guild = channel.guild ?? null
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
    //@ts-ignore
    public handleCollect(cmdIntr: CommandInteraction<CacheType>) {
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(cmdIntr.channel && this.channel.id !== cmdIntr.channel.id) return;
        if(this.guild && cmdIntr.guild && this.guild.id !== cmdIntr.guild.id) return;
        if(this.collectorOptions.max && this.collected.size >= this.collectorOptions.max) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(cmdIntr) || !this.collectorOptions.collectFilter){
            this.collected.set(cmdIntr.id, [cmdIntr])
            this.emit("collect", cmdIntr)
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



export default ApplicationCommandCollector
