# Contributing to BotANF
When contributing to this repository, please first discuss the change you wish to make via issue, or on my [Discord server](https://discord.gg/fKWpK7A) or any other method with the owner(s) of this repository before making a change.

Note that we also have a [code of conduct](CODE_OF_CONDUCT.md)

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the [CHANGELOG.md](CHANGELOG.MD) (and other relevent files) with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Configuration file
Make sure to use the bot with a `Config.json` file, here is an example of how it should look:
```json
{
    "Token": "Discord Token",
    "Version": [
        0,
        0,
        0
    ]
}
```
You can also see the [sample config file](Sample.Config.json).

**WARNING** Please don't publish the `Config.json` file anywhere as it contains sensitive information that can compromise your bot. This file is already in the .gitignore, but make sure it is also in yours. We're not responsible for any damage done to you or your bot.

## Issues
In the issues section, you can create issues of features you want added, bugs that need to be fixed or something that is wrong.

## Building / running
Building or running the bot should be very simple and straightforward. Depending on the IDE you use, you can simply build or run the project using the IDE's integrated tools.

If you aren't using an IDE or using the CLI the command for building the project is:
```
dotnet build
```
And for running:
```
dotnet run
```

## Discord Server
[![ANF Studios](https://discord.com/api/guilds/732064655396044840/embed.png?style=banner3)](https://discord.gg/fKWpK7A)

## Comprehensive guide on contributing
Before you even begin working on fixes or features you have to fork the repository as you cannot directly work on this one.

#### Adding new features / bug fixing
You should branch off from the dev branch:

Then you should do all the new work in that branch (myFeature). Then merge that branch back into the dev branch.
After you merged the branch back into the dev branch you should do a pull request on the dev branch in THIS repository. After that we will review it and merge it with our dev branch.
