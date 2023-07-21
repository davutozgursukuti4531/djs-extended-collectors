import { Emitter } from "@wumpjs/utils";

class CollectorTimer extends Emitter{
    constructor(fn, ms){
        super()
        this.defaultTimeout = setTimeout(()=>{fn();this.handleEnd()}, ms)
        this.ms = ms
        this.ended = false;
        for(var i=0;i<ms;i++){
            this.remainingTime = i;
        }
    }
    resetTimer(){
        clearTimeout(this.defaultTimeout);this.defaultTimeout = setTimeout(()=>{fn();this.onEnd()}, this.ms)
    }
    pauseTimer(){
        if(this.ended) return;
        this.paused = true;
        if(this.ended) return;
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
