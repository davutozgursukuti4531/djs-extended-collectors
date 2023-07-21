"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _BaseCollector = _interopRequireDefault(require("./Bases/BaseCollector.cjs"));
var _CollectorError = _interopRequireDefault(require("./Errors/CollectorError.cjs"));
var _VersionError = _interopRequireDefault(require("./Errors/VersionError.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Channel
} = await import("discord.js").catch(e => new _VersionError.default(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {
  type: "UnvalidVersion"
})).then((v) => v);
class AutocompleteCollector extends _BaseCollector.default {
  constructor(client, channel, options = {
    time: Infinity
  }) {
    super(client, options)(channel === undefined || !(channel instanceof Channel)) ? new _CollectorError.default("Channel is not defined or not valid.", {
      type: "TypeError"
    }) : this.channel = channel;
    this.guild = channel.guild ? channel.guild : null;
    this.client.on("interactionCreate", interaction => {
      if (interaction.isAutocomplete()) {
        this.handleCollect(interaction);
      }
    });
    this.client.on("channelDelete", channel => this.handleChannelDeletion(channel));
    this.client.on("threadDelete", thread => this.handleThreadDeletion(thread));
    this.client.on("guildDelete", guild => this.handleGuildDeletion(guild));
    this.once("end", () => {
      this.client.off("interactionCreate", interaction => {
        if (interaction.isAutocomplete()) {
          this.handleCollect(interaction);
        }
      });
      this.client.off("channelDelete", channel => this.handleChannelDeletion(channel));
      this.client.off("threadDelete", thread => this.handleThreadDeletion(thread));
      this.client.off("guildDelete", guild => this.handleGuildDeletion(guild));
    });
  }
  handleCollect(item) {
    if (this.ended) return;
    if (item.channel && this.channel.id !== item.channel.id) return;
    if (this.guild && item.guild && this.guild.id !== item.guild.id) return;
    if (this.options.max && this.collected.size === this.options.max || this.collected.size > this.options.max) this.emit("limitFulled", this.collected);
    if (this.options.collectFilter && this.options.collectFilter(item) || !this.options.collectFilter) {
      if (this.emitted("limitFulled")) return;
      this.collected.set(item.id, item);
      this.emit("collect", item);
    }
  }
  handleGuildDeletion(guild) {
    if (this.guild && this.guild.id === guild.id) this.stop("guildDelete");
  }
  handleChannelDeletion(channel) {
    if (channel.id === this.channel.id) this.stop("channelDelete");
  }
  handleThreadDeletion(thread) {
    if (this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete");
  }
}
var _default = AutocompleteCollector;
exports.default = _default;