"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AutocompleteCollector = _interopRequireDefault(require("../Classes/AutocompleteCollector.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const awaitAutocompletes = async (client, channel, options) => {
  return await new Promise((resolve, reject) => {
    const autocompleteCollector = new _AutocompleteCollector.default(client, channel, {
      max: 1,
      time: options.time,
      collectFilter: options.collectFilter
    });
    autocompleteCollector.on("collect", autocompleteItem => {
      if (autocompleteItem !== undefined) {
        resolve(autocompleteItem);
      } else {
        reject(undefined);
      }
      autocompleteCollector.stop("thisIsAsyncCollector");
    });
  });
};
var _default = awaitAutocompletes;
exports.default = _default;