import { MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import { BaseCollectorOptions } from "./BaseCollectorOptions";
import { BetterCollectorFilter } from "../types/BetterCollectorFilter";

export interface MessageReactionCollectorOptions extends BaseCollectorOptions<[reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser]>{
    removeFilter?: BetterCollectorFilter<[reaction: MessageReaction | PartialMessageReaction]>
}