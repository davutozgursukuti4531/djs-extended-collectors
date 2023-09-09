import { Collection } from "discord.js";

export interface BaseCollectorEvents<K, VT extends any[]>{
    collect: (...items: VT) => any;
    dispose: (...items: VT) => any;
    end: (collected: Collection<K, VT>, reason: string) => any;
    paused: (collected: Collection<K, VT>) => any;
    resumed: (collected: Collection<K, VT>) => any
}