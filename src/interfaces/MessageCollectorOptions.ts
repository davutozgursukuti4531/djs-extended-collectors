import { Message, PartialMessage } from "discord.js";
import { BaseCollectorOptions } from "./BaseCollectorOptions";
import { BetterCollectorFilter } from "../types/BetterCollectorFilter";

export interface MessageCollectorOptions extends BaseCollectorOptions<[message: Message | PartialMessage]>{
    updateFilter?: BetterCollectorFilter<[oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage]>
}