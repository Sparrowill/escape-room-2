import { show_text } from "./interaction.js";

export class Puzzle {
    constructor(name, background){
        this.name = name;
        this.background = background;
        this.active = false;
        this.explanation = "";
        this.hints = "";
        this.children = [];
        this.explanation_on = false;
        this.answer;
        this.solved = false;
    }
    create_element(style, type){
        const element = document.createElement(type);
        element.id = style;
        element.classList.add(style);
        this.children.push(element);
        return element;
    }
    activate() {
        this.active = true;
        var puzzle =  document.getElementById("puzzle-view-bg");
        puzzle.style.display="block";
        //Set background
        document.getElementById("puzzle-view").src=this.background
        // Set up exit button
        const exit_btn = this.create_element("exit-btn","btn");
        exit_btn.addEventListener("click", () => {
            this.deactivate();
         });
        puzzle.appendChild(exit_btn);
        //Set up explanation button
        const explanation_btn = this.create_element("explanation-btn","btn");
        explanation_btn.addEventListener("click", () => {
            this.show_explanation();
         });
         puzzle.appendChild(explanation_btn);
        //Set up hint button
        const hint_btn = this.create_element("hint-btn","btn");
        hint_btn.addEventListener("click", () => {
            this.show_hints();
         });
         puzzle.appendChild(hint_btn);
        // Set up answer input
        // Create background
        const text_box = this.create_element("answer-input-bg","div");
        // Create input text
        const answer_input = this.create_element("answer-input","input");
        answer_input.type = "text";
        // Create check answer btn
        const answer_btn = this.create_element("answer-btn","btn");
        answer_btn.innerText ="Check";
        answer_btn.addEventListener("click", () => {
            var answer = answer_input.value;
            if(this.check_answer(answer)){
                console.log("Correct");
            }
            else{
                console.log("Incorrect");
            }   
         });
        // Add to doc
        text_box.appendChild(answer_input);
        text_box.appendChild(answer_btn);
        puzzle.appendChild(text_box);
        // Show explanation initially
        this.show_explanation();
    }

    deactivate() {
        var puzzle =  document.getElementById("puzzle-view-bg");
        //Remove Puzzle
        document.getElementById("puzzle-view").src="";
        //Remove puzzle children
        this.children.forEach( (child) => {
            child.remove();
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
    //TODO Modify to accept the 'you got it correct' message as well.
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
    show_hints(){
        console.log("Hints are shown now");
    }
    set_answer(answer){
        this.answer = answer;
    }
    check_answer(check_answer){
        if (this.answer == check_answer){
            this.solved = true;

            return true;
        } else{
            this.solved = false;
            show_text("That's not correct");
            return false;
        }
    }
    is_solved(){
        return this.solved;
    }
}

    // This could then also house the hint section. 
    // Set hints takes an array and creates a dropdown based on how many are given

// Swap inventory out to dark wood texture. OR translucent colour. Look at original for ideas.