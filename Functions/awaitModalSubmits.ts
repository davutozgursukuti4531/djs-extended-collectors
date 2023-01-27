import ModalSubmitCollector from"../Classes/ModalSubmitCollector";
import { Client, Channel, ModalSubmitInteraction } from "discord.js"
import { BaseAsyncCollectorOptions } from "../Types/Types"





const awaitModalSubmits = async(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction> => {
	return await new Promise<ModalSubmitInteraction>((resolve, reject) => {
	    const modalSubmitCollector = new ModalSubmitCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    collectFilter: options.collectFilter
	    })
	    modalSubmitCollector.on("collect", (modalItem) => {
	    	if(modalItem !== undefined){
                 resolve(modalItem)
	    	} else {
                 reject(undefined)
	    	}
		modalSubmitCollector.stop("thisIsAsyncCollector")
	    })
	})
}



export default awaitModalSubmits
