import versionControl from "../Utils/versionControl.js"
import djsVersionControl from "../Utils/djsVersionControl.js"
import ApplicationCommandCollector from "../Classes/ApplicationCommandCollector.js"
import MessageCollector from "../Classes/MessageCollector.js"
import BaseCollector from "../Classes/Bases/BaseCollector.js"
import colorette from "colorette"


versionControl(colorette.red('This module version is not current. If you want to update: use "npm i djs-extended-collectors@latest" in your terminal.'))
djsVersionControl(colorette.red('Discord.js version requires a minimum of 14.0.0 or higher. If you want to update: use "npm i discord.js@latest" in your terminal.'))

export { ApplicationCommandCollector, MessageCollector, BaseCollector }
