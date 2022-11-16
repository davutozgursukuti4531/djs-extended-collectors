import AutocompleteCollector from"../Classes/AutocompleteCollector";
import { Client, Channel } from "discord.js"
import { BaseAsyncCollectorOptions, AutocompleteInteraction } from "../Types/Types"





const awaitAutocompletes = async(client: Client, channel: Channel, options: BaseAsyncCollectorOptions): Promise<AutocompleteInteraction> => {
	return await new Promise<AutocompleteInteraction>((resolve, reject) => {
	    const autocompleteCollector = new AutocompleteCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    filter: options.filter
	    })
	    autocompleteCollector.on("collect", (autocompleteItem) => {
	    	if(autocompleteItem !== undefined){
                 resolve(autocompleteItem)
	    	} else {
                 reject(undefined)
	    	}
	    })
	})
}



export default awaitAutocompletes