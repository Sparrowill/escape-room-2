export class Puzzle {
    constructor(name, background){
        this.name = name;
        this.background = background;
        this.active = false;
        this.explanation = "";
        this.hints = "";
        this.btns = [];
        this.explanation_on = false;
    }
    activate() {
        this.active = true;
        var puzzle =  document.getElementById("puzzle-view-bg");
        //Set background
        document.getElementById("puzzle-view").src=this.background
        // Set up exit button
        
        //Set up explanation button
        const btn = document.createElement("btn");
        btn.id = "explanation-btn";
        btn.classList.add("explanation-btn");
        this.btns.push(btn);
        btn.addEventListener("click", () => {
            this.show_explanation();
         });
         puzzle.appendChild(btn);
        //Set up hint button
    }

    deactivate() {
        //var room = document.getElementById("room-view-bg");
        // Remove placed html DOM children, leave img
        //room.replaceChildren();
        //var img = document.createElement("img");
        //img.id = "room-view";
        //img.classList.add("room-view")
        //room.appendChild(img)
        this.active = false;
    }

    get_name() {
        return this.name;
    }

    is_active() {
        return this.active;
    }
    set_explanation(explanation){
        this.explanation = explanation;
    }
    show_explanation(){
        if(this.explanation_on == false){
            // Create bckground
            var text_box = document.createElement("div");
            text_box.id = "explanation-bg"
            text_box.classList.add("explanation-bg");
            // Create explnation
            var text = document.createElement("p");
            text.id = "explanation-text";
            text.classList.add("explanation-text");
            text.innerHTML=this.explanation;
            //Create exit button
            var exit = document.createElement("btn");
            exit.id = "explanation-exit";
            exit.classList.add("explanation-exit");
            exit.textContent = "X";
            exit.addEventListener("click", () => {
                this.hide_explanation()
            });
            // Add all to doc
            text_box.appendChild(text);
            text_box.appendChild(exit);
            document.getElementById("puzzle-view-bg").appendChild(text_box);
            this.explanation_on = true;
        }
    }
    hide_explanation(){
        var explanation = document.getElementById("explanation-bg");
        explanation.replaceChildren();
        explanation.remove();
        this.explanation_on = false;

    }
    set_hints(hints){
        this.hints=hints;
    }
}
    // Set explanation takes a long string of text which explains the puzzle
    /*You find a large mess of pipework behind the screen. A plumber has clearly been working on the system, but hasn't started taking
    things apart yet. You find a note that reads "To the next poor sod that has to work on this. I've given up, but I've left you my map of the pipework. I hope it helps."
    ". */
    // Show explanation txt displays this on top of the puzzle, alongside an OK button
    // Explanation is reachable from top left at all times.
    // Have a common i info icon in all puzzle screens?
    // This could then also house the hint section. 
    // Set hints takes an array and creates a dropdown based on how many are given

// Swap inventory out to dark wood texture. OR translucent colour. Look at original for ideas.