import { Client, TextBasedChannel } from "discord.js";
import AutocompleteCollector from"../Classes/AutocompleteCollector.js";
import { BaseAsyncCollectorOptions } from "../interfaces/BaseAsyncCollectorOptions.js";
import { AutocompleteInteraction, CacheType } from "discord.js";





const awaitAutocompletes = async(client: Client, channel: TextBasedChannel, options: BaseAsyncCollectorOptions<[autocompleteIntr: AutocompleteInteraction<CacheType>]>) => {
    return await new Promise((resolve, reject) => {
        const autocompleteCollector = new AutocompleteCollector(client, channel, {
            max: 1,
            time: options.time,
            idleTime: options.time,
            collectFilter: options.collectFilter
        })
        autocompleteCollector.on("collect", (autocompleteItem) => {
            if(autocompleteItem){
                return resolve(autocompleteItem)
            } else {
                 reject(undefined)
            }
            autocompleteCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitAutocompletes
