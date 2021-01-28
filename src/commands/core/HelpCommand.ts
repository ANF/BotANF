import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";
import EmbedColor from "../../utils/helper/EmbedColor";

export default class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "User", "Shows a list of commands", ["commands"]);
  }

  // TODO: Write the help command and program the logic.
  async run(client: DiscordClient, message: Message, args: Array<string>) {
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

/*
      if (BaseCommand.commandInfo[index][2] == false  // If the command isn't hidden,
          && embedFields < 5) { // and the fields number in the current embed is less than 5.
        helpEmbed.addField(value[0], // The name of the command.
          value[1], // The description of the command.
          false); // This is the inline value; for the discord embed.
        ++embedFields; // Increment this value.
*/