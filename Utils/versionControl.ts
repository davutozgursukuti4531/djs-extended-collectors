import RexarTools from "rexar-tools"




const versionControl = async(warmMessage: string): Promise<void> => {
    const thisVersion = require("../package.json").version
    const latestVersion = await RexarTools.npm("djs-extended-collectors").then((m) => m.version)
    if(thisVersion !== latestVersion){
        console.log(warmMessage)
    } else {
        return;
    }
}


export default versionControl