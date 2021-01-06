import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";

export default class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "User", "Shows a list of commands", ["commands"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    // TODO: Write the help command and program the logic.
  }
}
