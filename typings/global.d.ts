import { UnityEmitter } from "unityemitter";
import NodeTimer from "node:timers"
import { Message, PartialMessage, CommandInteraction, Guild, Client, ThreadChannel, MessageComponentInteraction, AutocompleteInteraction, ModalSubmitInteraction, CollectorFilter, Channel, User, MessageReaction, PartialMessageReaction, PartialUser, Collection } from "discord.js";


declare module "discord.js"{
    export type BetterCollectorFilter<I extends [...items: any[]] = [...items: any[]]> = (...items: I) => boolean;
    export interface BaseCollectorEvents<K, VT extends any[]>{
        collect: (...items: VT) => any;
        dispose: (...items: VT) => any;
        end: (collected: Collection<K, VT>, reason: string) => any;
        paused: (collected: Collection<K, VT>) => any;
        resumed: (collected: Collection<K, VT>) => any
    }
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
    export interface MessageReactionCollectorEvents extends BaseCollectorEvents<string, [reaction: MessageReaction | PartialMessageReaction, user: User | PartialMessageReaction]>{
        remove: (reaction: MessageReaction | PartialMessageReaction) => any;
    }
    export interface MessageCollectorEvents extends BaseCollectorEvents<string, [message: Message | PartialMessage]>{
        update: (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => any
    }
    export interface BaseAsyncCollectorOptions<MV extends [...items: any[]] = [...items: any[]]> {
        collectFilter?: BetterCollectorFilter<MV>
        time?: number
        idleTime?: number
    }
    export interface CollectorTimerEvents {
        end: () => any;
        paused: () => any;
        resumed: () => any;
    }
    export interface AsyncMessageCollectorOptions extends BaseAsyncCollectorOptions<[message: Message | PartialMessage]>{
        updateFilter?: BetterCollectorFilter<[oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage]>
    }
    export class CollectorTimer extends UnityEmitter<CollectorTimerEvents> {
        defaultTimeout: NodeJS.Timer;
        ms: number;
        ended: boolean;
        remainingTime: number;
        paused: boolean;
        fn: Function;
        constructor(fn: Function, ms: number);
        resetTimer(): void;
        pauseTimer(): void;
        resumeTimer(): void;
        stopTimer(): void;
        handleEnd(): void;
    }
    export class BaseCollector<K extends any, MV extends [...items: any[]], Events extends BaseCollectorEvents<K, MV> = BaseCollectorEvents<K, MV>> extends UnityEmitter<Events> {
        client: Client;
        collectorOptions: BaseCollectorOptions<MV>;
        collected: Collection<K, MV>;
        ended: boolean;
        endReason: string;
        timer: CollectorTimer;
        idleTimer: CollectorTimer;
        constructor(client: Client, options: BaseCollectorOptions<MV>);
        handleCollect(...items: MV extends [...items: infer P] ? P : never): void;
        handleDispose(...items: MV extends [...items: infer P] ? P : never): void;
        stop(reason: string): void;
        resetTimer(): void;
        pauseTimer(): void;
        resumeTimer(): void;
    }
    export class ApplicationCommandCollector extends BaseCollector<string, [cmdIntr: CommandInteraction<CacheType>]> {
        channel: TextBasedChannel;
        guild: Guild | null;
        constructor(client: Client, channel: TextBasedChannel, options: BaseCollectorOptions<[cmdIntr: CommandInteraction<CacheType>]>);
        public handleCollect(cmdIntr: CommandInteraction<CacheType>): void;
        private handleGuildDeletion(guild: Guild): void;
        private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel): void;
        private handleThreadDeletion(thread: ThreadChannel): void;
    }
        export class AutocompleteCollector extends BaseCollector<string, [autocompleteIntr: AutocompleteInteraction]> {
            channel: TextBasedChannel;
            guild: Guild | null;
            constructor(client: Client, channel: TextBasedChannel, options: BaseCollectorOptions<[autocompleteIntr: AutocompleteInteraction<CacheType>]>);
            public handleCollect(autocompleteIntr: AutocompleteInteraction): void;
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export class MessageComponentCollector extends BaseCollector<string, [messageComponentIntr: MessageComponentInteraction]> {
            message: Message;
            channel: TextBasedChannel;
            guild: Guild | null;
            constructor(client: Client, message: Message, options: BaseCollectorOptions<[messageComponentIntr: MessageComponentInteraction]>);
            public handleCollect(messageComponentIntr: MessageComponentInteraction): void;
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
            private handleMessageDeletion(message: Message | PartialMessage): void;
        }
        export class MessageCollector extends BaseCollector<string, [message: Message | PartialMessage], MessageCollectorEvents> {
            channel: TextBasedChannel;
            guild: Guild | null;
            collectorOptions: MessageCollectorOptions;
            constructor(client: Client, channel: TextBasedChannel, options: MessageCollectorOptions);
            public handleCollect(message: Message | PartialMessage): void;
            public handleDispose(message: Message | PartialMessage): void;
            public handleUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): void;
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export class ModalSubmitCollector extends BaseCollector<string, [modalSubmitInteraction: ModalSubmitInteraction]> {
            interaction: MessageComponentInteraction | CommandInteraction;
            guild: Guild | null;
            channel: TextBasedChannel | null;
            constructor(client: Client, interaction: MessageComponentInteraction | CommandInteraction, options?: BaseCollectorOptions<[modalSubmitInteraction: ModalSubmitInteraction]>);
            public handleCollect(modalSubmitInteraction: ModalSubmitInteraction): void;
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
        }
        export class MessageReactionCollector extends BaseCollector<string, [reaction: MessageReaction | PartialMessageReaction, user: User], MessageReactionCollectorEvents> {
            message: Message;
            channel: TextBasedChannel;
            guild: Guild | null;
            users: Collection<string, User | PartialUser>;
            collectorOptions: MessageReactionCollectorOptions;
            constructor(client: Client, message: Message, options: MessageReactionCollectorOptions);
            public handleCollect(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void;
            public handleReactionEmojiRemove(reaction: MessageReaction | PartialMessageReaction): void;
            public handleDispose(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void;
            private handleGuildDeletion(guild: Guild): void;
            private handleChannelDeletion(channel: DMChannel | NonThreadGuildBasedChannel): void;
            private handleThreadDeletion(thread: ThreadChannel): void;
            private handleMessageDeletion(message: Message | PartialMessage): void;
        }
        export function awaitApplicationCommands(client: Client, channel: TextBasedChannel, options: BaseAsyncCollectorOptions<[cmdIntr: CommandInteraction<CacheType>]>): Promise<CommandInteraction>
        export function awaitAutocompletes(client: Client, channel: TextBasedChannel, options: BaseAsyncCollectorOptions<[autocompleteIntr: AutocompleteInteraction<CacheType>]>): Promise<AutocompleteInteraction>
        export function awaitMessages(client: Client, channel: TextBasedChannel, options: AsyncMessageCollectorOptions): Promise<Message | PartialMessage>
        export function awaitModalSubmits(client: Client, interaction: MessageComponentInteraction | CommandInteraction, options: BaseAsyncCollectorOptions<[modalSubmitInteraction: ModalSubmitInteraction]>): Promise<ModalSubmitInteraction>
        export function awaitMessageComponents(client: Client, message: Message | PartialMessage, options: BaseAsyncCollectorOptions<[messageComponentIntr: MessageComponentInteraction]>): Promise<MessageComponentInteraction>
        export function awaitMessageReactions(client: Client, message: Message | PartialMessage, options: BaseAsyncCollectorOptions<[reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser]>): Promise<[reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser]>
}