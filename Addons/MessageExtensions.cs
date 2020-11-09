using System.Threading.Tasks;
using System.Collections.Generic;

using DSharpPlus.Entities;
using DSharpPlus.CommandsNext;

namespace BotANF.Extensions
{
    public static class MessageExtensions
    {
        ///<summary>
        /// For quick sending of an embed
        ///</summary>
        public static async Task<DiscordEmbed> Send(this DiscordEmbed discordEmbed, DiscordChannel channel, string message = null, bool tts = false, IEnumerable<IMention> mentions = null)
        {
            await channel.SendMessageAsync(message, tts, discordEmbed, mentions);
            return discordEmbed;
        }

        ///<summary>
        /// For quick sending of a message
        ///</summary>
        public static async Task Send(this CommandContext ctx, string message, bool tts = false, IEnumerable<IMention> mentions = null)
            => await ctx.Channel.SendMessageAsync(message, tts, null, mentions); // Not really necessary, but it's nice to have it.
    }
}
