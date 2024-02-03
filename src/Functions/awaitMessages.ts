import { Client, Message, PartialMessage, TextBasedChannel } from "discord.js";
import MessageCollector from"../Classes/MessageCollector.js";
import { AsyncMessageCollectorOptions } from "../interfaces/AsyncMessageCollectorOptions";




const awaitMessages = async(client: Client, channel: TextBasedChannel, options: AsyncMessageCollectorOptions) => {
	return await new Promise<Message | PartialMessage>((resolve, reject) => {
	    const messageCollector = new MessageCollector(client, channel, {
		    max: 1,
		    time: options.time,
			idleTime: options.time,
            collectFilter: options.collectFilter,
            updateFilter: options.updateFilter
	    })
	    messageCollector.onceAsync("collect").then(([messageItem]) => {
            if(messageItem){
                return resolve(messageItem)
            } else {
                 reject(undefined)
            }
            messageCollector.stop("thisIsAsyncCollector")
        })
	})
}



export default awaitMessages