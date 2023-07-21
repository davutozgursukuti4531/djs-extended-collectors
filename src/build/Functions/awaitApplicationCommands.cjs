"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApplicationCommandCollector = _interopRequireDefault(require("../Classes/ApplicationCommandCollector.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const awaitApplicationCommands = async (client, channel, options) => {
  return await new Promise((resolve, reject) => {
    const commandCollector = new _ApplicationCommandCollector.default(client, channel, {
      max: 1,
      time: options.time,
      collectFilter: options.collectFilter
    });
    commandCollector.on("collect", commandItem => {
      if (commandItem !== undefined) {
        resolve(commandItem);
      } else {
        reject(undefined);
      }
      commandCollector.stop("thisIsAsyncCollector");
    });
  });
};
var _default = awaitApplicationCommands;
exports.default = _default;