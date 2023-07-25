import ModalSubmitCollector from"../Classes/ModalSubmitCollector.js";





const awaitModalSubmits = async(client, channel, options) => {
    return await new Promise((resolve, reject) => {
        const modalSubmitCollector = new ModalSubmitCollector(client, channel, {
            max: 1,
            time: options.time,
            collectFilter: options.collectFilter
        })
        modalSubmitCollector.on("collect", (modalItem) => {
            if(modalItem){
                 resolve(modalItem)
            } else {
                 reject(undefined)
            }
            modalSubmitCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitModalSubmits
