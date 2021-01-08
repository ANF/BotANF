import { Message, PermissionResolvable } from 'discord.js';
import BaseCommand from './BaseCommand';
import {Announcements} from "./announcements";

export class Checks {
    public static permissionCheck(discordMessageInstance: Message, permission: PermissionResolvable): boolean {
        if (!discordMessageInstance.member.hasPermission(permission)) {
            Announcements.error(discordMessageInstance, "You dont have permissions for that", undefined, true);
            return false;
        }

        return true;
    }
}
