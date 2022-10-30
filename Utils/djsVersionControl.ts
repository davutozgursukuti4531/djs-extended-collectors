import rexarTools from"rexar-tools"





const djsVersionControl = async(warnMessage) => {
    if(require("discord.js") === undefined || rexarTools.numberify(require("discord.js/package.json").version) < 14){
        console.log(warnMessage)
    } else {
        return;
    }
}


export default djsVersionControl