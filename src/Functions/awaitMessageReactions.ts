import { Client, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import MessageReactionCollector from"../Classes/MessageReactionCollector.js";
import { BaseAsyncCollectorOptions } from "../interfaces/BaseAsyncCollectorOptions.js";




const awaitMessageReactions = async(client: Client, message: Message, options: BaseAsyncCollectorOptions<[reaction: MessageReaction | PartialMessageReaction, user: PartialUser | User]>) => {
	return await new Promise<[reaction: MessageReaction | PartialMessageReaction, user: PartialUser | User]>((resolve, reject) => {
	    const reactionCollector = new MessageReactionCollector(client, message, {
		    max: 1,
		    time: options.time,
			idleTime: options.time,
		    collectFilter: options.collectFilter
	    })
	    reactionCollector.onceAsync("collect").then(([reactionItem, userItem]) => {
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