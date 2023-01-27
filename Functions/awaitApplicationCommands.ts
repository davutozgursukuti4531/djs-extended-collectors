import ApplicationCommandCollector from"../Classes/ApplicationCommandCollector";
import { Client, Channel, CommandInteraction } from "discord.js"
import { BaseAsyncCollectorOptions } from "../Types/Types"





const awaitApplicationCommands = async(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<CommandInteraction>): Promise<CommandInteraction> => {
	return await new Promise<CommandInteraction>((resolve, reject) => {
	    const commandCollector = new ApplicationCommandCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    collectFilter: options.collectFilter
	    })
	    commandCollector.on("collect", (commandItem) => {
	    	if(commandItem !== undefined){
                 resolve(commandItem)
	    	} else {
                 reject(undefined)
	    	}
		commandCollector.stop("ThisIsAsyncCollector")
	    })
	})
}



export default awaitApplicationCommands
