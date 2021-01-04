import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './utils/client/client';
import clientConfig from './utils/config/clientConfig';
//import {  } from "./commands";
import 'dotenv/config';
export const client = new DiscordClient({
  disableMentions: 'everyone',
  ws: { compress: false }
});

async function main(configuration: clientConfig) {
  client.prefix = process.env.PREFIX || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.TOKEN);
  await client.user?.setPresence({
    activity: { name: configuration.user_presence, type: configuration.user_presenceType },
    status: configuration.user_status
  });
}

main({
  user_status: 'idle',
  user_presence: 'as Illuminati',
  user_presenceType: 'PLAYING'
}).catch(reason => {
  console.log('[ERROR] Something went wrong!\n' + reason);
});
