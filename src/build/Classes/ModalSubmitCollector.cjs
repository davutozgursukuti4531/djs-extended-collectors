"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BaseCollector = _interopRequireDefault(require("./Bases/BaseCollector.cjs"));
var _CollectorError = _interopRequireDefault(require("./Errors/CollectorError.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  TextChannel, VoiceChannel
} = require("discord.js")
class ModalSubmitCollector extends _BaseCollector.default {
  constructor(client, channel, options = {
    time: Infinity
  }) {
    super(client, options)
    (!channel || !(channel instanceof TextChannel) || !(channel instanceof VoiceChannel)) ? new _CollectorError.default("Channel is not defined or not valid.", {
      type: "TypeError"
    }).throw() : this.channel = channel;
    this.guild = channel.guild ? channel.guild : null;
    this.client.on("interactionCreate", interaction => {
      if (interaction.isModalSubmit()) {
        this.handleCollect(interaction);
      }
    });
    this.client.on("channelDelete", channel => this.handleChannelDeletion(channel));
    this.client.on("threadDelete", thread => this.handleThreadDeletion(thread));
    this.client.on("guildDelete", guild => this.handleGuildDeletion(guild));
    this.once("end", () => {
      this.client.off("interactionCreate", interaction => {
        if (interaction.isModalSubmit()) {
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
    if (this.guild && this.guild.id === guild.id) this.stop("guildDelete");
  }
  handleChannelDeletion(channel) {
    if (channel.id === this.channel.id) this.stop("channelDelete");
  }
  handleThreadDeletion(thread) {
    if (this.channel.isThread() && thread.id === this.channel.id) this.stop("threadDelete");
  }
}
exports.default = ModalSubmitCollector;