"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ModalSubmitCollector = _interopRequireDefault(require("../Classes/ModalSubmitCollector.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const awaitModalSubmits = async (client, channel, options) => {
  return await new Promise((resolve, reject) => {
    const modalSubmitCollector = new _ModalSubmitCollector.default(client, channel, {
      max: 1,
      time: options.time,
      collectFilter: options.collectFilter
    });
    modalSubmitCollector.on("collect", modalItem => {
      if (modalItem !== undefined) {
        resolve(modalItem);
      } else {
        reject(undefined);
      }
      modalSubmitCollector.stop("thisIsAsyncCollector");
    });
  });
};
var _default = awaitModalSubmits;
exports.default = _default;