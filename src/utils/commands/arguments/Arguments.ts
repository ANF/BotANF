import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import {InvalidInput} from "../../helper/Unauthorized";
import ArgumentTypes from "./ArgumentTypes";

export interface ArgumentOptions {
    id: string;
    type: ArgumentTypes;
    description?: string;
    default?: any;
    nullable?: boolean;
}

class Arguments {
    private _parsedArguments: object = {};
    private _error: boolean = false;
    private shiftList: boolean = true;

    constructor(private client: DiscordClient, private args: ArgumentOptions[], private message: Message, private content: string[]){
        this.parse();
    }

    private parse(){
        //TODO: rethink about the list manipulation, I'm not sure if it's all correct
        for(const arg of this.args){
            const parsedArg = this.cast(this.content[0] || '', arg);
            if(this.shiftList){
                this.content.shift();
            }

            if(!this._error){
                this._parsedArguments[arg.id] = parsedArg;
                break;
            }
            else {
                this.message.channel.send(InvalidInput(arg));
            }
        }

        this._parsedArguments = {
            ...this._parsedArguments,
            args: [...this.content]
        }
    }

    get parsedArguments(){
        return this._parsedArguments;
    }

    get error(){
        return this._error;
    }

    private cast(phrase: string, arg: ArgumentOptions): any{
        this.shiftList = true;

        const client = this.client;
        const message = this.message;

        const isNullable = arg.nullable ?? false;
        const defaultValue = arg.default;

        let data: any;

        switch(arg.type){
            case ArgumentTypes.STRING:
                data = phrase;
                break;

            case ArgumentTypes.NUMBER:
                data = Number(phrase);
                break;

            case ArgumentTypes.USER:
                const userId = this.getUserIdFromMention(phrase);
                data = client.users.cache.get(userId);
                break;

            case ArgumentTypes.MEMBER:
                const memberId = this.getUserIdFromMention(phrase);
                data = message.guild?.members.cache.get(memberId);
                break;

            case ArgumentTypes.ROLE:
                const roleId = this.getRoleIdFromMention(phrase);
                data = message.guild?.roles.cache.get(roleId);
                break;

            case ArgumentTypes.CHANNEL:
                const channel = this.getChannelIdFromMention(phrase);
                data = message.guild?.channels.cache.get(channel);
                break;
        }

        if(data == null){
            //We keep the message as it is
            this.shiftList = false;

            if(isNullable){
                if(defaultValue != null){
                    return defaultValue;
                }
                else {
                    return data;
                }
            }
            else {
                this._error = true;
                return;
            }
        }

        return data;
    }

    private getUserIdFromMention(mention: string): string{
        if(mention.startsWith('<@') && mention.endsWith('>')){
            mention = mention.slice(2, -1);
            if(mention.startsWith('!')) mention = mention.slice(1);
            return mention;
        }
        return mention;
    }

    private getRoleIdFromMention(mention: string): string{
        if(mention.startsWith('<&') && mention.endsWith('>')){
            return mention.slice(2, -1);
        }
        return mention;
    }

    private getChannelIdFromMention(mention: string): string{
        if(mention.startsWith('<#') && mention.endsWith('>')){
            return mention.slice(2, -1);
        }
        return mention;
    }
}


export default Arguments;
