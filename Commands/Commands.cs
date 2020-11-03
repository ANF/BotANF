using System.Threading.Tasks;

using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;

namespace BotANF.Commands
{
    ///<summary>
    /// Utility commands belong to this class
    ///</summary>
    public class Utility : BaseCommandModule
    {
        //Latency command
        [Command("latency"), Aliases("ping")]
        [Cooldown(3, 120, CooldownBucketType.User)]
        [Description("Gets the latency of the current server.")]
        public async Task GetLatency(CommandContext ctx)
        {
            DiscordEmbed latency = new DiscordEmbedBuilder()
                .WithColor(DiscordColor.CornflowerBlue)
                .WithDescription($"The current latency is **{ctx.Client.Ping}**ms")
                .Build();
            await ctx.Channel.SendMessageAsync(embed: latency);
        }

        //F command
        [Command("F")]
        [RequiresRole("Member")]
        [Description("Replies with ||[REDACTED]||")]
        public async Task SayF()
            => await ReplyAsync("F");

        //Echo command
        [Command("Say"), Aliases("say")]
        [RequiresRole("Member")]
        [Description("say what user gave as input")]
        public async Task RepeatUser([Remainder] [Summary("What should the bot say")] string echo)
            => await ReplyAsync(echo);
    }
}
