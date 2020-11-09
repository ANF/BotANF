using System;
using System.IO;
using System.Text.Json;
using System.Reflection;

using Ver = BotANF.Version;

namespace BotANF
{
    class Program
    {
        ///<summary>
        /// The main method where the bot starts.
        ///</summary>
        static void Main()
        {
            Initialize();
            new Bot().RunAsync().GetAwaiter().GetResult();
        }

        ///<summary>
        /// Initializes BotANF before starting.
        ///</summary>
        ///<remarks>
        /// Sets the title of the console.
        /// Checks if Config.json exists.
        ///</remarks>
        private static void Initialize()
        {
            if (!File.Exists("Config.json"))
            {
                Console.WriteLine("Config.json is not found!");
                throw new FileNotFoundException();
            }

            Bot.jsonOptions = new JsonSerializerOptions
            {
                AllowTrailingCommas = true,
                ReadCommentHandling = JsonCommentHandling.Skip,
                WriteIndented = false,
                PropertyNameCaseInsensitive = true,
            };
            string json = File.ReadAllText("Config.json");
            Bot.config = JsonSerializer.Deserialize<BotConfig>(json, Bot.jsonOptions);
            Assembly assembly = Assembly.GetExecutingAssembly();
            Console.Title = $"{assembly.GetName().Name} {Ver.ShortVersion}";
        }
    }
}
