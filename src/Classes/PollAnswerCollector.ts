import { Guild, ThreadChannel, DMChannel, NonThreadGuildBasedChannel, Client, Message, PartialMessage, PollAnswer, EntitlementType } from "discord.js";
import BaseCollector from"./Bases/BaseCollector";
import { BaseCollectorOptions } from "../interfaces/BaseCollectorOptions";

class PollAnswerCollector extends BaseCollector<string, [answer: PollAnswer, userId: string]>{ 
    message: Message | PartialMessage
    guild: Guild | null
    constructor(client: Client, message: Message | PartialMessage, options: BaseCollectorOptions<[answer: PollAnswer, userId: string]>){
        super(client, options)
        if(!message) throw new TypeError("Message is not defined or not valid.")
        this.message = message;
        this.guild = message.guild ?? null
        this.client.on("messagePollVoteAdd", async(answer, userId) => await this.handleCollect(answer, userId))
        this.client.on("messagePollVoteRemove", async(answer, userId) => await this.handleDispose(answer, userId))
        this.client.on("channelDelete", (channel) => this.handleChannelDeletion(channel))
        this.client.on("threadDelete", (thread) => this.handleThreadDeletion(thread))
        this.client.on("guildDelete", (guild) => this.handleGuildDeletion(guild))
        this.once("end", () => {
            this.client.off("messagePollVoteAdd", async(answer, userId) => await this.handleCollect(answer, userId))
            this.client.off("messagePollVoteRemove", async(answer, userId) => await this.handleDispose(answer, userId))
            this.client.off("channelDelete", (channel) => this.handleChannelDeletion(channel))
            this.client.off("threadDelete", (thread) => this.handleThreadDeletion(thread))
            this.client.off("guildDelete", (guild) => this.handleGuildDeletion(guild))
        })
    }
    public override async handleCollect(answer: PollAnswer, userId: string) {
        if(this.isEmitted("end")) return;
        if(this.timer.paused) return;
        if(this.message.poll?.resultsFinalized) this.stop("resultsFinalized")
        if(answer.poll.message.channel && this.message.channel.id !== answer.poll.message.channel.id) return;
        if(this.guild && answer.poll.message.guild && this.guild.id !== answer.poll.message.guild.id) return;
        if(this.collectorOptions.max && this.collected.size >= this.collectorOptions.max) return;
        if(this.collectorOptions.collectFilter && this.collectorOptions.collectFilter(answer, userId) || !this.collectorOptions.collectFilter){
            this.collected.set(String(answer.id), [answer, userId])
            this.emit("collect", answer, userId)
            this.idleTimer.resetTimer();
        }
    }
    public override async handleDispose(answer: PollAnswer, userId: string) {
        if(this.isEmitted("end")) return;
        if(this.timer.paused) return;
        if(answer.poll.message.channel && this.message.channel.id !== answer.poll.message.channel.id) return;
        if(this.guild && answer.poll.message.guild && this.guild.id !== answer.poll.message.guild.id) return;
        if(this.collectorOptions.max && this.collected.size >= this.collectorOptions.max) return;
        if(this.collectorOptions.disposeFilter && this.collectorOptions.disposeFilter(answer, userId) || !this.collectorOptions.disposeFilter){
            this.collected.delete(String(answer.id));
            this.emit("dispose", answer, userId)
            this.idleTimer.resetTimer();
        }
    }
    private handleGuildDeletion(guild: Guild){
        if(this.guild && this.guild.id === guild.id) this.stop("guildDelete")
    }
    private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel){
        if(channel.id === this.message.channel.id) this.stop("channelDelete")
    }
    private handleThreadDeletion(thread: ThreadChannel){
        if(this.message.channel.isThread() && thread.id === this.message.channel.id) this.stop("threadDelete")
    }
}



export default PollAnswerCollector
