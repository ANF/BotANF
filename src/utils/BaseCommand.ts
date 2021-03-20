import { Message } from "discord.js";
import DiscordClient from "./client/client";

type Nullable<T> = T | null;
/**Category or types of commands in BotANF.*/
type Category = "Utility" | "Moderation" | "User" | "Custom Commands" | null;

/**These are the categories each sorted out by name and description.
 * Quick note: DO NOT change the index of any element as this will
 * break the bot itself and how it works.*/
export const Categories: Array<[string, string]> = [
    ["Utility", "Utility tools for the bot - mostly information"],
    ["Moderation", "Moderation tools for the server, use it wisely"],
    ["User", "User commands to customize themselves"],
    ["Custom Commands", "Custom user commands to have fun and play with"],
];

/**
 * The command system for the Discord Client.
 * This is the basic structure and which
 * constructs it all.
 */
export default abstract class BaseCommand {
    static commandInfo: Array<
        [string, Nullable<string>, boolean]
    > = new Array();

    constructor(
        private name: string,
        private category: Category,
        private description: Nullable<string>,
        private aliases: Array<string>,
        private hidden: boolean = false
    ) {
        BaseCommand.commandInfo.push([
            name,
            (description ??= "Description not provided"),
            hidden,
        ]);
        BaseCommand.commandInfo.sort();
    }

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

    isHidden(): boolean {
        return this.hidden;
    }

    getcommandInfo(index: number): Array<unknown> {
        return BaseCommand.commandInfo[index];
    }

    getCommandsInfo(): Array<[string, Nullable<string>, boolean]> {
        return BaseCommand.commandInfo;
    }

    abstract run(
        client: DiscordClient,
        message: Message,
        args: Array<string> | null
    ): Promise<void>;
}
