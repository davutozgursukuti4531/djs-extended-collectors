import AutocompleteCollector from"../Classes/AutocompleteCollector";
import { Client, Channel, AutocompleteInteraction } from "discord.js"
import { BaseAsyncCollectorOptions } from "../Types/Types"





const awaitAutocompletes = async(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<AutocompleteInteraction>): Promise<AutocompleteInteraction> => {
	return await new Promise<AutocompleteInteraction>((resolve, reject) => {
	    const autocompleteCollector = new AutocompleteCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    collectFilter: options.collectFilter
	    })
	    autocompleteCollector.on("collect", (autocompleteItem) => {
	    	if(autocompleteItem !== undefined){
                 resolve(autocompleteItem)
	    	} else {
                 reject(undefined)
	    	}
		autocompleteCollector.stop("ThisIsAsyncCollector")
	    })
	})
}



export default awaitAutocompletes
