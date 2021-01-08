import * as Discord from "discord.js"

// colors for showing the embed wrt. result
enum Colors {
    TRANSPARENT = 0x36393f,
    BAD_RED = 0xff7675,
    GOOD_GREEN = 0x55efc4,
    WARNING_YELLOW = 0xfdcb6e,
    INFO_LIGHTBLUE = 0x74b9ff
}

export class Announcements {
    // error announcement, if the command fails to work, error announcement should be called.
    public static error(discordMessageInstance: Discord.Message, title: string, description?: string, deleteAfter?: boolean) {
        
        // declaring the embed.
        const embed = new Discord.MessageEmbed().setColor(Colors.BAD_RED).setTitle(`${title}`);
        
        // setting the description, only if it is provided.
        if (description) {
            embed.setDescription(description);
        }
        
        // sending the embed
        const sentMessage = discordMessageInstance.channel.send(embed);
        
        // clearing the error embed after 5 seconds.
        if (deleteAfter) {
            sentMessage.then(message => {
                // @ts-ignore
                message.delete(5000);
            });
        }
    }
    
    // success announcement, if the command works successfully, success announcement should be called.
    public static success(discordMessageInstance: Discord.Message, title: string, description?: string, deleteAfter?: boolean) {
        
        // declaring the embed
        const embed = new Discord.MessageEmbed().setColor(Colors.GOOD_GREEN).setTitle(`${title}`);
        
        // setting description if it is provided.
        if (description) {
            embed.setDescription(description);
        }
        
        // sending the embed.
        const sentMessage = discordMessageInstance.channel.send(embed);
        
        // deleting the embed after 5 seconds.
        if (deleteAfter) {
            sentMessage.then(message => {
                // @ts-ignore
                message.delete(5000);
            });
        }
    }
}
