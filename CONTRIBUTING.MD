<h2 align="center">Contributing to BotANF</h2>
When contributing to this repository, please first discuss the change you wish to make via issue, or on my [Discord server](https://discord.gg/fKWpK7A) or any other method with the owner(s) of this repository before making a change.

Note that we also have a [code of conduct](CODE_OF_CONDUCT.md)

### Pull Request Process
0. Create an issue and discuss with the team on what to do and if the team wants that.
1. When making commits, make sure to summarize them with a consice description of what has been changed. Don't do 
   something like `Minor changes` or `Changed some stuff`, rather something like `Fixed issue #0` or `Improved exception handling`. If you made two changes, undo those and make commits per change.
2. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
3. Update the [CHANGELOG.md](CHANGELOG.MD) (and other relevent files) with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
4. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
5. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

### Configuration file
Make sure to use the bot with a `.env` file, here is an example of how it should look:
```env
TOKEN="Your Discord Token that you get from the developer dashboard at: https://discord.com/developers/"
PREFIX="An optional argument for your Discord bot's prefix"
MONGO="The MongoDB connection string."
```
You can also see the [sample env file](https://github.com/ANF/BotANF/blob/master/.sample.env).

**WARNING** Please don't publish the `.env` file anywhere as it contains sensitive information that can compromise your bot. This file is already in the .gitignore, but make sure it is also in yours. We're not responsible for any damage done to you or your bot.

### Issues
In the [issues section](https://github.com/ANF-Studios/BotANF/issues), you can create issues of features you want added, bugs that need to be fixed or something that is wrong.

### Building / running
You should have the following prerequisites:
- A terminal.
- NodeJS
- The packages installed (`npm install`)

Finally, type in `npm run start` to run the bot - be aware that the application would fail to function without the `.env` file.

### Discord Server
[![ANF Studios](https://discord.com/api/guilds/732064655396044840/embed.png?style=banner3)](https://discord.gg/fKWpK7A)

### Comprehensive guide on contributing
Before you even begin working on fixes or features you have to fork the repository as you cannot directly work on this one.

##### Adding new features / bug fixing
You should branch off from the dev branch:

Then you should do all the new work in that branch (myFeature). Then merge that branch back into the dev branch.
After you merged the branch back into the dev branch you should do a pull request on the dev branch in THIS repository. After that we will review it and merge it with our dev branch.
