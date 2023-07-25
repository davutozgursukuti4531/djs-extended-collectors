"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BaseCollector = _interopRequireDefault(require("./Bases/BaseCollector.cjs"));
var _CollectorError = _interopRequireDefault(require("./Errors/CollectorError.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Message
} = require("discord.js")
class MessageComponentCollector extends _BaseCollector.default {
  constructor(client, message, options = {
    time: Infinity
  }) {
    super(client, options)(!message || !(message instanceof Message)) ? new _CollectorError.default("Message is not defined or not valid.", {
      type: "TypeError"
    }).throw() : this.message = message;
    this.channel = message.channel;
    this.guild = this.channel.guild ? this.channel.guild : null;
    this.client.on("messageDelete", message => this.handleMessageDeletion(message));
    this.client.on("interactionCreate", interaction => {
      if (interaction.isMessageComponent()) {
        this.handleCollect(interaction);
      }
    });
    this.client.on("channelDelete", channel => this.handleChannelDeletion(channel));
    this.client.on("threadDelete", thread => this.handleThreadDeletion(thread));
    this.client.on("guildDelete", guild => this.handleGuildDeletion(guild));
    this.once("end", () => {
      this.client.off("messageDelete", message => this.handleMessageDeletion(message));
      this.client.off("interactionCreate", interaction => {
        if (interaction.isMessageComponent()) {
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
    if (this.timer.paused) return;
    if (item.channel && this.channel.id !== item.channel.id) return;
    if (item.message && item.message.id !== this.message.id) return;
    if (item.guild && this.guild.id !== item.guild.id) return;
    if (this.options.max && this.collected.size === this.options.max || this.options.max && this.collected.size > this.options.max) this.emit("limitFulled", this.collected);
    if (this.options.collectFilter && this.options.collectFilter(item) || !this.options.collectFilter) {
      if (this.emitted("limitFulled")) return;
      this.collected.set(item.id, item);
      this.emit("collect", item);
      this.idleTimer.resetTimer();
    }
  }
  handleGuildDeletion(guild) {
    if (this.channel.guild && guild.id === this.guild?.id) this.stop("guildDelete");
  }
  handleChannelDeletion(channel) {
    if (channel.id === this.channel.id) this.stop("channelDelete");
  }
  handleThreadDeletion(thread) {
    if (this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete");
  }
  handleMessageDeletion(message) {
    if (this.message.id === message.id) this.stop("messageDelete");
  }
}
exports.default = MessageComponentCollector;