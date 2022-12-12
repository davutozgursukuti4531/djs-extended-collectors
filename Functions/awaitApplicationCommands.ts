import ApplicationCommandCollector from"../Classes/ApplicationCommandCollector";
import { Client, Channel } from "discord.js"
import { BaseAsyncCollectorOptions, CommandInteraction } from "../Types/Types"





const awaitApplicationCommands = async(client: Client, channel: Channel, options: BaseAsyncCollectorOptions): Promise<CommandInteraction> => {
	return await new Promise<CommandInteraction>((resolve, reject) => {
	    const commandCollector = new ApplicationCommandCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    filter: options.filter
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
