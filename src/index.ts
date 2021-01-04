import { registerCommands, registerEvents } from './utils/registry';
import logger, { logLevel } from './utils/helper/logger';
import clientConfig from './utils/config/clientConfig';
import DiscordClient from './utils/client/client';
import { getSettings } from './utils/client/mongodb'
import 'dotenv/config';
export const client = new DiscordClient({
  disableMentions: 'everyone',
  ws: { compress: false },
  retryLimit: 10,
});

let settings: any;

async function main(configuration: clientConfig) {
  client.prefix = settings?.Prefix || process.env.PREFIX || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(settings?.Token || process.env.TOKEN);
  await client.user?.setPresence({
    activity: { name: configuration.user_presence, type: configuration.user_presenceType },
    status: configuration.user_status
  });
}

async function initialize() {
  settings = await getSettings(logger);
  logger.log('The application is now alive and got settings from MongoDB.', logLevel.verbose, 'index');
}

initialize();
main({
  user_status: 'idle',
  user_presence: 'as Illuminati',
  user_presenceType: 'PLAYING'
}).catch(async (err) => {
  await logger.log('There is an error in the main method; ' + err, logLevel.warning, 'index');
});

export function getInitialSettings() { return settings; }
