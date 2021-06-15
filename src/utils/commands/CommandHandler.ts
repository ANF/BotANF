import { Message, PermissionString } from "discord.js";
import Arguments from "./arguments/Arguments";
import { join } from "path";
import { promises as fs} from "fs";
import Command from "./Command";
import { MissingPermission } from "../helper/Unauthorized";
import DiscordClient from "../client/client";

interface Options {
    dir: string;
    prefix: string;
}

class CommandHandler {
    private prefix: string;
    private dir: string;

    constructor(private client: DiscordClient, private options: Partial<Options>){
        this.prefix = options.prefix || ',';
        this.dir = this.options.dir || '';
        this.setup();
    }

    private async setup(): Promise<void>{
        await this.loadAll();
        //console.log(this.client.categories);
        this.client.on('message', (msg: Message): void => {
            if(msg.author.bot) return;
            this.handle(msg);
        });
    }

    private handle(message: Message): void{
        if(!message.content.startsWith(this.prefix)) return;
        const [commandName, ...args] = message.content
            .slice(this.prefix.length)
            .trim()
            .split(/\s+/);

            const command = this.client.commands.get(commandName.toLowerCase());

            if(command){
                if(this.checkForPermissions(message, command)){
                    const parsedArguments = new Arguments(this.client, command.options.args || [], message, [...args])
                    if(parsedArguments.error){
                        console.log("command error");
                        return;
                    }

                    command.exec(message, parsedArguments.parsedArguments);
                }
                else {
                    //TODO: implement embed to send whenever the user isn't allowed to run the command
                    //message.channel.send(`You're not the owner`);
                }
            }
    }

    private checkForPermissions(message: Message, command: Command): boolean{

        //Check if the user is one of the owners
        if(command.options.ownerOnly){
            if(!this.client.isOwner(message.author.id)){
                return false;
            }
        }

        //Check if the user has the required premissions
        const userPermissions: PermissionString[] = command.options.userPermissions || [];
        if(userPermissions.length > 0){
            for(const permission of userPermissions){
                if(!message.member?.hasPermission(permission)){
                    return false;
                }
            }
        }

        //Check if the bot has the required permissions
        const clientPermissions: PermissionString[] = command.options.userPermissions || [];
        if(clientPermissions.length > 0){
            for(const permission of clientPermissions){
                if(!message.member?.guild.me?.hasPermission(permission)){
                    message.channel.send(MissingPermission(permission));
                    return false;
                }
            }
        }

        return true;
    }

    private async loadFolder(path: string): Promise<void>{
        const files = await fs.readdir(path);
        for(const file of files){
            const stat = await fs.lstat(join(path, file));

            if (stat.isDirectory()) { 
                await this.loadFolder(join(this.dir, file));
            }

            if (file.endsWith(".js") || file.endsWith(".ts")) {
                const { default: Command } = await import(join(path, file));

                const cmd = new Command();
                cmd.client = this.client;

                //To have case insensitive command search
                this.client.commands.set(cmd.id.toLowerCase(), cmd);
                cmd.options.aliases?.forEach((alias: string) => this.client.commands.set(alias, cmd));

                //Add command to category object of the client
                const category = cmd.options.category || 'default';

                if(this.client.categories.has(category)){
                    this.client.categories.get(category)?.add(cmd);
                }
                else {
                    this.client.categories.set(category, new Set([cmd]));
                }
            }
        }
    }

    private async loadAll(): Promise<void>{
        await this.loadFolder(this.dir);
    }
}

export default CommandHandler;
