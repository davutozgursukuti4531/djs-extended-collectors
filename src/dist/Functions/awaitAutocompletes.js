import AutocompleteCollector from"../Classes/AutocompleteCollector.js";





const awaitAutocompletes = async(client, channel, options) => {
    return await new Promise((resolve, reject) => {
        const autocompleteCollector = new AutocompleteCollector(client, channel, {
            max: 1,
            time: options.time,
            collectFilter: options.collectFilter
        })
        autocompleteCollector.on("collect", (autocompleteItem) => {
            if(autocompleteItem){
                 resolve(autocompleteItem)
            } else {
                 reject(undefined)
            }
            autocompleteCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitAutocompletes
