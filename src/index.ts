import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './client/client';
import 'dotenv/config'
const client = new DiscordClient({});

async function main() {
  client.prefix = process.env.PREFIX || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.TOKEN);
}

main();
