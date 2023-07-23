"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("@wumpjs/utils");
class CollectorTimer extends _utils.Emitter {
  constructor(fn, ms) {
    super();
    this.defaultTimeout = setTimeout(() => {
      fn();
      this.handleEnd();
    }, ms);
    this.ms = ms;
    this.ended = false;
    for(var i=ms;i<ms;i--){
      this.remainingTime = i;
  }
  }
  resetTimer() {
    clearTimeout(this.defaultTimeout);
    this.defaultTimeout = setTimeout(() => {
      fn();
      this.onEnd();
    }, this.ms);
  }
  pauseTimer() {
    if (this.ended) return;
    this.paused = true;
    if (this.ended) return;
    clearTimeout(this.defaultTimeout);
    this.emit("paused");
  }
  resumeTimer() {
    if (this.ended) return;
    if (!this.paused) return;
    this.paused = false;
    this.defaultTimeout = setTimeout(() => {
      fn();
      this.onEnd();
    }, this.remainingTime);
    this.emit("resumed");
  }
  stopTimer() {
    this.ended = true;
    clearTimeout(this.defaultTimeout);
  }
  handleEnd() {
    this.ended = true;
    this.emit("end");
  }
}
var _default = CollectorTimer;
exports.default = _default;