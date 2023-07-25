import { Emitter } from"@wumpjs/utils";
import CollectorTimer from"./CollectorTimer.js";
import CollectorError from "../Errors/CollectorError.js";
import VersionError from "../Errors/VersionError.js";
const { Client, Collection } = await import("discord.js").catch((e) => new VersionError(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {type: "UnvalidVersion" }));

class BaseCollector extends Emitter{
    /**
     * 
     * @param {Client} client 
     * @param {*} options 
     */
    constructor(client, options){
        super({
            listenerLimit: options.listenerLimit
        });
        (!client || !(client instanceof Client)) ? new CollectorError("Client is not defined or not valid.", {
            type: "TypeError"
        }).throw() : this.client = client
        this.options = options
        this.collected = new Collection()
        this.ended = false
        this.timer = new CollectorTimer(() => {this.stop("timeEnd")}, this.options.time)
        this.idleTimer = new CollectorTimer(() => {this.stop("timeEnd")}, this.options.idleTime)
        this.idleTimer.on("end", () => this.stop("timeEnd"))
        this.timer.on("end", () => this.stop("timeEnd"))
    }
    handleCollect(item, ...moreArgs){}
    stop(reason){
        this.emit("end", this.collected, reason)
        this.endReason = reason
        this.ended = true;
        this.timer.stopTimer()
    }
    handleDispose(item, ...moreArgs){}
    resetTimer(){
       this.timer.resetTimer()
    }
    pauseTimer(){
        if(this.ended) return;
        this.timer.pauseTimer()
        this.emit("paused", this.collected)
    }
    resumeTimer(){
        if(this.ended) return;
        this.timer.resumeTimer()
        this.emit("resumed", this.collected)
    }
}



export default BaseCollector
