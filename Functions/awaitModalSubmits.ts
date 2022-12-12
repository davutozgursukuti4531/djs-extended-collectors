import ModalSubmitCollector from"../Classes/ModalSubmitCollector";
import { Client, Channel } from "discord.js"
import { BaseAsyncCollectorOptions, ModalSubmitInteraction } from "../Types/Types"





const awaitModalSubmits = async(client: Client, channel: Channel, options: BaseAsyncCollectorOptions): Promise<ModalSubmitCollector> => {
	return await new Promise<ModalSubmitInteraction>((resolve, reject) => {
	    const modalSubmitCollector = new ModalSubmitCollector(client, channel, {
		    max: 1,
		    time: options.time,
		    filter: options.filter
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
