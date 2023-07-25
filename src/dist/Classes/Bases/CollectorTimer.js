import { Emitter } from "@wumpjs/utils";

class CollectorTimer extends Emitter{
    constructor(fn, ms){
        super()
        this.defaultTimeout = setTimeout(()=>{fn();this.handleEnd()}, ms)
        if(!ms || typeof ms !== "number") throw new TypeError("ms is not defined or not valid.")
        this.ms = ms
        this.ended = false;
        for(var i=ms;i<ms;i--){
            this.remainingTime = i;
        }
    }
    resetTimer(){
        clearTimeout(this.defaultTimeout);this.defaultTimeout = setTimeout(()=>{fn();this.onEnd()}, this.ms)
    }
    pauseTimer(){
        if(this.ended) return;
        this.paused = true;
        clearTimeout(this.defaultTimeout)
        this.emit("paused")
    }
    resumeTimer(){
        if(this.ended) return;
        if(!this.paused) return;
        this.paused = false;
        this.defaultTimeout = setTimeout(()=>{fn();this.onEnd()}, this.remainingTime)
        this.emit("resumed")
    }
    stopTimer(){
        this.ended = true
        clearTimeout(this.defaultTimeout)
    }
    handleEnd(){
        this.ended = true
        this.emit("end")
    }
}


export default CollectorTimer
