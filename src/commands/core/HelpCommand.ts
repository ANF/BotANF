import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";
import EmbedColor from "../../utils/helper/EmbedColor";

export default class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "User", "Shows a list of commands", ["commands"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    // TODO: Write the help command and program the logic.
    const helpEmbed: MessageEmbed = new MessageEmbed({
      color: EmbedColor.NULL,
    });
    BaseCommand.commandNames.forEach((value, index) => {
      // This part is fine but as more commands get added,
      // the embed amount needs to be limited, perhaps
      // somewhere around 5 commands per embed and
      // I think we should do a reaction embed
      // as it has been requested a lot of times.
      helpEmbed.addField(value, BaseCommand.commandDescriptions[index], false);
    });
    message.channel.send(helpEmbed);
  }
}
