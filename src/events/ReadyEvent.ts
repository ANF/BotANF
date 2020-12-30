import BaseEvent from '../utils/BaseEvent';
import DiscordClient from '../utils/client/client';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client: DiscordClient) {
    console.log('Bot has logged in.');
  }
}