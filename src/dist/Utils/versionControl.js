const versionControl = async(warmMessage) => {
    const thisVersion = await import("../../../package.json", {
        assert: {
            type: "json"
        }
    }).then((v) => v.default.version)
    const latestVersion = await fetch("https://registry.npmjs.org/djs-extended-collectors").then(async(m) => (await m.json())["dist-tags"].version)
    if(thisVersion !== latestVersion){
        console.log(warmMessage)
    } else {
        return;
    }
}


export default versionControl
