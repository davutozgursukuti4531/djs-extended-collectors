import versionControl from "./Utils/versionControl"
import ApplicationCommandCollector from "./Classes/ApplicationCommandCollector"
import MessageCollector from "./Classes/MessageCollector"
import BaseCollector from "./Classes/BaseCollector"
import colorette from "colorette"


versionControl(colorette.red('This module version is not current. If you want to update: use "npm i djs-extended-collectors@latest" in your terminal.'))
export { ApplicationCommandCollector, MessageCollector, BaseCollector }
