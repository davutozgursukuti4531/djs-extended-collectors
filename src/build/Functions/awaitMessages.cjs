"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MessageCollector = _interopRequireDefault(require("../Classes/MessageCollector.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const awaitMessages = async (client, channel, options) => {
  return await new Promise((resolve, reject) => {
    const messageCollector = new _MessageCollector.default(client, channel, {
      max: 1,
      time: options.time,
      collectFilter: options.collectFilter,
      updateFilter: options.updateFilter
    });
    messageCollector.on("collect", msgItem => {
      if (msgItem) {
        resolve(msgItem);
      } else {
        reject(undefined);
      }
      messageCollector.stop("thisIsAsyncCollector");
    });
  });
};
exports.default = awaitMessages;