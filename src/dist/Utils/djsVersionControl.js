import Colorizer from"string-colorizer";
import VersionError from "../Classes/Errors/VersionError.js";
const colorizer = new Colorizer()



const djsVersionControl = async(warmMessage) => {
    const thisVersion = await import("discord.js/package.json", {
        assert: {
            type: "json"
        }
    }).catch((e) => {
        throw new VersionError(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {type: "UnvalidVersion" })
    }).then((v) => v.default.version)
    if(!thisVersion.startsWith("14")){
        console.log(warmMessage)
    } else {
        return;
    }
}


export default djsVersionControl
