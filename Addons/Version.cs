using SysV = System.Version;

namespace BotANF
{
    ///<summary>
    /// Class that stores versioning for BotANF.
    ///</summary>
    public static class Version
    {
        public static readonly int MAJOR = Bot.Config.Version[0];
        public static readonly int MINOR = Bot.Config.Version[1];
        public static readonly int PATCH = Bot.Config.Version[2];
        public static string ShortVersion = $"{MAJOR}.{MINOR}";
        public static string FullVersion => $"{MAJOR}.{MINOR}.{PATCH}";
        public static string DiscordVersion => Bot.Client.VersionString;
        public static SysV AsSystemVersion() => new SysV(MAJOR, MINOR, PATCH);
    }
}
