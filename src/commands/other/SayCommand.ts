import { Message } from "discord.js";
import { client } from "../..";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";

export default class SayCommand extends BaseCommand {
  constructor() {
    super("say", "Utility", "Says whatever the user says", [client.prefix]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send(message.content.startsWith(client.prefix + "say")
      ? message.content.slice(client.prefix.length + 3)
      : message.content.slice(client.prefix.length * 2));
  }
}
