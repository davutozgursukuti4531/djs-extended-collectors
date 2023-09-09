import { BaseAsyncCollectorOptions, Client, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import MessageReactionCollector from"../Classes/MessageReactionCollector.js";




const awaitMessageReactions = async(client: Client, message: Message, options: BaseAsyncCollectorOptions<[reaction: MessageReaction | PartialMessageReaction, user: PartialUser | User]>) => {
	return await new Promise((resolve, reject) => {
	    const reactionCollector = new MessageReactionCollector(client, message, {
		    max: 1,
		    time: options.time,
			idleTime: options.time,
		    collectFilter: options.collectFilter
	    })
	    reactionCollector.on("collect", (reactionItem, userItem) => {
	    	if(reactionItem && userItem){
                return resolve([reactionItem, userItem])
	    	} else {
                 reject(undefined)
	    	}
	    	reactionCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitMessageReactions