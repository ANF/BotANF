using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BotANF
{
    public class BotConfig
    {
        [JsonPropertyName("Token")]
        public string Token { get; set; }

        [JsonPropertyName("Version")]
        public IList<int> Version { get; set; }

        [JsonPropertyName("Rules")]
        public IList<string> Rules { get; set; }
    }
}
