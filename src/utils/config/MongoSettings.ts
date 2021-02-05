// In case if this isn't clear, this file is used
// to export an class with the configuration
// that the app gets from MongoDB. This is to
// help future maintainers and contributors
// to be aware of the settings that BotANF's
// database uses.

/**
 * The configuration settings from MongoDB.
 */
export default class MongoSettings {
    static Token: string;
    static Version: Array<string>;
    static Prefix: string;
    static Rules: Array<string>;
}
