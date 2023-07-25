"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ApplicationCommandCollector", {
  enumerable: true,
  get: function () {
    return _ApplicationCommandCollector.default;
  }
});
Object.defineProperty(exports, "AutocompleteCollector", {
  enumerable: true,
  get: function () {
    return _AutocompleteCollector.default;
  }
});
Object.defineProperty(exports, "BaseCollector", {
  enumerable: true,
  get: function () {
    return _BaseCollector.default;
  }
});
Object.defineProperty(exports, "CollectorTimer", {
  enumerable: true,
  get: function () {
    return _CollectorTimer.default;
  }
});
Object.defineProperty(exports, "MessageCollector", {
  enumerable: true,
  get: function () {
    return _MessageCollector.default;
  }
});
Object.defineProperty(exports, "MessageReactionCollector", {
  enumerable: true,
  get: function () {
    return _MessageReactionCollector.default;
  }
});
Object.defineProperty(exports, "ModalSubmitCollector", {
  enumerable: true,
  get: function () {
    return _ModalSubmitCollector.default;
  }
});
Object.defineProperty(exports, "awaitApplicationCommands", {
  enumerable: true,
  get: function () {
    return _awaitApplicationCommands.default;
  }
});
Object.defineProperty(exports, "awaitAutocompletes", {
  enumerable: true,
  get: function () {
    return _awaitAutocompletes.default;
  }
});
Object.defineProperty(exports, "awaitMessageReactions", {
  enumerable: true,
  get: function () {
    return _awaitMessageReactions.default;
  }
});
Object.defineProperty(exports, "awaitMessages", {
  enumerable: true,
  get: function () {
    return _awaitMessages.default;
  }
});
Object.defineProperty(exports, "awaitModalSubmits", {
  enumerable: true,
  get: function () {
    return _awaitModalSubmits.default;
  }
});
var _discord = _interopRequireDefault(require("discord.js"));
var _BaseCollector = _interopRequireDefault(require("./Classes/Bases/BaseCollector.cjs"));
var _ApplicationCommandCollector = _interopRequireDefault(require("./Classes/ApplicationCommandCollector.cjs"));
var _AutocompleteCollector = _interopRequireDefault(require("./Classes/AutocompleteCollector.cjs"));
var _MessageCollector = _interopRequireDefault(require("./Classes/MessageCollector.cjs"));
var _ModalSubmitCollector = _interopRequireDefault(require("./Classes/ModalSubmitCollector.cjs"));
var _MessageReactionCollector = _interopRequireDefault(require("./Classes/MessageReactionCollector.cjs"));
var _awaitMessages = _interopRequireDefault(require("./Functions/awaitMessages.cjs"));
var _awaitModalSubmits = _interopRequireDefault(require("./Functions/awaitModalSubmits.cjs"));
var _awaitAutocompletes = _interopRequireDefault(require("./Functions/awaitAutocompletes.cjs"));
var _awaitApplicationCommands = _interopRequireDefault(require("./Functions/awaitApplicationCommands.cjs"));
var _awaitMessageReactions = _interopRequireDefault(require("./Functions/awaitMessageReactions.cjs"));
var _versionControl = _interopRequireDefault(require("./Utils/versionControl.cjs"));
var _djsVersionControl = _interopRequireDefault(require("./Utils/djsVersionControl.cjs"));
var _CollectorTimer = _interopRequireDefault(require("./Classes/Bases/CollectorTimer.cjs"));
var _stringColorizer = _interopRequireDefault(require("string-colorizer"));
var _MessageComponentCollector = _interopRequireDefault(require("./Classes/MessageComponentCollector.cjs"));
var _awaitMessageComponents = _interopRequireDefault(require("./Functions/awaitMessageComponents.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const colorizer = new _stringColorizer.default();
_discord.default.TextChannel.prototype.createApplicationCommandCollector = function (options) {
  return new _ApplicationCommandCollector.default(this.client, this, options);
};
_discord.default.TextChannel.prototype.awaitApplicationCommands = async function (options) {
  return await (0, _awaitApplicationCommands.default)(this.client, this, options);
};
_discord.default.TextChannel.prototype.createApplicationCommandCollector = function (options) {
  return new _AutocompleteCollector.default(this.client, this, options);
};
_discord.default.TextChannel.prototype.awaitApplicationCommands = async function (options) {
  return await (0, _awaitAutocompletes.default)(this.client, this, options);
};
_discord.default.TextChannel.prototype.createExtendedMessageCollector = function (options) {
  return new _MessageCollector.default(this.client, this, options);
};
_discord.default.TextChannel.prototype.extendedAwaitMessages = async function (options) {
  return await (0, _awaitMessages.default)(this.client, this, options);
};
_discord.default.VoiceChannel.prototype.createApplicationCommandCollector = function (options) {
  return new _ApplicationCommandCollector.default(this.client, this, options);
};
_discord.default.VoiceChannel.prototype.awaitApplicationCommands = async function (options) {
  return await (0, _awaitApplicationCommands.default)(this.client, this, options);
};
_discord.default.VoiceChannel.prototype.createApplicationCommandCollector = function (options) {
  return new _AutocompleteCollector.default(this.client, this, options);
};
_discord.default.VoiceChannel.prototype.awaitApplicationCommands = async function (options) {
  return await (0, _awaitAutocompletes.default)(this.client, this, options);
};
_discord.default.VoiceChannel.prototype.createExtendedMessageCollector = function (options) {
  return new _MessageCollector.default(this.client, this, options);
};
_discord.default.VoiceChannel.prototype.extendedAwaitMessages = async function (options) {
  return await (0, _awaitMessages.default)(this.client, this, options);
};
_discord.default.Message.prototype.createMessageReactionCollector = function (options) {
  return new _MessageReactionCollector.default(this.client, this, options);
};
_discord.default.Message.prototype.awaitMessageReactions = async function (options) {
  return await (0, _awaitMessageReactions.default)(this.client, this, options);
};
_discord.default.Message.prototype.createExtendedMessageComponentCollector = function (options) {
  return new _MessageComponentCollector.default(this.client, this, options);
};
_discord.default.Message.prototype.extendedAwaitMessageComponents = async function (options) {
  return await (0, _awaitMessageComponents.default)(this.client, this, options);
};
_discord.default.CommandInteraction.prototype.createModalSubmitCollector = function (options) {
  return new _ModalSubmitCollector.default(this.client, this.channel, options);
};
_discord.default.CommandInteraction.prototype.extendedAwaitModalSubmits = async function (options) {
  return await (0, _awaitModalSubmits.default)(this.client, this.channel, options);
};
_discord.default.MessageComponentInteraction.prototype.createModalSubmitCollector = function (options) {
  return new _ModalSubmitCollector.default(this.client, this.channel, options);
};
_discord.default.MessageComponentInteraction.prototype.extendedAwaitModalSubmits = async function (options) {
  return await (0, _awaitModalSubmits.default)(this.client, this.channel, options);
};
(0, _versionControl.default)(colorizer.styles.bright(colorizer.foregroundColors.red("The version of this Module is out of date. To update it: npm i djs-extended-collectors@latest")));
(0, _djsVersionControl.default)(colorizer.styles.bright(colorizer.foregroundColors.red("The version of Discord.js is not 14, To update it: npm i discord.js@latest")));