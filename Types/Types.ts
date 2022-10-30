import { ApplicationCommandType, CommandInteraction, CollectorFilter, LimitedCollection, Message, PartialMessage, ModalSubmitInteraction } from "discord.js"


export type BaseCollectorEvents<K, V> = {
    collect: (item: V) => any,
    dispose: (item: V) => any,
    end: (collected: LimitedCollection<K, V>, reason: string) => any,
    limitFulled: (collected: LimitedCollection<K, V>) => any
}
export interface BaseCollectorOptions {
    filter?: CollectorFilter<any>,
    disposeFilter?: CollectorFilter<any>
    time?: number,
    max?: number | undefined,
    dispose?: boolean | undefined,
}
export interface MessageCollectorEvents {
    collect: (item: Message | PartialMessage) => any
    dispose: (item: Message<boolean> | PartialMessage) => any
    end: (collected: LimitedCollection<string, Message<boolean> | PartialMessage>, reason: string) => any
    update: (oldItem: Message<boolean> | PartialMessage, newItem: Message<boolean> | PartialMessage) => any
    limitFulled: (collected: LimitedCollection<string, Message | PartialMessage>) => any
}
export interface MessageCollectorOptions {
    filter?: CollectorFilter<any>,
    disposeFilter?: CollectorFilter<any>
    time?: number,
    max?: number | undefined,
    dispose?: boolean | undefined,
    updateFilter?: CollectorFilter<Message[]>
}