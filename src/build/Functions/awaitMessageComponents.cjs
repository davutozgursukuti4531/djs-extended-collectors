"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MessageComponentCollector = _interopRequireDefault(require("../Classes/MessageComponentCollector.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const awaitMessageComponents = async (client, message, options) => {
  return await new Promise((resolve, reject) => {
    const componentCollector = new _MessageComponentCollector.default(client, message, {
      max: 1,
      time: options.time,
      collectFilter: options.collectFilter
    });
    componentCollector.on("collect", componentItem => {
      if (componentItem) {
        resolve(componentItem);
      } else {
        reject(undefined);
      }
      componentCollector.stop("thisIsAsyncCollector");
    });
  });
};
exports.default = awaitMessageComponents;