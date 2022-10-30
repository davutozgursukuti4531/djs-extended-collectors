import TypedEventEmitter from "typed-emitter";
import EventEmitter from "node:events"
import { Message, PartialMessage, CommandInteraction, Guild, TextBasedChannel, LimitedCollection, Client } from "discord.js";
import { BaseCollectorEvents, BaseCollectorOptions } from "./Types";



declare module "djs-extended-collectors"{
    class BaseCollector<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>> extends (EventEmitter as new<K extends any, V extends any, Events extends BaseCollectorEvents<K, V> = BaseCollectorEvents<K, V>>() => TypedEmitter<Events> )<K, V, Events>{
    public client: Client<boolean>;
    public options: BaseCollectorOptions;
    public endReason: string;
    private __timer: NodeJS.Timeout;
    public collected: LimitedCollection<K, V>
    public ended: boolean;
    constructor(client: Client, options: BaseCollectorOptions)
    public handleCollect(item: V)
    public stop(reason: string)
    public handleDispose(item: V | any)
    public resetTimer()
    }
    export class MessageCollector extends BaseCollector<string, Message | PartialMessage>{
    channel: TextBasedChannel;
    constructor(client, channel: TextBasedChannel, options)
    private handleCollect(item: Message<boolean> | PartialMessage)
    private handleDispose(item: Message<boolean> | PartialMessage)
    private __handleUpdate(oldItem: Message<boolean> | PartialMessage, newItem: Message<boolean>| PartialMessage)
    private __handleThreadDeletion(thread: AnyThreadChannel)
    private __handleChannelDeletion(channel: Channel)
    private __handleGuildDeletion(guild: Guild)
    }
    export class ApplicationCommandCollector extends BaseCollector<string, CommandInteraction>{
    channel: TextBasedChannel
    guild: Guild
    constructor(client: Client, channel: TextBasedChannel, options: BaseCollectorOptions)
    private handleCollect(item: CommandInteraction<CacheType>)
    private __handleGuildDeletion(guild: Guild)
    private __handleChannelDeletion(channel: Channel)
    private __handleThreadDeletion(thread: AnyThreadChannel)
    }
}