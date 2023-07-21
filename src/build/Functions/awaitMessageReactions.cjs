"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _MessageReactionCollector = _interopRequireDefault(require("../Classes/MessageReactionCollector.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const awaitMessageReactions = async (client, message, options) => {
  return await new Promise((resolve, reject) => {
    const reactionCollector = new _MessageReactionCollector.default(client, message, {
      max: 1,
      time: options.time,
      collectFilter: options.collectFilter
    });
    reactionCollector.on("collect", reactionItem => {
      if (reactionItem !== undefined) {
        resolve(reactionItem);
      } else {
        reject(undefined);
      }
      reactionCollector.stop("thisIsAsyncCollector");
    });
  });
};
var _default = awaitMessageReactions;
exports.default = _default;