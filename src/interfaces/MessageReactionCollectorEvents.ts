import { BaseCollectorEvents } from "./BaseCollectorEvents";
import { MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";

export interface MessageReactionCollectorEvents extends BaseCollectorEvents<string, [reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser]>{
    remove(reaction: MessageReaction | PartialMessageReaction): any;
}