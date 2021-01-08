import { Message, PermissionResolvable } from 'discord.js';
import BaseCommand from './BaseCommand';
import {Announcements} from "./announcements";

export class Checks {
    // permission check system
    public static permissionCheck(discordMessageInstance: Message, permission: PermissionResolvable): boolean {
        if (!discordMessageInstance.member.hasPermission(permission)) {
            Announcements.error(discordMessageInstance, "You dont have permissions for that", undefined, true);
            return false;
        }

        return true;
    }
    
    // arguments check system
    public static argsCheck(discordMessageInstance: Discord.Message, commandInstance: ICommand, args: string[]): boolean {
        const splitArgs = commandInstance.args.split("[");
        if (args.length < splitArgs.length) {
            Announcements.error(discordMessageInstance, "Invalid usage", `Proper: **${commandInstance.syntax} ${commandInstance.args}**`, false);
            return false;
        }
        return true;
    }
}
