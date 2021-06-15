//Temporary file
import { MessageEmbed, PermissionString } from "discord.js";
import EmbedColor from "./EmbedColor";
import { ArgumentOptions } from "../commands/arguments/Arguments";

export const MissingPermission = (
    permission: PermissionString
): MessageEmbed => {
    const embed = new MessageEmbed();

    embed.setColor(EmbedColor.RED);
    embed.setDescription(`Missing permission \`${permission}\``);

    return embed;
};

export const InvalidInput = (argument: ArgumentOptions): MessageEmbed => {
    const embed = new MessageEmbed();

    embed.setColor(EmbedColor.RED);
    embed.setDescription(`Invalid input at \`${argument.id}\``);

    return embed;
};
