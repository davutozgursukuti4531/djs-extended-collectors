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
  Collection,
  Message
} = await import("discord.js").catch(e => new _VersionError.default(`The package named \`discord.js\` has not been downloaded. to download: npm i discord.js@latest`, {
  type: "UnvalidVersion"
})).then((v) => v);
class MessageReactionCollector extends _BaseCollector.default {
  constructor(client, message, options) {
    super(client, options)(channel === undefined || !(channel instanceof Message)) ? new _CollectorError.default("Message is not defined or not valid.", {
      type: "TypeError"
    }) : this.channel = channel;
    this.guild = message.guild ? message.guild : null;
    this.users = new Collection();
    this.client.on("messageReactionAdd", (reaction, user) => this.handleCollect(reaction, user));
    this.client.on("messageReactionRemove", (reaction, user) => this.handleDispose(reaction, user));
    this.client.on("messageReactionRemoveEmoji", reaction => this.handleReactionEmojiRemove(reaction));
    this.client.on("messageDelete", m => this.handleMessageDeletion(m));
    this.client.on("messageDeleteBulk", messages => messages.forEach(m => this.handleMessageDeletion(m)));
    this.client.on("guildDelete", guild => this.handleGuildDeletion(guild));
    this.client.on("channelDelete", channel => this.handleChannelDeletion(channel));
    this.client.on("threadDelete", thread => this.handleThreadDeletion(thread));
    this.once("end", () => {
      this.client.on("messageReactionAdd", (reaction, user) => this.handleCollect(reaction, user));
      this.client.on("messageReactionRemove", (reaction, user) => this.handleDispose(reaction, user));
      this.client.on("messageReactionRemoveEmoji", reaction => this.handleReactionEmojiRemove(reaction));
      this.client.on("messageDelete", m => this.handleMessageDeletion(m));
      this.client.on("messageDeleteBulk", messages => messages.forEach(m => this.handleMessageDeletion(m)));
      this.client.on("guildDelete", guild => this.handleGuildDeletion(guild));
      this.client.on("channelDelete", channel => this.handleChannelDeletion(channel));
      this.client.on("threadDelete", thread => this.handleThreadDeletion(thread));
    });
  }
  handleCollect(reaction, user) {
    if (this.ended) return;
    if (reaction.message.id !== this.message.id) return;
    if (this.options.max && this.collected.size === this.options.max || this.options.max && this.collected.size > this.options.max) this.emit("limitFulled", this.collected);
    if (this.options.collectFilter && this.options.collectFilter(reaction, user) || !this.options.collectFilter) {
      if (this.emitted("limitFulled")) return;
      this.collected.set(reaction.emoji.id, reaction);
      this.users.set(user.id, user);
      this.emit("collect", reaction, user);
    }
  }
  handleReactionEmojiRemove(reaction) {
    if (this.ended) return;
    if (reaction.message.id !== this.message.id) return;
    if (this.options.removeFilter && this.options.removeFilter(reaction) || !this.options.removeFilter) {
      this.emit("remove", reaction);
      this.collected.delete(reaction.emoji.id);
    }
  }
  handleDispose(reaction, user) {
    if (this.ended) return;
    if (reaction.message.id !== this.message.id) return;
    if (!this.options.dispose) return;
    if (this.options.disposeFilter && this.options.disposeFilter(reaction, user) || !this.options.disposeFilter) {
      this.collected.delete(reaction.emoji.id);
      this.users.delete(user.id);
      this.emit("dispose", reaction, user);
    }
  }
  handleMessageDeletion(message) {
    if (this.message.id === message.id) this.stop("messageDelete");
  }
  handleChannelDeletion(channel) {
    if (this.message.channel.id === channel.id) this.stop("channelDelete");
  }
  handleGuildDeletion(guild) {
    if (this.message.guild && this.message.guild.id === guild.id) this.stop("guildDelete");
  }
  handleThreadDeletion(thread) {
    if (this.message.channel.isThread() && this.message.channel.id === thread.id) this.stop("threadDelete");
  }
}
var _default = MessageReactionCollector;
exports.default = _default;