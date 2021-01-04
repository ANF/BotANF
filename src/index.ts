import { registerCommands, registerEvents } from './utils/registry';
import logger, { logLevel } from './utils/helper/logger';
import ClientConfig from './utils/config/ClientConfig';
import DiscordClient from './utils/client/client';
import { getSettings } from './utils/client/mongodb';
import MongoSettings from './utils/config/MongoSettings';
import 'dotenv/config';
export const client = new DiscordClient({
  disableMentions: 'everyone',
  ws: { compress: false },
  retryLimit: 10,
});

async function main(configuration: ClientConfig): Promise<void> {
  client.prefix = MongoSettings?.Prefix || process.env.PREFIX || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(MongoSettings?.Token || process.env.TOKEN);
  await client.user?.setPresence({
    activity: { name: configuration.user_presence, type: configuration.user_presenceType },
    status: configuration.user_status
  });
}

async function initialize() {
  const settings: any = await getSettings(logger);
  MongoSettings.Token = settings.Token;
  MongoSettings.Version = settings.Version;
  MongoSettings.Prefix = settings.Prefix;
  MongoSettings.Rules = settings.Rules;
  logger.log('The application is now alive and got settings from MongoDB.', logLevel.verbose, 'index');
}

initialize();
main({
  user_status: 'idle',
  user_presence: 'as Illuminati',
  user_presenceType: 'PLAYING'
}).catch(async (err) => {
  logger.log('There is an error in the main method; ' + err, logLevel.warning, 'index');
});
