import MessageReactionCollector from"../Classes/MessageReactionCollector.js";




const awaitMessageReactions = async(client, message, options) => {
	return await new Promise((resolve, reject) => {
	    const reactionCollector = new MessageReactionCollector(client, message, {
		    max: 1,
		    time: options.time,
		    collectFilter: options.collectFilter
	    })
	    reactionCollector.on("collect", (reactionItem) => {
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