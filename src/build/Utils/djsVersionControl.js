"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stringColorizer = _interopRequireDefault(require("string-colorizer"));
var _VersionError = _interopRequireDefault(require("../Classes/Errors/VersionError.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const colorizer = new _stringColorizer.default();
const djsVersionControl = async warmMessage => {
  const thisVersion = await import("discord.js/package.json", {
    assert: {
      type: "json"
    }
  }).catch(e => {
    throw new _VersionError.default(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {
      type: "UnvalidVersion"
    });
  }).then(v => v.default.version);
  if (!thisVersion.startsWith("15")) {
    console.log(warmMessage);
  } else {
    return;
  }
};
var _default = djsVersionControl;
exports.default = _default;