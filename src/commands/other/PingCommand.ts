import EmbedColor from "../../utils/helper/EmbedColor";
import BaseCommand from "../../utils/BaseCommand";
import { Message, MessageEmbed } from "discord.js";
import DiscordClient from "../../utils/client/client";

export default class PingCommand extends BaseCommand {
    constructor() {
        super("ping", "Utility", "Displays the current latency of the bot", [
            "latency",
            "pong",
        ]);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        const pingEmbed: MessageEmbed = new MessageEmbed({
            color: EmbedColor.BLUE,
            description: `The current latency is \`${client.ws.ping}\`ms`,
        });
        message.channel.send(pingEmbed);
    }
}
