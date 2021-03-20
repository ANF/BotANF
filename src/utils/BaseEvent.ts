import DiscordClient from "./client/client";

/**
 * The event system for the Discord Client or
 * possibly even other systems. This is the base
 * of events which constructs it all.
 */
export default abstract class BaseEvent {
    constructor(private name: string) {}

    getName(): string {
        return this.name;
    }

    abstract run(client: DiscordClient, ...args: any): void;
}
