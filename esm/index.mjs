import BaseCollector from "../Classes/Bases/BaseCollector";
import ApplicationCommandCollector from "../Classes/ApplicationCommandCollector";
import AutocompleteCollector from"../Classes/AutoCompleteCollector";
import MessageCollector from "../Classes/MessageCollector";
import ModalSubmitCollector from "../Classes/ModalSubmitCollector";
import MessageReactionCollector from "../Classes/MessageReactionCollector";
import awaitMessages from "../Functions/awaitMessages";
import awaitModalSubmits from "../Functions/awaitModalSubmits";
import awaitAutoCompletes from "../Functions/awaitAutoCompletes";
import awaitApplicationCommands from "../Functions/awaitApplicationCommands";
import awaitMessageReactions from "../Functions/awaitMessageReactions"
import versionControl from "../Utils/versionControl";
import djsVersionControl from "../Utils/djsVersionControl";
import CollectorTimer from "../Classes/Bases/CollectorTimer"
import colorette from "colorette";



versionControl(colorette.red("The version of this Module is out of date. To update it: npm i djs-extended-collectors@latest"))
djsVersionControl(colorette.red("The version of Discord.js is not 14, To update it: npm i discord.js@14.x.x"))
export { BaseCollector, ApplicationCommandCollector, AutocompleteCollector, MessageCollector, ModalSubmitCollector, MessageReactionCollector, awaitAutoCompletes, awaitApplicationCommands, awaitMessages, awaitModalSubmits, awaitMessageReactions, CollectorTimer }
