import { Puzzle } from "./puzzle.js";

export class Exit extends Puzzle{
    constructor(name, background) {
        super(name,background);
    }

    




    activate_door(){
        this.set_answer("ANSWER");
        this.activate();
        
        // Create four door handles.
    }
}