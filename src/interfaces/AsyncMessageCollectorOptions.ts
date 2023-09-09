import { Message, PartialMessage } from "discord.js";
import { BaseAsyncCollectorOptions } from "./BaseAsyncCollectorOptions";
import { BetterCollectorFilter } from "../types/BetterCollectorFilter";

export interface AsyncMessageCollectorOptions extends BaseAsyncCollectorOptions<[message: Message | PartialMessage]>{
    updateFilter?: BetterCollectorFilter<[oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage]>
}