import MessageCollector from"../Classes/MessageCollector";
import { Message, PartialMessage, CollectorFilter } from "discord.js";
import { BaseAsyncCollectorOptions } from "../Types/Types"




const awaitMessages = async(client, channel, options: BaseAsyncCollectorOptions<Message | PartialMessage> & { updateFilter?: CollectorFilter<Message[] | PartialMessage[]> }): Promise<Message | PartialMessage> => {
	return await new Promise<Message | PartialMessage>((resolve, reject) => {
	    const messageCollector = new MessageCollector(client, channel, {
		    max: 1,
		    time: options.time,
            collectFilter: options.collectFilter,
            updateFilter: options.updateFilter
	    })
	    messageCollector.on("collect", (msgItem) => {
	    	if(msgItem !== undefined){
                 resolve(msgItem)
	    	} else {
                 reject(undefined)
	    	}
		messageCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitMessages
