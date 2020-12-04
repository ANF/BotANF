using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;
using DSharpPlus.CommandsNext;

using MongoDB.Driver;
using MongoDB.Driver.Core;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace BotANF
{
    ///<summary>
    /// Main file for booting and running the bot.
    ///</summary>
    public class Bot
    {
        public static BotConfig Config = new BotConfig();
        public static JsonSerializerOptions JsonOptions;
        public static DiscordClient Client;
        public static MongoClient DBClient;

        private static ServiceProvider services;
        private static CommandsNextExtension commands;

        public async Task RunAsync()
        {
            DBClient = new MongoClient(Config.DBKey);
            BotConfig.Database = DBClient.GetDatabase(BotConfig.DatabaseName);
            BotConfig.CollectionBase = BotConfig.Database.GetCollection<BotConfig>(BotConfig.ConfigCollection);

            //var firstDocument = BotConfig.CollectionBase.Find(new MongoDB.Bson.BsonDocument()).FirstOrDefault();
            //Console.WriteLine(firstDocument.ToString());


            Client = new DiscordClient(new DiscordConfiguration
            {
                Token = Config.Token,
                TokenType = TokenType.Bot,
                MessageCacheSize = 50,
                AutoReconnect = true,
                GatewayCompressionLevel = GatewayCompressionLevel.Stream,
                HttpTimeout = TimeSpan.FromSeconds(30),
                MinimumLogLevel = LogLevel.Information,
                LogTimestampFormat = $"{DateTime.UtcNow}",
            });

            commands = Client.UseCommandsNext(new CommandsNextConfiguration
            {
                CaseSensitive = false,
                DmHelp = false,
                EnableDms = true,
                EnableMentionPrefix = true,
                IgnoreExtraArguments = true,
                UseDefaultCommandHandler = true,
                StringPrefixes = Config.Prefixes,
            });
            
            services = new ServiceCollection()
                .AddSingleton<DiscordClient>(Client)
                .AddSingleton<CommandsNextExtension>(commands)
                .AddSingleton<BotConfig>(Config)
                .AddSingleton<MongoClient>(DBClient)
                .BuildServiceProvider();

            commands.RegisterCommands<Commands.Utility>();
            Client.Ready += InitializeBot;

            await Client.ConnectAsync();
            await Task.Delay(Timeout.Infinite);
        }

        private async Task InitializeBot(DiscordClient sender, ReadyEventArgs e)
        {
            await Client.UpdateStatusAsync(new DiscordActivity
            {
                Name = "Illuminati take over the World!",
                ActivityType = ActivityType.Watching,
            });
            Console.WriteLine($"{sender.CurrentUser.Username} logged onto Discord!");
        }
    }
}
