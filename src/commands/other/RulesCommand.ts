import { Message } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";
import mongoSettings from "../../utils/config/MongoSettings";

export default class RulesCommand extends BaseCommand {
    constructor() {
        super("rule", null, "Displays the rule with the given rule ID.", []);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (mongoSettings.Rules[Number(args[0]) - 1])
            message.channel.send(
                `Rule ${args[0]}\n${mongoSettings.Rules[Number(args[0]) - 1]}`
            );
        else message.channel.send("err, invalid argument");
    }
}
