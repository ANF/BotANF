import { PermissionString, Message } from "discord.js";
import DiscordClient from "../client/client";
import { ArgumentOptions } from "./arguments/Arguments";

interface Options {
    aliases: string[];
    description: string;
    usage: string;
    channel: string | null; //Not implemented yet, it decides where the command should be executed like dm only commands, guild text channels only etc
    args: ArgumentOptions[];
    ownerOnly: boolean;
    category: string;
    clientPermissions: PermissionString[];
    userPermissions: PermissionString[];
}

abstract class Command {
    public client: DiscordClient | null = null;

    constructor(private _id: string, private _options: Partial<Options>) {}

    public get id() {
        return this._id;
    }

    public get options() {
        return this._options;
    }

    public abstract exec(message: Message, args: any): void;
}

export default Command;
