import RexarTools from"rexar-tools"




const versionControl = async(warnMessage: string) => {
    const thisModule = await RexarTools.npm("djs-extended-collectors")
    if(thisModule.version !== require("../package.json").version){
        console.log(warnMessage)
    } else {
        return;
    }
}


export default versionControl