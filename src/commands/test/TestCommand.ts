import { Message } from 'discord.js';
import BaseCommand from '../../utils/BaseCommand';
import DiscordClient from '../../utils/client/client';

export default class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('Test command works');
  }
}