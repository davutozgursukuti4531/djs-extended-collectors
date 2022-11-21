import TypedEventEmitter from "typed-emitter";
import EventEmitter from "node:events"
import { Message, PartialMessage, CommandInteraction, Guild, Channel, LimitedCollection, Client, AnyThreadChannel, AutocompleteInteraction, ModalSubmitInteraction, CollectorFilter } from "discord.js";



declare module "djs-extended-collectors"{
    export type BaseCollectorEvents<K, V> = {
        collect: (item: V) => any,
        dispose: (item: V) => any,
        end: (collected: LimitedCollection<K, V>, reason: string) => any,
        limitFulled: (collected: LimitedCollection<K, V>) => any,
        paused: (collected: LimitedCollection<K, V>) => any,
        resumed: (collected: LimitedCollection<K, V>) => any
    }
    export interface BaseCollectorOptions<V extends any> {
        filter?: CollectorFilter<V[]>,
        disposeFilter?: CollectorFilter<V[]>
        time?: number,
        max?: number | undefined,
        dispose?: boolean | undefined,
    }
    export interface MessageCollectorEvents extends BaseCollectorEvents<string, Message | PartialMessage> {
        update: (oldItem: Message<boolean> | PartialMessage, newItem: Message<boolean> | PartialMessage) => any
    }
    export interface MessageCollectorOptions {
        filter?: CollectorFilter<Message[] | PartialMessage[]>,
        disposeFilter?: CollectorFilter<Message[] | PartialMessage[]>
        time?: number | undefined,
        max?: number | undefined,
        dispose?: boolean | undefined,
        updateFilter?: CollectorFilter<Message[] | PartialMessage[]>
    }
    export interface BaseAsyncCollectorOptions<V extends any> {
        filter?: CollectorFilter<V[]>,
        time?: number | undefined
    }
    export class CollectorTimer{
        public defaultTimeout: NodeJS.Timeout
        public ended: boolean
        public paused: boolean;
        constructor(fn: Function, ms: number)
        public resetTimer()
        public pauseTimer()
        public resumeTimer()
        public stopTimer()
    }
    export class BaseCollector<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends (EventEmitter as new<K extends any, V extends any>() => TypedEventEmitter<BaseCollectorEvents<K, V>>)<K, V>{
        options: BaseCollectorOptions<V>
        ended: boolean
        timer: CollectorTimer
        collected: LimitedCollection<K, V>
        client: Client
        constructor(client: Client, options: BaseCollectorOptions<V>)
        handleCollect(item: V)
        stop(reason: string)
        handleDispose(item: V)
        resetTimer()
        pauseTimer()
        resumeTimer()
    }
    export class ApplicationCommandCollector extends BaseCollector<string, CommandInteraction>{
        channel: Channel
        constructor(client: Client, channel: Channel, options: BaseCollectorOptions<CommandInteraction>)
        private handleCollect(item: CommandInteraction)
        private handleGuildDeletion(guild: Guild)
        private handleChannelDeletion(channel: Channel)
        private handleThreadDeletion(thread: AnyThreadChannel)
    }
    export class AutocompleteCollector extends BaseCollector<string, AutocompleteInteraction>{
        channel: Channel
        constructor(client: Client, channel: Channel, options: BaseCollectorOptions<AutocompleteInteraction>)
        private handleCollect(item)
        private handleGuildDeletion(guild)
        private handleChannelDeletion(channel)
        private handleThreadDeletion(thread)
    }
    export class MessageCollector extends BaseCollector<string, Message | PartialMessage, MessageCollectorEvents>{
        channel: Channel;
        constructor(client: Client, channel: Channel, options: MessageCollectorOptions)
        private handleCollect(item: Message | PartialMessage)
        private handleDispose(item: Message | PartialMessage)
        private handleUpdate(oldItem: Message | PartialMessage, newItem: Message | PartialMessage)
        private handleThreadDeletion(thread: AnyThreadChannel)
        private handleChannelDeletion(channel: Channel)
        private handleGuildDeletion(guild: Guild)
    }
    export class ModalSubmitCollector extends BaseCollector<string, ModalSubmitInteraction>{
        private timer: CollectorTimer;
        constructor(client: Client, channel: Channel, options: BaseCollectorOptions<ModalSubmitInteraction>)
        private handleCollect(item: ModalSubmitInteraction)
        private handleGuildDeletion(guild: Guild)
        private handleChannelDeletion(channel: Channel)
        private handleThreadDeletion(thread: AnyThreadChannel)
    }
    export function awaitApplicationCommands(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<CommandInteraction>): Promise<CommandInteraction>
    export function awaitAutocompletes(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<AutocompleteInteraction>): Promise<AutocompleteInteraction>
    export function awaitMessages(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<Message | PartialMessage>): Promise<Message | PartialMessage>
    export function awaitModalSubmits(client: Client, channel: Channel, options: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction>
}
