import BaseEvent from "../utils/BaseEvent";
import DiscordClient from "../utils/client/client";
import logger, {logLevel} from "../utils/helper/logger";

export default class ReadyEvent extends BaseEvent {
    constructor() {
        super("ready");
    }

    async run(client: DiscordClient) {
        logger.log(
            "The bot; " +
            client.user?.username +
            " has successfully started and is now functional.",
            logLevel.info,
            "ReadyEvent"
        );
    }
}
