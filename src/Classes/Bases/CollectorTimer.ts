import ChocolateMilkEmitter from "@chocolatemilkdev/emitter";
import { CollectorTimerEvents } from "../../interfaces/CollectorTimerEvents";

class CollectorTimer extends ChocolateMilkEmitter<CollectorTimerEvents>{
    public defaultTimeout: NodeJS.Timer
    public ms: number;
    public ended: boolean;
    public remainingTime: number;
    public paused: boolean
    public fn: Function;
    constructor(fn: Function, ms: number | undefined){
        super()
        this.defaultTimeout = setTimeout(()=>{fn();this.handleEnd()}, ms)
        if(!ms || typeof ms !== "number") throw new TypeError("ms is not defined or not valid.")
        this.ms = ms
        this.ended = false;
        this.fn = fn;
        this.paused = false;
        this.remainingTime = 5
        for(var i=ms;i<ms;){
            setInterval(() => i++, 1)
            this.remainingTime = ms - i
        }
    }
    resetTimer(){
        //@ts-ignore
        clearTimeout(this.defaultTimeout);this.defaultTimeout = setTimeout(()=>{this.fn();this.handleEnd()}, this.ms)
    }
    pauseTimer(){
        if(this.ended) return;
        this.paused = true;
        //@ts-ignore
        clearTimeout(this.defaultTimeout)
        this.emit("paused")
    }
    resumeTimer(){
        if(this.ended) return;
        if(!this.paused) return;
        this.paused = false;
        this.defaultTimeout = setTimeout(()=>{this.fn();this.handleEnd()}, this.remainingTime)
        this.emit("resumed")
    }
    stopTimer(){
        this.ended = true
        //@ts-ignore
        clearTimeout(this.defaultTimeout)
    }
    handleEnd(){
        this.ended = true
        this.emit("end")
    }
}


export default CollectorTimer
