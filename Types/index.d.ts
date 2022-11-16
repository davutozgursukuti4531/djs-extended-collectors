import TypedEventEmitter from "typed-emitter";
import EventEmitter from "node:events"
import { Message, PartialMessage, CommandInteraction, Guild, Channel, LimitedCollection, Client } from "discord.js";
export { BaseCollectorEvents, BaseCollectorOptions, BaseAsyncCollectorOptions, MessageCollectorEvents, MessageCollectorOptions } from "./Types";



declare module "djs-extended-collectors"{
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
        options: BaseCollectorOptions
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
        private timer: CollectorTimer
        constructor(client: Client, channel: Channel, options: BaseCollectorOptions<CommandInteraction>)
        private handleCollect(item: CommandInteraction)
        private handleGuildDeletion(guild: Guild)
        private handleChannelDeletion(channel: Channel)
        private handleThreadDeletion(thread: AnyThreadChannel)
    }
    export class AutocompleteCollector extends BaseCollector<string, AutocompleteInteraction>{
        Channel: Channel
        private timer: CollectorTimer
        constructor(client: Client, channel: Channel, options: BaseCollectorOptions<AutocompleteInteraction>)
        private handleCollect(item)
        private handleGuildDeletion(guild)
        private handleChannelDeletion(channel)
        private handleThreadDeletion(thread)
    }
    export class MessageCollector extends BaseCollector<string, Message | PartialMessage, MessageCollectorEvents>{
        channel: Channel;
        private timer: CollectorTimer
        constructor(client: Client, channel: Channel, options: MessageCollectorOptions)
        private handleCollect(item: Message | PartialMessage)
        private handleDispose(item: Message | PartialMessage)
        private handleUpdate(oldItem: Message | PartialMessage, newItem: Message | PartialMessage)
        private handleThreadDeletion(thread: AnyThreadChannel)
        private handleChannelDeletion(channel: Channel)
        private handleGuildDeletion(guild: Guild)
    }
    export class ModalSubmitCollector extends BaseCollector<ModalSubmitInteraction>{
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