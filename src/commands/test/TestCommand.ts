import { Message } from "discord.js";
import BaseCommand from "../../utils/BaseCommand";
import DiscordClient from "../../utils/client/client";
import { getTextFromMongoDB } from "../../utils/client/mongodb";
import logger from "../../utils/helper/logger";

export default class TestCommand extends BaseCommand {
  text: any = null;
  constructor() {
    super("test", "testing", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    this.text ??= await getTextFromMongoDB(logger);
    message.channel.send(this.text?.get);
  }
}
