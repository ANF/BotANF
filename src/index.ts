/** 
*   This code will be deleted when before I make a pull request
* */

/*import {registerCommands, registerEvents} from "./utils/registry";
import logger, {logLevel} from "./utils/helper/logger";
import ClientConfig from "./utils/config/ClientConfig";
import DiscordClient from "./utils/client/client";
import {getSettings} from "./utils/client/mongodb";
import MongoSettings from "./utils/config/MongoSettings";
import "dotenv/config";

export const client = new DiscordClient({
    disableMentions: "everyone",
    ws: {compress: false},
    retryLimit: 10,
});

async function main(configuration: ClientConfig): Promise<void> {
    client.prefix = '!';
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await client.login(process.env.TOKEN);
    await client.user?.setPresence({
        activity: {
            name: configuration.user_presence,
            type: configuration.user_presenceType,
        },
        status: configuration.user_status,
    });
}

async function initialize() {
    const settings: any = await getSettings(logger);
    MongoSettings.Token = settings.Token;
    MongoSettings.Version = settings.Version;
    MongoSettings.Prefix = settings.Prefix;
    MongoSettings.Rules = settings.Rules;
    logger.log(
        "The application is now alive and got settings from MongoDB.",
        logLevel.verbose,
        "index"
    );
}

//initialize();
main({
    user_status: "idle",
    user_presence: "as Illuminati",
    user_presenceType: "PLAYING",
}).catch((err) => {
    logger.log(
        "There is an error in the main method; " + err,
        logLevel.warning,
        "index"
    );
});
*/

//The code the will remain:

import Client from "./utils/client/client";
import CommandHandler from "./utils/commands/CommandHandler";
import { join } from "path";
import EventHandler from "./utils/events/EventHandler";
import Logger, {LogLevel} from "./utils/helper/Logger-test";

const client = new Client ({
    ownerID: [
        '610423394353152003',
        '340597234016190487'
    ]
}, {
    retryLimit: 10,
    ws: { compress: false },
    disableMentions: 'everyone'
});

new CommandHandler(client, { dir: join(__dirname, './commands'), prefix: '-' });
new EventHandler(client, { dir: join(__dirname, './events') });

Logger.log('Test log', LogLevel.WARNING);

client.login(process.env.TOKEN);
