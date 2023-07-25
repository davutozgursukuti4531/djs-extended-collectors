import ApplicationCommandCollector from"../Classes/ApplicationCommandCollector.js";





const awaitApplicationCommands = async(client, channel, options) => {
	return await new Promise((resolve, reject) => {
	    const commandCollector = new ApplicationCommandCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    collectFilter: options.collectFilter
	    })
	    commandCollector.on("collect", (commandItem) => {
	    	if(commandItem){
                 resolve(commandItem)
	    	} else {
                 reject(undefined)
	    	}
	    	commandCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitApplicationCommands
