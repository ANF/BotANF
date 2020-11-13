using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BotANF
{
    public class BotConfig
    {
        ///<summary>
        /// The token to access the Discord API.
        ///</summary>
        [JsonPropertyName("Token")]
        public string Token { get; set; }

        ///<summary>
        /// The current version of the application.
        ///</summary>
        [JsonPropertyName("Version")]
        public IList<int> Version { get; set; }

        ///<summary>
        /// Prefix(es) for the current discord bot
        ///</summary>
        [JsonPropertyName("Prefixes")]
        public IList<string> Prefixes { get; set; }

        ///<summary>
        /// Rules for your Discord server.
        ///</summary>
        [JsonPropertyName("Rules")]
        public IList<string> Rules { get; set; }
    }
}
