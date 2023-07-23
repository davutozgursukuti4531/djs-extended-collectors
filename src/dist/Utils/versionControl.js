const versionControl = async(warmMessage) => {
    const thisVersion = await import("../../../package.json", {
        assert: {
            type: "json"
        }
    }).then((v) => v.default.version)
    const latestVersion = await fetch("https://registry.npmjs.org/djs-extended-collectors").then(async(m) => m.json().then((v) => v["dist-tags"].latest))
    if(thisVersion !== latestVersion){
        console.log(warmMessage)
    } else {
        return;
    }
}


export default versionControl
