import RexarTools from "rexar-tools"




const versionControl = async(warnMessage: string): Promise<void> => {
    const thisVersion = require("../package.json").version
    const latestVersion = await RexarTools.npm("djs-extended-collectors").then((m) => m.version)
    if(thisVersion !== latestVersion){
        console.log(warnMessage)
    } else {
        return;
    }
}


export default versionControl
