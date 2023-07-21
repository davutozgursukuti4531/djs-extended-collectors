import { Emitter } from"@wumpjs/utils";
import NodeTimer from "node:timers"
import { Message, PartialMessage, CommandInteraction, Guild, Client, ThreadChannel, MessageComponentInteraction, AutocompleteInteraction, ModalSubmitInteraction, CollectorFilter, Channel, User, MessageReaction, PartialMessageReaction, PartialUser, Collection } from "discord.js";


declare module "discord.js"{
    export type BetterCollectorFilter<BI, MI extends [...items: any[]] = [...items: any[]]> = (item: BI, ...items: MI) => boolean | Promise<boolean>;
    export interface BaseCollectorEvents<K, V, MV extends [any] = [any]> {
        collect: (item: V, ...moreArgs: MV) => any,
        dispose: (item: V, ...moreArgs: MV) => any,
        end: (collected: Collection<K, V>, reason: string) => any,
        limitFulled: (collected: Collection<K, V>) => any,
        paused: (collected: Collection<K, V>) => any,
        resumed: (collected: Collection<K, V>) => any
    }
    export interface BaseCollectorOptions<V extends any, MV extends [...items: any[]] = [...items: any[]]> {
        collectFilter?: BetterCollectorFilter<V, MV>,
        disposeFilter?: BetterCollectorFilter<V, MV>
        time?: number,
        max?: number | undefined,
        dispose?: boolean | undefined,
        listenerLimit?: number | undefined
    }
    export interface MessageReactionCollectorEvents extends BaseCollectorEvents<string, MessageReaction | PartialMessageReaction, [User | PartialUser]> {
        remove: (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => any
    }
    export interface MessageCollectorEvents extends BaseCollectorEvents<string, Message | PartialMessage> {
        update: (oldItem: Message | PartialMessage, newItem: Message | PartialMessage) => any
    }
    export interface BaseAsyncCollectorOptions<V extends any, MV extends [...items: any[]] = [...items: any[]]> {
        collectFilter?: BetterCollectorFilter<V, MV>,
        time?: number | undefined
    }
    export interface TimerEvents {
        end: () => unknown;
        paused: () => unknown;
        resumed: () => unknown;
    }
        export class CollectorTimer extends Emitter<TimerEvents>{
            public defaultTimeout: NodeJS.Timeout
            public ended: boolean
            public paused: boolean;
            constructor(fn: Function, ms: number)
            public resetTimer()
            public pauseTimer()
            public resumeTimer()
            public stopTimer()
            public onEnd()
        }
        export class BaseCollector<K extends any, V extends any, MV extends [any] = [any], Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends Emitter<Events>{
            public collectorOptions: BaseCollectorOptions<V>
            public ended: boolean
            public timer: CollectorTimer
            public collected: Collection<K, V>
            public client: Client
            constructor(client: Client, options?: BaseCollectorOptions<V>)
            public handleCollect(item: V, ...moreArgs: MV)
            public stop(reason: string)
            public handleDispose(item: V, ...moreArgs: MV)
            public resetTimer()
            public pauseTimer()
            public resumeTimer()
        }
        export class ApplicationCommandCollector extends BaseCollector<string, CommandInteraction>{
            public channel: Channel
            constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<CommandInteraction>)
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: Channel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export class AutocompleteCollector extends BaseCollector<string, AutocompleteInteraction>{
            public channel: Channel
            constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<AutocompleteInteraction>)
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: Channel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export class MessageComponentCollector extends BaseCollector<string, MessageComponentInteraction>{
            public message: Message
            constructor(client: Client, message: Message, options?: BaseCollectorOptions<MessageComponentInteraction>)
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: Channel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
            private handleMessageDeletion(message: Message | PartialMessage): void;
        }
        export class MessageCollector extends BaseCollector<string, Message | PartialMessage, [any], MessageCollectorEvents>{
            public channel: Channel;
            constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<Message | PartialMessage> & { updateFilter?: BetterCollectorFilter<Message | PartialMessage, []> })
            public handleUpdate(oldItem: Message | PartialMessage, newItem: Message | PartialMessage)
            private handleThreadDeletion(thread: ThreadChannel): void;
            private handleChannelDeletion(channel: Channel): void;
            private handleGuildDeletion(guild: Guild): void;
        }
        export class ModalSubmitCollector extends BaseCollector<string, ModalSubmitInteraction>{
            public channel: Channel
            constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<ModalSubmitInteraction>)
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: Channel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export class MessageReactionCollector extends BaseCollector<string, MessageReaction | PartialMessageReaction, [user: User | PartialUser], MessageReactionCollectorEvents>{
            public message: Message | PartialMessage
            public users: Collection<string, User | PartialUser>
            constructor(client: Client, message: Message | PartialMessage, options?: BaseCollectorOptions<MessageReaction | PartialMessageReaction, [user: User | PartialUser]> & { removeFilter?: BetterCollectorFilter<MessageReaction | PartialMessageReaction, [user: User | PartialUser]> })
            private handleReactionEmojiRemove(emoji: MessageReaction): void;
            private handleMessageDeletion(message: PartialMessage | Message): void;
            private handleChannelDeletion(channel: Channel): void;
            private handleGuildDeletion(guild: Guild): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export function awaitApplicationCommands(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<CommandInteraction>): Promise<CommandInteraction>
        export function awaitAutocompletes(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<AutocompleteInteraction>): Promise<AutocompleteInteraction>
        export function awaitMessages(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<Message | PartialMessage>): Promise<Message | PartialMessage>
        export function awaitModalSubmits(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction>
        export function awaitMessageComponents(client: Client, message: Message | PartialMessage, options?: BaseAsyncCollectorOptions<MessageComponentInteraction>): Promise<MessageComponentInteraction>
        export function awaitMessageReactions(client: Client, message: Message | PartialMessage, options?: BaseAsyncCollectorOptions<MessageReaction | PartialMessageReaction, [user: User | PartialUser]>): Promise<MessageReaction | PartialMessageReaction>
}
type BetterCollectorFilter<BI, MI extends [...items: any[]]> = (item: BI, ...items: MI) => boolean | Promise<boolean>;
interface BaseCollectorEvents<K, V, MV extends [any] = [any]> {
    collect: (item: V, ...moreArgs: MV) => any,
    dispose: (item: V, ...moreArgs: MV) => any,
    end: (collected: Collection<K, V>, reason: string) => any,
    limitFulled: (collected: Collection<K, V>) => any,
    paused: (collected: Collection<K, V>) => any,
    resumed: (collected: Collection<K, V>) => any
}
interface BaseCollectorOptions<V extends any, MV extends [...items: any[]] = [...items: any[]]> {
    collectFilter?: BetterCollectorFilter<V, MV>,
    disposeFilter?: BetterCollectorFilter<V, MV>
    time?: number,
    max?: number | undefined,
    dispose?: boolean | undefined,
    listenerLimit?: number | undefined
}
interface MessageReactionCollectorEvents extends BaseCollectorEvents<string, MessageReaction | PartialMessageReaction, [User | PartialUser]> {
    remove: (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => any
}
interface MessageCollectorEvents extends BaseCollectorEvents<string, Message | PartialMessage> {
    update: (oldItem: Message | PartialMessage, newItem: Message | PartialMessage) => any
}
interface BaseAsyncCollectorOptions<V extends any, MV extends [...items: any[]] = [...items: any[]]> {
    collectFilter?: BetterCollectorFilter<V, MV>,
    time?: number | undefined
}
interface TimerEvents {
    end: () => unknown;
    paused: () => unknown;
    resumed: () => unknown;
}
    export class CollectorTimer extends Emitter<TimerEvents>{
        public defaultTimeout: NodeJS.Timeout
        public ended: boolean
        public paused: boolean;
        constructor(fn: Function, ms: number)
        public resetTimer()
        public pauseTimer()
        public resumeTimer()
        public stopTimer()
        public onEnd()
    }
    export class BaseCollector<K extends any, V extends any, MV extends [any] = [any], Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends Emitter<Events>{
        public collectorOptions: BaseCollectorOptions<V>
        public ended: boolean
        public timer: CollectorTimer
        public collected: Collection<K, V>
        public client: Client
        constructor(client: Client, options?: BaseCollectorOptions<V>)
        public handleCollect(item: V, ...moreArgs: MV)
        public stop(reason: string)
        public handleDispose(item: V, ...moreArgs: MV)
        public resetTimer()
        public pauseTimer()
        public resumeTimer()
    }
    export class ApplicationCommandCollector extends BaseCollector<string, CommandInteraction>{
        public channel: Channel
        constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<CommandInteraction>)
        private handleGuildDeletion(guild: Guild): void;
        private handleChannelDeletion(channel: Channel): void;
        private handleThreadDeletion(thread: ThreadChannel): void;
    }
    export class AutocompleteCollector extends BaseCollector<string, AutocompleteInteraction>{
        public channel: Channel
        constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<AutocompleteInteraction>)
        private handleGuildDeletion(guild: Guild): void;
        private handleChannelDeletion(channel: Channel): void;
        private handleThreadDeletion(thread: ThreadChannel): void;
    }
    export class MessageComponentCollector extends BaseCollector<string, MessageComponentInteraction>{
        public message: Message
        constructor(client: Client, message: Message, options?: BaseCollectorOptions<MessageComponentInteraction>)
        private handleGuildDeletion(guild: Guild): void;
        private handleChannelDeletion(channel: Channel): void;
        private handleThreadDeletion(thread: ThreadChannel): void;
        private handleMessageDeletion(message: Message | PartialMessage): void;
    }
    export class MessageCollector extends BaseCollector<string, Message | PartialMessage, [], MessageCollectorEvents>{
        public channel: Channel;
        constructor(client: Client, channel: Channel, options?: BaseCollectorOptions<Message | PartialMessage> & { updateFilter?: BetterCollectorFilter<Message | PartialMessage, []> })
        public handleUpdate(oldItem: Message | PartialMessage, newItem: Message | PartialMessage)
        private handleThreadDeletion(thread: ThreadChannel): void;
        private handleChannelDeletion(channel: Channel): void;
        private handleGuildDeletion(guild: Guild): void;
    }
    export class ModalSubmitCollector extends BaseCollector<string, ModalSubmitInteraction>{
        public channel: Channel
        constructor(client: Client, interaction: CommandInteraction | MessageComponentInteraction, options?: BaseCollectorOptions<ModalSubmitInteraction>)
        private handleGuildDeletion(guild: Guild): void;
        private handleChannelDeletion(channel: Channel): void;
        private handleThreadDeletion(thread: ThreadChannel): void;
    }
    export class MessageReactionCollector extends BaseCollector<string, MessageReaction | PartialMessageReaction, [user: User | PartialUser], MessageReactionCollectorEvents>{
        public message: Message | PartialMessage
        public users: Collection<string, User | PartialUser>
        constructor(client: Client, message: Message | PartialMessage, options?: BaseCollectorOptions<MessageReaction | PartialMessageReaction, [user: User | PartialUser]> & { removeFilter?: BetterCollectorFilter<MessageReaction | PartialMessageReaction, [user: User | PartialUser]> })
        private handleReactionEmojiRemove(emoji: MessageReaction | PartialMessageReaction): void;
        private handleMessageDeletion(message: PartialMessage | Message): void;
        private handleChannelDeletion(channel: Channel): void;
        private handleGuildDeletion(guild: Guild): void;
        private handleThreadDeletion(thread: ThreadChannel): void;
    }
    export function awaitApplicationCommands(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<CommandInteraction>): Promise<CommandInteraction>
    export function awaitAutocompletes(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<AutocompleteInteraction>): Promise<AutocompleteInteraction>
    export function awaitMessages(client: Client, channel: Channel, options?: BaseAsyncCollectorOptions<Message | PartialMessage>): Promise<Message | PartialMessage>
    export function awaitModalSubmits(client: Client, interaction: CommandInteraction | MessageComponentInteraction, options?: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction>
    export function awaitMessageComponents(client: Client, message: Message | PartialMessage, options?: BaseAsyncCollectorOptions<MessageComponentInteraction>): Promise<MessageComponentInteraction>
    export function awaitMessageReactions(client: Client, message: Message | PartialMessage, options?: BaseAsyncCollectorOptions<MessageReaction | PartialMessageReaction, [user: User | PartialUser]>): Promise<MessageReaction | PartialMessageReaction>
declare module "discord.js"{
    export interface TextBasedChannelFields{
        createApplicationCommandCollector(options: BaseCollectorOptions<CommandInteraction>): ApplicationCommandCollector;
        awaitApplicationCommands(options: BaseAsyncCollectorOptions<CommandInteraction>): Promise<CommandInteraction>;
        createAutocompleteCollector(options: BaseCollectorOptions<AutocompleteInteraction>): AutocompleteCollector;
        awaitAutocompletes(options: BaseAsyncCollectorOptions<AutocompleteInteraction>): Promise<AutocompleteInteraction>;
        createExtendedMessageCollector(options?: BaseCollectorOptions<Message | PartialMessage> & { updateFilter: BetterCollectorFilter<Message | PartialMessage> }): MessageCollector;
        extendedAwaitMessages(options?: BaseCollectorOptions<Message | PartialMessage> & { updateFilter: BetterCollectorFilter<Message | PartialMessage> }): Promise<Message | PartialMessage>;
    }
    export interface MessageComponentInteraction{
        createModalSubmitCollector(options: BaseCollectorOptions<ModalSubmitInteraction>): ModalSubmitCollector;
        extendedAwaitModalSubmits(options: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction>
    }
    export interface CommandInteraction{
        createModalSubmitCollector(options: BaseCollectorOptions<ModalSubmitInteraction>): ModalSubmitCollector;
        extendedAwaitModalSubmits(options: BaseAsyncCollectorOptions<ModalSubmitInteraction>): Promise<ModalSubmitInteraction>
    }
    export interface Message{
        createMessageReactionCollector(options: BaseCollectorOptions<MessageReaction | PartialMessageReaction, [user: User | PartialUser]> & { removeFilter: BetterCollectorFilter<MessageReaction | PartialMessageReaction, [user: User | PartialUser]> }): MessageReactionCollector;
        awaitMessageReactions(options: BaseAsyncCollectorOptions<MessageReaction | PartialMessageReaction, [user: User | PartialUser]>): Promise<MessageReaction | PartialMessageReaction>
    }
}