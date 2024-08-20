import { Client, Message, PartialMessage, PollAnswer } from "discord.js";
import PollAnswerCollector from"../Classes/PollAnswerCollector.js";
import { BaseAsyncCollectorOptions } from "../interfaces/BaseAsyncCollectorOptions.js";





const awaitModalSubmits = async(client: Client, message: Message | PartialMessage, options: BaseAsyncCollectorOptions<[answer: PollAnswer, userId: string]>) => {
    return await new Promise<[PollAnswer, string]>((resolve, reject) => {
        const voteAnswerCollector = new PollAnswerCollector(client, message, {
            max: 1,
            time: options.time,
            idleTime: options.time,
            collectFilter: options.collectFilter
        })
        voteAnswerCollector.onceAsync("collect").then(([answer, userId]) => {
            if(answer){
                return resolve([answer, userId])
            } else {
                 reject(undefined)
            }
            voteAnswerCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitModalSubmits
