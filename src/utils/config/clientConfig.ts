import { PresenceStatusData, ActivityType } from 'discord.js';

export default interface clientConfig {
    user_status: PresenceStatusData,
    user_presence: string,
    user_presenceType: ActivityType;
}
