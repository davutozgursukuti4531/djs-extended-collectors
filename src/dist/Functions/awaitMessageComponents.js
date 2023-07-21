import MessageComponentCollector from"../Classes/MessageComponentCollector.js";





const awaitMessageComponents = async(client, message, options) => {
    return await new Promise((resolve, reject) => {
        const componentCollector = new MessageComponentCollector(client, message, {
            max: 1,
            time: options.time,
            collectFilter: options.collectFilter
        })
        componentCollector.on("collect", (componentItem) => {
            if(componentItem){
                 resolve(componentItem)
            } else {
                 reject(undefined)
            }
            componentCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitMessageComponents