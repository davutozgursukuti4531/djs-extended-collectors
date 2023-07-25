import MessageCollector from"../Classes/MessageCollector.js";




const awaitMessages = async(client, channel, options) => {
	return await new Promise((resolve, reject) => {
	    const messageCollector = new MessageCollector(client, channel, {
		    max: 1,
		    time: options.time,
            collectFilter: options.collectFilter,
            updateFilter: options.updateFilter
	    })
	    messageCollector.on("collect", (msgItem) => {
	    	if(msgItem){
                 resolve(msgItem)
	    	} else {
                 reject(undefined)
	    	}
	    	messageCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitMessages