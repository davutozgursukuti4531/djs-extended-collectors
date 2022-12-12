import { CollectorFilter, LimitedCollection, Message, PartialMessage, User, MessageReaction, PartialMessageReaction, GuildEmoji } from "discord.js"


export type BaseCollectorEvents<K, V> = {
    collect: (item: V) => any,
    dispose: (item: V) => any,
    end: (collected: LimitedCollection<K, V>, reason: string) => any,
    limitFulled: (collected: LimitedCollection<K, V>) => any,
    paused: (collected: LimitedCollection<K, V>) => any,
    resumed: (collected: LimitedCollection<K, V>) => any
}
export interface BaseCollectorOptions<V extends any> {
    collectFilter?: CollectorFilter<V[]>,
    disposeFilter?: CollectorFilter<V[]>
    time?: number,
    max?: number | undefined,
    dispose?: boolean | undefined,
}
export interface MessageReactionCollectorEvents extends BaseCollectorEvents<string, MessageReaction> {
    remove: (reaction: MessageReaction | PartialMessageReaction) => any
}
export interface MessageCollectorEvents extends BaseCollectorEvents<string, Message | PartialMessage> {
    update: (oldItem: Message | PartialMessage, newItem: Message | PartialMessage) => any
}
export interface MessageCollectorOptions extends BaseCollectorOptions<Message | PartialMessage> {
    updateFilter?: CollectorFilter<Message[] | PartialMessage[]>
}
export interface BaseAsyncCollectorOptions<V extends any> {
    collectFilter?: CollectorFilter<V[]>,
    time?: number | undefined
}
