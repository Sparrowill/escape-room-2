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
        this.hint_on = false;
        this.children = [];
        this.current_text = "";
        this.long_text_on = false;
        this.answer;
        this.solved = false;
        this.music= false;
        this.playing = false;
        this.single_guess = false;
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
        if(this.music){
            var audio = new Audio(this.url);
            audio.loop = true;
            audio.volume=0.5;
            audio.play();
            this.playing = true;
        }
        // Set up exit button
        const exit_btn = this.create_element("exit-btn","btn");
        exit_btn.addEventListener("click", () => {
            if(this.music){
                audio.pause();
            }
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
         // If puzzle involves music
         if(this.music){
            //Set up volume Up button
            const vol_up_btn = this.create_element("vol-up-btn","btn");
            vol_up_btn.addEventListener("click", () => {
                if(audio.volume<0.9){
                    audio.volume+=0.1;
                }
            });
            puzzle.appendChild(vol_up_btn);
            //Set up volume down button
            const vol_down_btn = this.create_element("vol-down-btn","btn");
            vol_down_btn.addEventListener("click", () => {
                if(audio.volume>0.1){
                    audio.volume-=0.1;
                }

            });
            puzzle.appendChild(vol_down_btn);
            //Set up play/psue button
            const play_pause_btn = this.create_element("play-pause-btn","btn");
            play_pause_btn.addEventListener("click", () => {
                if(this.playing){
                    audio.pause();
                    this.playing = false;
                } else{
                    audio.play();
                    this.playing = true;
                }
            });
            puzzle.appendChild(play_pause_btn);

        }
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
            if(!this.solved){
                var answer = answer_input.value;
                this.check_answer(answer)
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
        if(this.long_text_on){
            this.hide_long_text(); //In case it's still visible
        }
        if(this.hint_on){
            this.hide_hints();
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

    is_music_puzzle(url){
        this.music = true;
        this.url = url
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
        if(!this.hint_on){
            // Create div
            const hint_bg = document.createElement("div");
            hint_bg.id = "hint-bg";
            hint_bg.classList.add("hint-bg");
            // Create Title
            const hint_title = document.createElement("p");
            hint_title.classList.add("hint-title");
            hint_title.innerHTML = "<b>Hints</b> <br> This section will allow you to get hints on a puzzle, if you're stuck. Later hints reveal more about the puzzle.<br><b>The last hint is always the answer to the puzzle.</b>";
            // Create dropdown
            var select = document.createElement("select");
            select.classList.add("hint-dropdown");
            for (var i = 1; i<this.hints.length + 1; i++){
                var option = document.createElement("option");
                option.setAttribute("value", i);
                option.textContent = "Hint " + i;
                select.appendChild(option);
            }
            
            // Create hint area
            const hint_text = document.createElement("p");
            hint_text.id = "hint-text";
            hint_text.classList.add("hint-text");
            //Create Show Button
            const show_hint = document.createElement("btn");
            show_hint.id = "show-hint";
            show_hint.classList.add("show-hint");
            show_hint.innerText = "Show Hint";
            show_hint.addEventListener("click", () => {
                var index = select.value;
                hint_text.innerText = this.hints[index-1];
            })
            //Create hide button
            const hide_hint = document.createElement("btn");
            hide_hint.id = "hide-hint";
            hide_hint.classList.add("hide-hint");
            hide_hint.textContent = "X";
            hide_hint.addEventListener("click", () => {
                this.hide_hints()
            });
            //update hint area based on dropdown

            //Add it all to the page
            hint_bg.appendChild(hint_title);
            hint_bg.appendChild(select);
            hint_bg.appendChild(show_hint);
            hint_bg.appendChild(hint_text);
            hint_bg.appendChild(hide_hint);
            document.getElementById("puzzle-view-bg").appendChild(hint_bg);
            this.hint_on = true;
        }
    }

    hide_hints(){
        var hint_bg = document.getElementById("hint-bg");
        hint_bg.replaceChildren();
        hint_bg.remove();
        this.hint_on = false;
    }

    set_answer(answer){
        this.answer = answer;
    }

    check_answer(check_answer){
        if(typeof(check_answer) == "string"){
            check_answer = check_answer.toUpperCase();
        }
        if (this.answer == check_answer){
            this.solved =  true;
            this.show_long_text(this.success_text);
            this.success_func();
            return true;
        } else{
            show_text("That's not correct");
            if(this.single_guess){
                console.log("Everywehre")
                this.deactivate();
            }
            return false;
        }
    }

    is_solved(){
        return this.solved;
    }

    one_guess(){
        this.single_guess = true;
    }
}

