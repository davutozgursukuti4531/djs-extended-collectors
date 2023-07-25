"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const versionControl = async warmMessage => {
  const thisVersion = require("../../../package.json").version
  const latestVersion = await fetch("https://registry.npmjs.org/djs-extended-collectors").then(async m => m.json().then(v => v["dist-tags"].latest));
  if (thisVersion !== latestVersion) {
    console.log(warmMessage);
  } else {
    return;
  }
};
exports.default = versionControl;