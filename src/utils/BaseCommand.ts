import { Message } from "discord.js";
import DiscordClient from "./client/client";
type Nullable<T> = T | null;
type Category = "Utility" | "Moderation" | "User" | "Custom Commands" | null;

/**
 * The command system for the Discord Client.
 * This is the basic structure and which
 * constructs it all.
 */
export default abstract class BaseCommand {
  constructor(
    private name: string,
    private category: Category,
    private description: Nullable<string>,
    private aliases: Array<string>
  ) {}

  getName(): string {
    return this.name;
  }
  getCategory(): Category {
    return this.category;
  }
  getDescription(): Nullable<string> {
    return this.description;
  }
  getAliases(): Array<string> {
    return this.aliases;
  }
  getCommandNames(): Array<string> {
    return BaseCommand.commandNames;
  }
  getCommandDescription(): Array<string> {
    return BaseCommand.commandDescriptions;
  }

  abstract run(
    client: DiscordClient,
    message: Message,
    args: Array<string> | null
  ): Promise<void>;
}
