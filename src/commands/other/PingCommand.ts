import { Message } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";

export default class PingCommand extends BaseCommand {
  constructor() {
    super("ping", "Utility", "Displays the current latency of the bot.", [
      "latency",
      "pong",
    ]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send({
      embed: {
        color: 3092790,
        description: `The current latency is \`${client.ws.ping}\`ms`,
      },
    });
  }
}
