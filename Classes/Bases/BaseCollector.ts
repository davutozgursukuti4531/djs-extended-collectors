import { Client, LimitedCollection } from "discord.js";
import { BaseCollectorEvents, BaseCollectorOptions } from "../../Types/Types";
import TypedEmitter from "typed-emitter";
import EventEmitter from "node:events";

class BaseCollector<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends (EventEmitter as new<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>>() => TypedEmitter<Events> )<K, V, Events>{
    public client: Client<boolean>;
    public options: BaseCollectorOptions;
    public endReason: string;
    private __timer: NodeJS.Timeout;
    public collected: LimitedCollection<K, V>
    public ended: boolean;
    constructor(client: Client, options: BaseCollectorOptions){
        super();
        this.client = client
        this.options = options
        this.collected = new LimitedCollection()
        this.__timer = setTimeout(() => this.stop("timeEnd"), this.options.time)
    }
    public handleCollect(item: V){}

    public stop(reason: string){
        this.emit("end", this.collected, reason)
        this.endReason = reason
        this.ended = true;
    }

    public handleDispose(item: V | any){}
    public resetTimer(){
        clearTimeout(this.__timer)
    }
}



export default BaseCollector