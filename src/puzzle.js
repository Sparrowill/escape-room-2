import { show_text } from "./interaction.js";

export class Puzzle {
    constructor(name, background){
        this.name = name;
        this.background = background;
        this.active = false;
        this.explanation = "";
        this.success_text = "";
        this.success_func;
        this.hints = "";
        this.children = [];
        this.current_text = "";
        this.long_text_on = false;
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
            this.show_long_text(this.explanation);
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
        this.show_long_text(this.explanation);
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
            this.hide_long_text(); //In case it's still visible
        }
        this.active = false;
    }

    get_name() {
        return this.name;
    }

    is_active() {
        return this.active;
    }

    set_explanation(text){
        this.explanation = text;
    }

    set_success_text(text, success_func){
        this.success_text = text;
        this.success_func = success_func;
    }

    show_long_text(input_text){
        // If it's new text to show, turn off the old one
        if(this.long_text_on && this.current_text != input_text){
            this.hide_long_text();
        }
        // If there isn't a long text on already
        if(this.long_text_on == false){
            this.current_text = input_text;
            // Create bckground
            var text_box = document.createElement("div");
            text_box.id = "long-text-bg"
            text_box.classList.add("long-text-bg");
            // Create long text
            var text = document.createElement("p");
            text.id = "long-text-text";
            text.classList.add("long-text-text");
            text.innerHTML=input_text;
            //Create exit button
            var exit = document.createElement("btn");
            exit.id = "long-text-exit";
            exit.classList.add("long-text-exit");
            exit.textContent = "X";
            exit.addEventListener("click", () => {
                this.hide_long_text()
            });
            // Add all to doc
            text_box.appendChild(text);
            text_box.appendChild(exit);
            document.getElementById("puzzle-view-bg").appendChild(text_box);
            this.long_text_on = true;
        }
    }
    hide_long_text(){
        var long_text = document.getElementById("long-text-bg");
        long_text.replaceChildren();
        long_text.remove();
        this.long_text_on = false;

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
            this.solved =  true;
            this.show_long_text(this.success_text);
            this.success_func();
            return true;
        } else{
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

