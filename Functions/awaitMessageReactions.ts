import MessageReactionCollector from"../Classes/MessageReactionCollector";
import { MessageReaction, Client, Message, PartialMessage, PartialMessageReaction } from "discord.js"
import { AsyncMessageReactionCollectorOptions } from "../Types/Types"




const awaitMessageReactions = async(client: Client, message: Message | PartialMessage, options: AsyncMessageReactionCollectorOptions) => {
	return await new Promise<MessageReaction | PartialMessageReaction>((resolve, reject) => {
	    const reactionCollector = new MessageReactionCollector(client, message, {
		    max: 1,
		    time: options.time,
		    collectFilter: options.collectFilter
	    })
	    reactionCollector.on("collect", (reactionItem, userItem) => {
	    	if(reactionItem !== undefined){
                 resolve(reactionItem)
	    	} else {
                 reject(undefined)
	    	}
	    	reactionCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitMessageReactions
