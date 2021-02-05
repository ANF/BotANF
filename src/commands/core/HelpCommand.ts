import {Message, MessageEmbed} from "discord.js";
import BaseCommand, {Categories} from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";
import EmbedColor from "../../utils/helper/EmbedColor";
import logger, {logLevel} from "../../utils/helper/logger";

export default class HelpCommand extends BaseCommand {
    constructor() {
        super("help", "User", "Shows a list of commands", ["commands"]);
    }

    // TODO: Write the help command and program the logic.
    async run(client: DiscordClient, message: Message, args: Array<string>) {
        logger.log(``, logLevel.debug, 'HelpCommand')
        let embedFields = 0;
        const helpEmbed: MessageEmbed = new MessageEmbed({
            color: EmbedColor.NULL,
            title: 'Help Command'
        });
        if (args.includes("Utility")
            || args.includes("Moderation")
            || args.includes("User")
            || "Custom Commands") {

        } else {
            for (let item in Categories) {
                switch (item) {
                    case Categories.Utility:
                        helpEmbed.addField(item, 'Utilities for the bot', false);
                        break;
                    case Categories.User:
                        helpEmbed.addField(item, 'User commands for them to customize', false);
                        break;
                    case Categories.Moderation:
                        helpEmbed.addField(item, 'Moderation Commands', false);
                        break;
                    case Categories.CustomCommands:
                        helpEmbed.addField(item, 'Custom user commands', false);
                        break;
                }
            }
            BaseCommand.commandInfo.forEach((value, index) => {
                // This part is fine but as more commands get added,
                // the embed amount needs to be limited, perhaps
                // somewhere around 5 commands per embed and
                // I think we should do a reaction embed
                // as it has been requested a lot of times.
                if (!BaseCommand.commandInfo[index][2]  // If the command isn't hidden,
                    && embedFields < 5) { // and the fields number in the current embed is less than 5.
                    helpEmbed.addField(value[0], // The name of the command.
                        value[1], // The description of the command.
                        false); // This is the inline value; for the discord embed.
                    ++embedFields; // Increment this value.
                }
                logger.log(`${embedFields}`, logLevel.debug, 'HelpCommand')
            });
        }
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