class CollectorTimer{
	public defaultTimeout: NodeJS.Timeout
    public ended: boolean
    public paused: boolean;
	constructor(fn: Function, ms: number | undefined){
		this.defaultTimeout = setTimeout(fn, ms)
		this.ended = false;
	}
	public resetTimer(){
		this.defaultTimeout.refresh()
	}
	public pauseTimer(){
        this.paused = true;
        clearTimeout(this.defaultTimeout)
	}
	public resumeTimer(){
        this.paused = false;
        this.defaultTimeout.refresh()
	}
	public stopTimer(){
		this.ended = true
		clearTimeout(this.defaultTimeout)
	}
}


export default CollectorTimer