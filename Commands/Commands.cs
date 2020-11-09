using System.Threading.Tasks;

using DSharpPlus.Entities;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;

using BotANF.Extensions;

namespace BotANF.Commands
{
    ///<summary>
    /// Utility commands belong to this class
    ///</summary>
    public class Utility : BaseCommandModule
    {
        [Command("latency"), Aliases("ping")]
        [Cooldown(3, 120, CooldownBucketType.User)]
        [Description("Gets the latency of the bot instance.")]
        public async Task GetLatency(CommandContext ctx)
        {
            await (new DiscordEmbedBuilder()
            .WithColor(DiscordColor.CornflowerBlue)
            .WithDescription($"The current latency is **{ctx.Client.Ping}**ms")
            .Build()).Send(ctx.Channel);
        }
    }
}
