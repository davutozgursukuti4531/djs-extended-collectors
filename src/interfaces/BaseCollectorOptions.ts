import { BetterCollectorFilter } from "../types/BetterCollectorFilter"


export interface BaseCollectorOptions<MV extends [...items: any[]] = [...items: any[]]> {
    collectFilter?: BetterCollectorFilter<MV>
    disposeFilter?: BetterCollectorFilter<MV>
    listenerStorageLimit?: number | undefined
    listenerStoreLimit?: number | undefined
    time?: number
    idleTime?: number
    max?: number
    dispose?: boolean | undefined
    listenerLimit?: number | undefined
}