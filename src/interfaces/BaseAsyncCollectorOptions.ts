import { BetterCollectorFilter } from "../types/BetterCollectorFilter"


export interface BaseAsyncCollectorOptions<MV extends [...items: any[]] = [...items: any[]]> {
    collectFilter?: BetterCollectorFilter<MV>
    time?: number
    idleTime?: number
}