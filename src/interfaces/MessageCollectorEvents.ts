import { BaseCollectorEvents } from "./BaseCollectorEvents";
import { Message, PartialMessage } from "discord.js";

export interface MessageCollectorEvents extends BaseCollectorEvents<string, [message: Message | PartialMessage]>{
    update(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): any
}