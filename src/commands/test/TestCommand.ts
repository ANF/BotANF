import Command from "../../utils/commands/Command";
import { Message } from "discord.js";

class TestCommand extends Command {
    constructor(){
        super('test', {
            description: 'Just a test command',
            category: 'random',
            aliases: ['testt']
        });
    }

    exec(message: Message, { args }: { args: string[] }){
        message.channel.send('Hello ' + args.join(''));
    }
}

export default TestCommand;
