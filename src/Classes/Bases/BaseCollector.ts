import { UnityEmitter, SignaturedListenerMap } from "unityemitter";
import CollectorTimer from"./CollectorTimer.js";
import { Client, Collection } from "discord.js"
import { BaseCollectorOptions } from "../../interfaces/BaseCollectorOptions";
import { BaseCollectorEvents } from "../../interfaces/BaseCollectorEvents";

//@ts-ignore
class BaseCollector<K extends any, MV extends [...items: any[]], Events extends BaseCollectorEvents<K, MV> = BaseCollectorEvents<K, MV>> extends UnityEmitter<Events>{
    public client: Client
    public collectorOptions: BaseCollectorOptions<MV>;
    public collected: Collection<K, MV>;
    public ended: boolean;
    public endReason: string;
    public timer: CollectorTimer
    public idleTimer: CollectorTimer
    constructor(client: Client, options: BaseCollectorOptions<MV>){
        super({
            limits: {
                storage: options.listenerStorageLimit,
                store: options.listenerStoreLimit
            }
        });
        if(!client || !(client instanceof Client)) new TypeError("Client is not defined or not valid.") 
        this.client = client
        this.collectorOptions = options
        this.endReason = ""
        if(!options.time) options.time = Infinity
        if(!options.idleTime) options.idleTime = Infinity
        this.collected = new Collection()
        this.ended = false
        //@ts-ignore
        this.timer = new CollectorTimer(() => {this.stop("timeEnd")}, this.collectorOptions.time)
        //@ts-ignore
        this.idleTimer = new CollectorTimer(() => {this.stop("timeEnd")}, this.collectorOptions.idleTime)
        this.idleTimer.on("end", () => this.stop("timeEnd"))
        this.timer.on("end", () => this.stop("timeEnd"))
    }
    public handleCollect(...items: MV extends [...items: infer P] ? P : never){}
    public handleDispose(...items: MV extends [...items: infer P] ? P : never){}
    public stop(reason: string){
        //@ts-ignore
        this.emit("end", this.collected, reason)
        this.endReason = reason
        this.ended = true;
        this.timer.stopTimer()
    }
    public resetTimer(){
       this.timer.resetTimer()
    }
    public pauseTimer(){
        if(this.ended) return;
        this.timer.pauseTimer()
        this.timer.on("paused", () => {
            //@ts-ignore
            this.emit("paused", this.collected)
        })
    }
    public resumeTimer(){
        if(this.ended) return;
        this.timer.resumeTimer()
        this.timer.on("resumed", () => {
            //@ts-ignore
            this.emit("resumed", this.collected)
        })
    }
}



export default BaseCollector
