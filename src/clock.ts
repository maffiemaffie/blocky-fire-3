class Clock {
    private listeners:Array<ClockListener> = [];

    constructor(){
        requestAnimationFrame(this.tick.bind(this));
    }

    private tick(timestamp:DOMHighResTimeStamp) {
        for (let listener of this.listeners) {
            if (!listener.lastTick) listener.lastTick = timestamp;
            if (timestamp - listener.lastTick > listener.tickDuration) {
                listener.onTick({
                    now: timestamp,
                    deltaTime: timestamp - listener.lastTick
                });
                listener.lastTick = timestamp;
            }
        }
        this.listeners = this.listeners.filter(l => !l.isFinished); // filter out finished processes
        requestAnimationFrame(this.tick.bind(this));
    }

    addInterval(onTick:(args:TickArgs) => void, intervalDurationMilliseconds:number = 0) {
        this.listeners.push({
            tickDuration: intervalDurationMilliseconds,
            onTick: onTick,
            isFinished: false
        });
    }

    queue(callback:(args:TickArgs) => void, queueAfterMilliseconds:number) {
        this.listeners.push({
            tickDuration: queueAfterMilliseconds,
            onTick(time) {
                callback(time);
                this.isFinished = true;
            },
            isFinished: false
        })
    }
}

interface ClockListener {
    tickDuration:number;
    onTick(args:TickArgs):void;
    isFinished:boolean;
    lastTick?:DOMHighResTimeStamp;
}

interface TickArgs {
    now:DOMHighResTimeStamp;
    deltaTime:number;
}

export { Clock, TickArgs };