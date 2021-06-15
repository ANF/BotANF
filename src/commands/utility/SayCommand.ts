import Command from "../../utils/commands/Command";
import { GuildChannel, Message, TextChannel } from "discord.js";
import ArgumentTypes from "../../utils/commands/arguments/ArgumentTypes";

class SayCommand extends Command {
    constructor() {
        super("say", {
            description: "Says whatever the user says",
            category: "Utility",
            ownerOnly: true,
            usage: "`-say <channel> [text]` or `-say [text]`",
            args: [
                {
                    id: "channel",
                    type: ArgumentTypes.CHANNEL,
                    nullable: true,
                    description: "The channel where the message will be sent",
                },
            ],
            userPermissions: ["MANAGE_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    exec(
        message: Message,
        { channel, args }: { channel: GuildChannel; args: string[] }
    ) {
        if (channel == undefined) {
            message.channel.send(args.join(" "));
        } else {
            (channel as TextChannel).send(args.join(" "));
        }
    }
}

export default SayCommand;
