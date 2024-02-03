import { Client, Message, MessageComponentInteraction } from "discord.js";
import MessageComponentCollector from"../Classes/MessageComponentCollector.js";
import { BaseAsyncCollectorOptions } from "../interfaces/BaseAsyncCollectorOptions.js";





const awaitMessageComponents = async(client: Client, message: Message, options: BaseAsyncCollectorOptions<[messageComponentIntr: MessageComponentInteraction]>) => {
    return await new Promise<MessageComponentInteraction>((resolve, reject) => {
        const componentCollector = new MessageComponentCollector(client, message, {
            max: 1,
            time: options.time,
            idleTime: options.time,
            collectFilter: options.collectFilter
        })
        componentCollector.onceAsync("collect").then(([componentItem]) => {
            if(componentItem){
                 return resolve(componentItem)
            } else {
                 reject(undefined)
            }
            componentCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitMessageComponents