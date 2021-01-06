import { Message } from "discord.js";
import { client } from "../..";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";

export default class SayCommand extends BaseCommand {
  constructor() {
    super("say", "Utility", "Says whatever the user says", [client.prefix]);
  }

  // TODO: Fix a bug where new line doesn't work in sent messages.
  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send(args.join(" "));
  }
}
