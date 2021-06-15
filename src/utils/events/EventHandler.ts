import { promises as fs } from "fs";
import { join } from "path";
import DiscordClient from "../client/client";

interface Options {
    dir: string;
}

class EventHandler {
    constructor(private client: DiscordClient, private options: Options){
        this.setup();
    }

    private async setup(): Promise<void>{
        await this.loadAll();

        this.client.events.forEach(event => {
            this.client.on(event.name, (...args) => event.exec(args));
        });
    }

    private async loadFolder(path: string): Promise<void>{
        const files = await fs.readdir(path);
        for(const file of files){
            const stat = await fs.lstat(join(path, file));

            if(stat.isDirectory()){
                await this.loadFolder(join(this.options.dir, file));
            }

            if(file.endsWith('.js')){
                const { default: Event } = await import(join(path, file));
                
                const listener = new Event();
                listener.client = this.client;

                this.client.events.set(listener.name, listener);
            }
        }
    }

    private async loadAll(): Promise<void>{
        await this.loadFolder(this.options.dir);
    }
}

export default EventHandler;
