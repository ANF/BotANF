import DiscordClient from "../client/client";

abstract class Event {
    public client: DiscordClient | null = null;

    constructor(private _name: string) {}

    public get name() {
        return this._name;
    }

    abstract exec(...args: any): Promise<void>;
}

export default Event;
