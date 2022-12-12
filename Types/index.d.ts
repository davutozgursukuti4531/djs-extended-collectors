import TypedEventEmitter from "typed-emitter";
import EventEmitter from "node:events"
import { Message, PartialMessage, CommandInteraction, Guild, LimitedCollection, Client, ThreadChannel, AutocompleteInteraction, ModalSubmitInteraction, CollectorFilter, Channel, User, MessageReaction, PartialMessageReaction, PartialUser } from "discord.js";

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
    collectFilter?: CollectorFilter<V[]>,
    disposeFilter?: CollectorFilter<V[]>
    time?: number,
    max?: number | undefined,
    dispose?: boolean | undefined,
}
export interface MessageReactionCollectorEvents extends BaseCollectorEvents<string, MessageReaction | ModalSubmitInteraction> {
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
    export class BaseCollector<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends (EventEmitter as new<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>>() => TypedEventEmitter<Events>)<K, V, Events>{
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
        constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<CommandInteraction>)
        private handleCollect(item: CommandInteraction)
        private handleGuildDeletion(guild: Guild)
        private handleChannelDeletion(channel: Channel)
        private handleThreadDeletion(thread: ThreadChannel)
    }
    export class AutocompleteCollector extends BaseCollector<string, AutocompleteInteraction>{
        channel: Channel
        constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<AutocompleteInteraction>)
        private handleCollect(item)
        private handleGuildDeletion(guild)
        private handleChannelDeletion(channel)
        private handleThreadDeletion(thread)
    }
    export class MessageCollector extends BaseCollector<string, Message | PartialMessage, MessageCollectorEvents>{
        channel: Channel;
        constructor(client: Client, channel: Channel, options?: MessageCollectorOptions)
        private handleCollect(item: Message | PartialMessage)
        private handleDispose(item: Message | PartialMessage)
        private handleUpdate(oldItem: Message | PartialMessage, newItem: Message | PartialMessage)
        private handleThreadDeletion(thread: ThreadChannel)
        private handleChannelDeletion(channel: Channel)
        private handleGuildDeletion(guild: Guild)
    }
    export class ModalSubmitCollector extends BaseCollector<string, ModalSubmitInteraction>{
        private timer: CollectorTimer;
        constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<ModalSubmitInteraction>)
        private handleCollect(item: ModalSubmitInteraction)
        private handleGuildDeletion(guild: Guild)
        private handleChannelDeletion(channel: Channel)
        private handleThreadDeletion(thread: ThreadChannel)
    }
    class MessageReactionCollector extends BaseCollector<string, MessageReaction | PartialMessageReaction, MessageReactionCollectorEvents>{
        message: Message | PartialMessage
        users: LimitedCollection<string, User | PartialUser>
        constructor(client: Client, message: Message | PartialMessage, options: BaseCollectorOptions<MessageReaction | PartialMessageReaction> & { removeFilter: CollectorFilter<PartialMessageReaction[] | MessageReaction[]> })
        private handleCollect(item: MessageReaction, user: User | PartialUser)
        private handleReactionEmojiRemove(emoji: MessageReaction)
        private handleDispose(item: MessageReaction, user: PartialUser | User)
        private handleMessageDeletion(message: PartialMessage | Message)
        private handleChannelDeletion(channel: Channel)
        private handleGuildDeletion(guild: Guild)
        private handleThreadDeletion(thread: ThreadChannel)
    }
    export function awaitApplicationCommands(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<CommandInteraction>): Promise<CommandInteraction>
    export function awaitAutocompletes(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<AutocompleteInteraction>): Promise<AutocompleteInteraction>
    export function awaitMessages(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<Message | PartialMessage>): Promise<Message | PartialMessage>
    export function awaitModalSubmits(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction>
    export function awaitMessageReactions(client: Client, message: Message | PartialMessage, options?: BaseAsyncCollectorOptions<MessageReaction | PartialMessageReaction>): Promise<MessageReaction | PartialMessageReaction>
}
