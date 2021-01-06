import BaseEvent from "../utils/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../utils/client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      } else {
        await this.unknownCMD(message, cmdName);
      }
    }
    // TODO: Create it. ⬇
    /*else { // This part checks for anything unwanted or something to be reacted upon depending on requirements.
    }*/
  }
  private async unknownCMD(message: Message, commandName: string) {
    await message.channel.send("`" + commandName + "` is not a valid command.");
  }
}
