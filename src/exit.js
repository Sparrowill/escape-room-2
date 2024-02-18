import { Puzzle } from "./puzzle.js";

export class Exit extends Puzzle{
    constructor(name, background) {
        super(name,background);
        this.order = "";
        this.sequence = "001132320"
    }

    check_solve(){
        if (this.order.includes(this.sequence)){
            this.check_answer("ANSWER")
        }
    }
    add_to_order(id){
        this.order += String(id);
        console.log(this.order);
        this.check_solve();
    }



    activate_door(){
        var puzzle =  document.getElementById("puzzle-view-bg");
        const top_y = "67.5%"
        const bottom_y = "79%"
        const self = this; // To preserve context within event listerner
        const handle_class = ["left-handle", "right-handle","left-handle", "right-handle"];
        const top = [top_y, top_y, bottom_y, bottom_y];
        const knob_class = ["left-knob","right-knob","left-knob","right-knob"];
        const knob_src =["./images/puzzles/smoking/exit-knob-left.png","./images/puzzles/smoking/exit-knob-right.png","./images/puzzles/smoking/exit-knob-left.png","./images/puzzles/smoking/exit-knob-right.png"];
        for (var i =0; i<4; i++){
            var handle = this.create_element(handle_class[i], "div");
            handle.id = i;
            handle.style.top = top[i];
            var knob = this.create_element(knob_class[i], "img");
            knob.src = knob_src[i];
            handle.addEventListener("click", function(){
                var knob = this.firstChild;
                knob.style.animation =  "knob-rotate 1s 1";
                self.add_to_order(this.id)
                setTimeout(function(){
                    knob.style.animation = "";
                },1000);
            });
            handle.appendChild(knob);
            puzzle.appendChild(handle);
        }
       




        this.set_answer("ANSWER");
        this.activate();
    }
}