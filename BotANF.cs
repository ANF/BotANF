using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;
using DSharpPlus.CommandsNext;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace BotANF
{
    public class BotANF
    {
        public static BotConfig config = new BotConfig();
        public static DiscordClient client;
        public static JsonSerializerOptions jsonOptions;

        private static ServiceProvider services;
        private static CommandsNextExtension commands;

        public async Task RunAsync()
        {
            client = new DiscordClient(new DiscordConfiguration
            {
                Token = config.Token,
                TokenType = TokenType.Bot,
                MessageCacheSize = 50,
                AutoReconnect = true,
                GatewayCompressionLevel = GatewayCompressionLevel.Stream,
                HttpTimeout = TimeSpan.FromSeconds(30),
                MinimumLogLevel = LogLevel.Information,
                LogTimestampFormat = $"{DateTime.UtcNow}",
            });

            commands = client.UseCommandsNext(new CommandsNextConfiguration
            {
                CaseSensitive = false,
                DmHelp = false,
                EnableDms = true,
                EnableMentionPrefix = true,
                IgnoreExtraArguments = true,
                UseDefaultCommandHandler = true,
                StringPrefixes = new string[2] { ",", "." },
            });

            services = new ServiceCollection()
                .AddSingleton<DiscordClient>(client)
                .AddSingleton<CommandsNextExtension>(commands)
                .BuildServiceProvider();

            commands.RegisterCommands<Commands.Utility>();
            client.Ready += InitializeBot;

            await client.ConnectAsync();
            await Task.Delay(Timeout.Infinite);
        }

        private async Task InitializeBot(DiscordClient sender, ReadyEventArgs e)
        {
            DiscordActivity activity = new DiscordActivity
            {
                Name = "Illuminati take over the World!",
                ActivityType = ActivityType.Watching,
            };
            await client.UpdateStatusAsync(activity);
            Console.WriteLine($"{sender.CurrentUser.Username} logged into Discord!");
        }
    }
}
