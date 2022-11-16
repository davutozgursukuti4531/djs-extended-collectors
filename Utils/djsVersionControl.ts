const djsVersionControl = async(warmMessage: string) => {
    const thisVersion = require("discord.js/package.json").version
    if(!thisVersion.startsWith("14")){
        console.log(warmMessage)
    } else {
        return;
    }
}


export default djsVersionControl