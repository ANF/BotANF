import Command from "../../utils/commands/Command";
import { Message, MessageEmbed } from "discord.js";
import EmbedColor from "../../utils/helper/EmbedColor";

class PingCommand extends Command{
    constructor(){
        super('ping', {
            aliases: ['pong', 'latency'],
            description: 'Displays the current latency of the bot',
            category: 'Utility'
        });
    }

    exec(message: Message){
        const pingEmbed = new MessageEmbed({
            color: EmbedColor.BLUE,
            description: `The current latency is ${this.client?.ws.ping} ms`
        });

        message.channel.send(pingEmbed);
    }
}

export default PingCommand;
