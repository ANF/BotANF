import Listener from "../utils/events/Event";

class Ready extends Listener {
    constructor(){
        super('ready');
    }

    async exec(){
        console.log('Logged in');
    }
}

export default Ready;
