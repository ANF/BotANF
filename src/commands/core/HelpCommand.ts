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
        let embedFields = 0;
        const helpEmbed: MessageEmbed = new MessageEmbed({
            color: EmbedColor.NULL,
            title: 'Help Command'
        });
        // if (args.includes("Utility")
        //     || args.includes("Moderation")
        //     || args.includes("User")
        //     || "Custom Commands") {
        switch (args[0].toLowerCase()) {
            case "utils":
            case "utility":
            case "utilities":
                break;
                break;
        }
        if (message.member?.roles.cache.has("Administrator") // If the user has the Admin role
            || message.member?.roles.cache.has("Staff") // Or the staff role
            || message.author.id == message.guild?.ownerID) // Or even is the owner of the server
            helpEmbed.addField(Categories[1][0], Categories[1][1]); // Add the moderation module.
        Categories.forEach((element, index) => {
            if (index !== 1) helpEmbed.addField(element[0], element[1]);
        });
        helpEmbed.title = "Here are modules that you can access!";
        await message.channel.send(helpEmbed);
    }

    private static isAdmin(data: Message): boolean {
        return data.author.id == data.guild?.ownerID;
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

/*
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
 */