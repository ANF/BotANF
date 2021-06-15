import { Collection, Message, MessageEmbed, PermissionString } from "discord.js";
import { MessageActionRow, MessageButton } from "discord-buttons";
import ArgumentTypes from "../../utils/commands/arguments/ArgumentTypes";
import Command from "../../utils/commands/Command";
import EmbedColor from "../../utils/helper/EmbedColor";

class HelpCommand extends Command{
    constructor(){
        super('help', {
            aliases: ['h'],
            args: [
                {
                    id: 'name',
                    type: ArgumentTypes.STRING,
                    nullable: true,
                    description: 'The name of command or category by putting `c-` before the name'
                }
            ],
            description: 'Gives information about a specified command or the list of all commands with their categories',
            usage: '`-help [category or command]`'
        });
    }

    private isUserAllowedToSeeCommand(userPermissions: PermissionString[], command: Command): boolean{
        const commandPermissions: PermissionString[] = command.options.userPermissions || [];
        return commandPermissions.every(value => userPermissions.includes(value));
    }

    private getCommandsFromCategory(message: Message, categoryName: string): Command[]{
        const category = this.client?.categories.get(categoryName);

        const commands: Array<Command> = new Array();

        category?.forEach(cmd => {
            if(this.client?.isOwner(message.author.id)){
                commands.push(cmd);
            }
            else if(this.isUserAllowedToSeeCommand(message.member?.permissions.toArray() || [], cmd)){
                commands.push(cmd);
            }
        });

        return commands;
    }

    private getCategories(message: Message): Collection<string, Command[]>{
        const categories: Collection<string, Command[]> = new Collection();

        this.client?.categories.forEach((_, category)=> {
            const commands = this.getCommandsFromCategory(message, category)

            if(commands.length > 0){
                //we set all the categories to lowercase to have insensitive search for categories and commands ex: Say and say are valid and we want to accept both
                categories.set(category.toLowerCase(), commands);
            }
        });

        return categories;
    }

    /**
    *Temporary function, it takes a string and make it all lowercase except for the first letter
    */
    private formatWord(text: string): string{
        return text[0].toUpperCase() + text.slice(1).toLowerCase();
    }

    public exec(message: Message, { name }: { name: string }){
        name = name.toLowerCase();

        const embed = new MessageEmbed();
        embed.setColor(EmbedColor.BLUE);

        const previousButton = new MessageButton()
            .setID('help-previous')
            .setLabel('Previous')
            //Because the lib hasn't a good typescript support for now
            //@ts-ignore
            .setStyle('grey');

        const nextButton = new MessageButton()
            .setID('help-next')
            .setLabel('Next')
            //@ts-ignore
            .setStyle('grey');


        const helpButtons = new MessageActionRow().addComponents([previousButton, nextButton]);

        const categories = this.getCategories(message);

        if(name){
            //Help for a category
            if(name.startsWith('c-')){
                name = name.slice(2);
                const category = categories.get(name);

                embed.setTitle(`Command help for the ${name} category`);
                category?.forEach(cmd => {
                    embed.addField(`**${this.formatWord(cmd.id)}:**`, cmd.options?.description || 'No description provided');
                });
            }
            else {
                const cmd = this.client?.commands.get(name);

                embed.setTitle(`Command help for ${name}`)
                embed.setDescription(cmd?.options?.description || 'No description provided');
                embed.addField('Usage:', cmd?.options?.usage || 'No usage example provided')
                embed.addField('Parameters:', cmd?.options?.args?.map(arg => `**${this.formatWord(arg.id)}:** ${(arg.nullable ? '*(Optional)* ' : '')}${arg.description || 'No description provided'}`).join('\n'));
            }
            message.channel.send(embed);
        }
        else {
            //TODO: Add button interactions and pages, each category will have a page
            embed.setTitle('BotANF Help');
            embed.setDescription(`BotANF is discord bot that helps in some stuff like moderation, polls etc. Here's the list of all categories followed with their commands, use \`-help c-<category name>\` to get the list of commands for a category or use \`-help <command name>\` to get the details of a specific command`);
            categories.forEach((commands, category) => {
                const value = `\`${commands.map(cmd => cmd.id).join('` `')}\``
                embed.addField(`${this.formatWord(category)}:`, value);
            });

            message.channel.send('Help', {
                //@ts-ignore
                component: helpButtons,
                embed: embed
            });
        }

    }
}

export default HelpCommand;
