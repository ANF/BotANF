import { Message } from 'discord.js';
import BaseCommand from '../../utils/BaseCommand';
import DiscordClient from '../../utils/client/client';

export default class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'Utility', ['latency', 'pong']);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send(`The current latency is \`${client.ws.ping}\`ms`);
  }
}
