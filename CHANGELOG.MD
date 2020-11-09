## BotANF Changelog
### Current version: 2.0.0

#### Version 2.0.0
- Initial release.
**Note:** Version 1.X.X is closed source, the open source version starts from 2.0.0.

### Version 2.1.0
- Added Message extensions i.e, Send method for embeds and Send method for messages.
- Changed the BotANF class (in BotANF.cs) to Bot because it conflicted with the namespace and changed names across the project (where the class is used)
- Added rules property in BotConfig.cs
- Updated the description of Latency command and the embed.
- Moved the if statement (that checks for the existance of Config.json) at the start of the initialize method.
- Updated sample config.json and contributing.md