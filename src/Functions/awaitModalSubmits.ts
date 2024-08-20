import { Client, ModalSubmitInteraction, MessageComponentInteraction, CommandInteraction } from "discord.js";
import ModalSubmitCollector from"../Classes/ModalSubmitCollector";
import { BaseAsyncCollectorOptions } from "../interfaces/BaseAsyncCollectorOptions.js";





const awaitModalSubmits = async(client: Client, interaction: MessageComponentInteraction | CommandInteraction, options: BaseAsyncCollectorOptions<[modalSubmitInteraction: ModalSubmitInteraction]>) => {
    return await new Promise<ModalSubmitInteraction>((resolve, reject) => {
        const modalSubmitCollector = new ModalSubmitCollector(client, interaction, {
            max: 1,
            time: options.time,
            idleTime: options.time,
            collectFilter: options.collectFilter
        })
        modalSubmitCollector.onceAsync("collect").then(([modalItem]) => {
            if(modalItem){
                return resolve(modalItem)
            } else {
                 reject(undefined)
            }
            modalSubmitCollector.stop("thisIsAsyncCollector")
        })
    })
}



export default awaitModalSubmits
