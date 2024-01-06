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
        puzzle.style.display="block";
        //Set background
        document.getElementById("puzzle-view").src=this.background
        // Set up exit button
        const exit_btn = document.createElement("btn");
        exit_btn.id = "exit-btn";
        exit_btn.classList.add("exit-btn");
        this.btns.push(exit_btn);
        exit_btn.addEventListener("click", () => {
            this.deactivate();
         });
        puzzle.appendChild(exit_btn);
        //Set up explanation button
        const explanation_btn = document.createElement("btn");
        explanation_btn.id = "explanation-btn";
        explanation_btn.classList.add("explanation-btn");
        this.btns.push(explanation_btn);
        explanation_btn.addEventListener("click", () => {
            this.show_explanation();
         });
         puzzle.appendChild(explanation_btn);
        //Set up hint button
        const hint_btn = document.createElement("btn");
        hint_btn.id = "hint-btn";
        hint_btn.classList.add("hint-btn");
        this.btns.push(hint_btn);
        hint_btn.addEventListener("click", () => {
            this.show_hint();
         });
         puzzle.appendChild(hint_btn);


        // Show explanation initially
        this.show_explanation();
    }

    deactivate() {
        var puzzle =  document.getElementById("puzzle-view-bg");
        //Remove Puzzle
        document.getElementById("puzzle-view").src="";
        //Remove puzzle children
        this.btns.forEach( (btn) => {
            btn.remove();
        });
        puzzle.style.display="none";
        if(this.explanation_on){
            this.hide_explanation(); //In case it's still visible
        }
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

    // This could then also house the hint section. 
    // Set hints takes an array and creates a dropdown based on how many are given

// Swap inventory out to dark wood texture. OR translucent colour. Look at original for ideas.