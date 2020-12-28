<h2 align="center">Contributing to BotANF</h2>
When contributing to this repository, please first discuss the change you wish to make via issue, or on my [Discord server](https://discord.gg/fKWpK7A) or any other method with the owner(s) of this repository before making a change.

Note that we also have a [code of conduct](CODE_OF_CONDUCT.md)

### Pull Request Process
0. When making commits, make sure to summarize them with a consice description of what has been changed. Don't do 
   something like `Minor changes` or `Changed some stuff`, rather something like `Fixed issue #0` or `Improved exception handling`. If you made two changes, undo those and make commits per change.
1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the [CHANGELOG.md](CHANGELOG.MD) (and other relevent files) with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

### Configuration file
Make sure to use the bot with a `Config.json` file, here is an example of how it should look:
```json
{
    "Token": "Discord Token",
    "Version": [
        0,
        0,
        0
    ],
    "Prefixes": [
        "Prefix 1",
        "Prefix 2"
    ],
    "Rules": [
       "This is rule 1",
       "This is rule 2",
       "This is rule 3"
    ]
}
```
You can also see the [sample config file](Sample.Config.json).

**WARNING** Please don't publish the `Config.json` file anywhere as it contains sensitive information that can compromise your bot. This file is already in the .gitignore, but make sure it is also in yours. We're not responsible for any damage done to you or your bot.

## Code structure
When contributing code, make sure that your code matches the prefered way of writing it.

Example file/script:
```cs
using System.Threading.Tasks;
                                        // Seperate base namespaces with one line
using DSharpPlus.Entities;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;
                                        // Seperate base namespaces with one line
using static BotANF.Extensions.MessageExtensions;

namespace BotANF.Commands // Namespaces names based upon what they are for.
{
    ///<summary> // Always good to add a summary for a class, but not compulsory.
    /// Utility commands belong to this class.
    ///</summary>
    public class Utility : BaseCommandModule
    {
        [Command("latency"), Aliases("ping")]
        [Cooldown(3, 120, CooldownBucketType.User)]
        [Description("Gets the latency of the bot instance.")]
        public async Task GetLatency(CommandContext ctx) // Name the `CommandContext` either context or ctx.
        {
            await (new DiscordEmbedBuilder()
            .WithColor(DiscordColor.CornflowerBlue)
            // Embed colors:-
            // Success: Green
            // Info: CornflowerBlue
            // Error: Red
            .WithDescription($"The current latency is **{ctx.Client.Ping}**ms")
            .Build()).Send(ctx.Channel);
        }

        [Command("hello"), Aliases("hi", "hey")]
        public async Task Hello(CommandContext context)
            => await context.Send($"Hello {context.User.Username}"); // Preferable way of sending a simple message.
    }                                       // ^ Preferable way of filling arguments in a string.
}
```

And aside from that, just make sure to follow Microsoft C#'s [coding conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions), [naming guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines) and the [basic code structure](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/general-structure-of-a-csharp-program)

### Issues
In the [issues section](https://github.com/ANF-Studios/BotANF/issues), you can create issues of features you want added, bugs that need to be fixed or something that is wrong.

### Building / running
Building or running the bot should be very simple and straightforward. Depending on the IDE you use, you can simply build or run the project using the IDE's integrated tools.

If you aren't using an IDE or using the CLI the command for building the project is:
```
dotnet build
```
And for running:
```
dotnet run
```

### Discord Server
[![ANF Studios](https://discord.com/api/guilds/732064655396044840/embed.png?style=banner3)](https://discord.gg/fKWpK7A)

### Comprehensive guide on contributing
Before you even begin working on fixes or features you have to fork the repository as you cannot directly work on this one.

##### Adding new features / bug fixing
You should branch off from the dev branch:

Then you should do all the new work in that branch (myFeature). Then merge that branch back into the dev branch.
After you merged the branch back into the dev branch you should do a pull request on the dev branch in THIS repository. After that we will review it and merge it with our dev branch.