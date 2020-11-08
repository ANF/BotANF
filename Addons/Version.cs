using SysV = System.Version;

namespace BotANF
{
    ///<summary>
    /// Class that stores versioning for BotANF.
    ///</summary>
    public static class Version
    {
        public static readonly int MAJOR = Bot.config.Version[0];
        public static readonly int MINOR = Bot.config.Version[1];
        public static readonly int PATCH = Bot.config.Version[2];
        public static string ShortVersion = $"{MAJOR}.{MINOR}";
        public static string FullVersion => $"{MAJOR}.{MINOR}.{PATCH}";
        public static string DiscordVersion => Bot.client.VersionString;
        public static SysV AsSystemVersion() => new SysV(MAJOR, MINOR, PATCH);
    }
}
