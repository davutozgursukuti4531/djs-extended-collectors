import { BaseCollectorOptions } from "../interfaces/BaseCollectorOptions.js";
import BaseCollector from"./Bases/BaseCollector.js";
import { Client, CommandInteraction, DMChannel, Guild, MessageComponentInteraction, ModalSubmitInteraction, NonThreadGuildBasedChannel, TextBasedChannel, ThreadChannel } from"discord.js"

class ModalSubmitCollector extends BaseCollector<string, [modalSubmitInteraction: ModalSubmitInteraction]>{
    interaction: MessageComponentInteraction | CommandInteraction
    guild: Guild | null
    channel: TextBasedChannel | null
    constructor(client: Client, interaction: MessageComponentInteraction | CommandInteraction, options: BaseCollectorOptions<[modalSubmitInteraction: ModalSubmitInteraction]> = { time: Infinity }){
        super(client, options)
        if(!interaction) throw new TypeError("Interaction is not defined or not valid.")
        this.interaction = interaction
        this.guild = interaction.guild
        this.channel = interaction.channel
        this.client.on("interactionCreate", (intr) => { if(intr.isModalSubmit()){ this.handleCollect(intr) }})
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.once("end", () => {
            this.client.off("interactionCreate", (intr) => { if(intr.isModalSubmit()){ this.handleCollect(intr) }})
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
        })
    }
    //@ts-ignore
    public handleCollect(modalSubmitInteraction: ModalSubmitInteraction) {
        if(this.emitted("end")) return;
        if(this.timer.paused) return;
        if(modalSubmitInteraction.channel && this.channel && this.channel.id !== modalSubmitInteraction.channel.id) return;
        if(modalSubmitInteraction.guild && this.guild && this.guild.id !== modalSubmitInteraction.guild.id) return;
        if(this.collectorOptions.max && (this.collected.size >= this.collectorOptions.max)) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(modalSubmitInteraction) || !this.collectorOptions.collectFilter){
            this.collected.set(modalSubmitInteraction.id, [modalSubmitInteraction])
            this.emit("collect", modalSubmitInteraction)
            this.idleTimer.resetTimer();
        }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.guild && this.guild.id === guild.id) this.stop("guildDelete")
    }
    private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel){
        if(this.channel && channel.id === this.channel.id) this.stop("channelDelete")
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.channel && this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete")
    }
}



export default ModalSubmitCollector
