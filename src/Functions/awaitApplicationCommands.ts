import { Client, TextBasedChannel } from "discord.js";
import ApplicationCommandCollector from"../Classes/ApplicationCommandCollector.js";
import { BaseAsyncCollectorOptions } from "../interfaces/BaseAsyncCollectorOptions.js";
import { CommandInteraction, CacheType } from "discord.js";





const awaitApplicationCommands = async(client: Client, channel: TextBasedChannel, options: BaseAsyncCollectorOptions<[cmdIntr: CommandInteraction<CacheType>]>) => {
	return await new Promise((resolve, reject) => {
	    const commandCollector = new ApplicationCommandCollector(client, channel, {
		    max: 1,
		    time: options.time,
			idleTime: options.time,
		    collectFilter: options.collectFilter
	    })
	    commandCollector.on("collect", (commandItem) => {
	    	if(commandItem){
				return resolve(commandItem)
	    	} else {
                 reject(undefined)
	    	}
	    	commandCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitApplicationCommands
