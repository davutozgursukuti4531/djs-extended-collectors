"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _VersionError = _interopRequireDefault(require("../Classes/Errors/VersionError.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const djsVersionControl = async warmMessage => {
  const thisVersion = await import("discord.js/package.json", {
    assert: {
      type: "json"
    }
  }).catch(e => {
    throw new _VersionError.default(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {
      type: "InvalidVersion"
    });
  }).then(v => v.default.version);
  if (!thisVersion.startsWith("14")) {
    console.log(warmMessage);
  } else {
    return;
  }
};
exports.default = djsVersionControl;