import { Client, ClientOptions, Collection } from "discord.js";
import Command from "../commands/Command";
import Event from "../events/Event";
import distub from "discord-buttons";

interface Options {
    ownerID: string[];
}

class DiscordClient extends Client {
    private _commands: Collection<string, Command> = new Collection();
    private _events: Collection<string, Event> = new Collection();
    private _categories: Collection<string, Set<Command>> = new Collection();

    constructor(
        private _botOptions: Partial<Options>,
        clientOptions?: ClientOptions
    ) {
        super(clientOptions);
        distub(this);
    }

    public get botOptions() {
        return this._botOptions;
    }

    public get commands() {
        return this._commands;
    }

    public get events() {
        return this._events;
    }

    public get categories() {
        return this._categories;
    }

    public isOwner(id: string): boolean {
        if (this._botOptions.ownerID == null)
            throw new Error("Missing ownerID in client options");
        const owner = this._botOptions.ownerID.find((user) => user === id);
        return owner != null;
    }
}

export default DiscordClient;
