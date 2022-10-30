import versionControl from "./Utils/versionControl"
import djsVersionControl from "./Utils/djsVersionControl"
import ApplicationCommandCollector from "./Classes/ApplicationCommandCollector"
import MessageCollector from "./Classes/MessageCollector"
import BaseCollector from "./Classes/Bases/BaseCollector"
import colorette from "colorette"


versionControl(colorette.red('This module version is not current. If you want to update: use "npm i djs-extended-collectors@latest" in your terminal.'))
djsVersionControl(colorette.red('Discord.js version requires a minimum of 14.0.0 or higher. If you want to update: use "npm i discord.js@latest" in your terminal.'))
export { ApplicationCommandCollector, MessageCollector, BaseCollector }