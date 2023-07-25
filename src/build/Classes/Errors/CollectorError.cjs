"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CustomError = _interopRequireDefault(require("./CustomError.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CollectorError extends _CustomError.default {}
exports.default = CollectorError;