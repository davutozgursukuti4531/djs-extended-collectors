import { Client, LimitedCollection } from "discord.js";
import EventEmitter from"node:events";
import TypedEventEmitter from"typed-emitter";
import { BaseCollectorEvents, BaseCollectorOptions } from "../../Types/Types.ts"
import CollectorTimer from "./CollectorTimer";

class BaseCollector<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends (EventEmitter as new<K extends any, V extends any>() => TypedEventEmitter<BaseCollectorEvents<K, V>>)<K, V>{
    options: BaseCollectorOptions
    ended: boolean
    timer: CollectorTimer
    collected: LimitedCollection<K, V>
    client: Client
    constructor(client: Client, options: BaseCollectorOptions<V>){
        super();
        this.client = client
        this.options = options
        this.collected = new LimitedCollection()
        this.ended = false
        this.timer = new CollectorTimer(() => {this.stop("timeEnd"), this.ended = true}, this.options.time)
    }
    handleCollect(item: V){}
    stop(reason: string){
        this.emit("end", this.collected, reason)
        this.endReason = reason
        this.ended = true;
        this.timer.stopTimer()
    }
    handleDispose(item: V){}
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