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
    }

    [RequireUserPermission(GuildPermission.Administrator, Group = "Permission")]
    public class AdminModule : BaseCommandModule
    {
        [Command("ban")]
        [RequireBotPermission(GuildPermission.BanMembers)]
        [Description ("Bans a user permanently from the server.")]
        public Task BanAsync(CommandContext ctx, IUser user) 
        {
            Context.Guild.AddBanAsync(user);
            DiscordEmbed banned = new DiscordEmbedBuilder()
                .WithColor(DiscordColor.CornflowerBlue)
                .WithDescription($"{user.Mention} was banned from this server.")
                .Build();
            await ctx.Channel.SendMessageAsync(embed: banned);
        }
    }
}
