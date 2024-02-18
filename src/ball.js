import { show_text } from "./interaction.js";
import { Puzzle } from "./puzzle.js";

// Code to run a puzzle that solves the 9 ball problem.
// 9 identical balls, except one is slightly lighter. 1 set of scales
// Using the scales only twice, figure out which ball is the lighter one


// Add event listeners for mouse down, and then mouse up. Mouse up checks for which side of the screen it's on, then sends it to the appropriate stacking function.
// Use CSS to stack balls appropriately all the way up to 9
// Add a div on top of the scales to add each left/right pile to. Makes moving them easier. One big div encompassing scales, sprinte, and all balls.
//Reset button will then need to remove sprites from div, and recreate them at home.
class Ball {
    constructor (weight, number){
        this.weight = weight;
        this.number = number;
        this.left;
        this.ball_img;
        this.placed = false;

    }
    weight(){
        return this.weight;
    }
    number(){
        return this.number;
    }
    set_left(left){
        this.left = left;
    }
    get_left(){
        return this.left;
    }
    set_img(ball_img){
        this.ball_img = ball_img;
    }
    get_img(){
        return this.ball_img;
    }
}

export class Scales extends Puzzle{
    constructor (name, background) {
        super(name, background);
        this.balls = [];
        this.left_weight = 0;
        this.right_weight = 0;
        this.scales_sprite;
        this.left_scale;
        this.right_scale;
        this.timeout;
        this.num_weighs = 2;
    }
    one_guess(){
        super.one_guess();
    }
    calculate_weight(){
        if(this.num_weighs == 0){
            show_text("You have 0 weighs remaining. Restart the puzzle.");
        } else {
            var puzzle =  document.getElementById("puzzle-view-bg");
            var block_btn = this.create_element("button-block", "div");
            puzzle.append(block_btn);
            var left = document.getElementById("left-scale");
            var right = document.getElementById("right-scale");
            // Get balls on left
            for (const ball of left.children) {
                this.left_weight += this.balls[ball.id-1].weight;
            }
            for (const ball of right.children) {
            this.right_weight += this.balls[ball.id-1].weight
            }
            this.do_tip();
        }
    }
    do_tip(){
        var scale = document.getElementById("scales-sprite-div");
        var left = document.getElementById("left-scale");
        var right = document.getElementById("right-scale");
        if(this.left_weight > this.right_weight)  {
            scale.style.animation = "left-scales 5s 1";
            left.style.animation = "down-left-balls 5s 1";
            right.style.animation = "up-right-balls 5s 1";
        }  
        else if(this.right_weight > this.left_weight) {
            scale.style.animation = "right-scales 5s 1";
            right.style.animation = "down-right-balls  5s 1";
            left.style.animation = "up-left-balls 5s 1";
        }
         else { // Equal
            scale.style.animation = "neither-scales 5s 1";
            right.style.animation = "neither-right-balls  5s 1";
            left.style.animation = "neither-left-balls 5s 1";
        }
        this.timeout = setTimeout(() =>  {
            scale.style.animation= "";
            right.style.animation = "";
            left.style.animation = "";
            //this.reset_balls();
            this.num_weighs--;
            if(this.num_weighs == 1){
                show_text("You have " + this.num_weighs + " weigh remaining");
            } else {
                show_text("You have " + this.num_weighs + " weighs remaining");
            }
            document.getElementById("button-block").remove();
            }, 5000);

    }
    reset_balls(){
        //Remove all stacked balls
        document.getElementById("left-scale").replaceChildren();
        document.getElementById("right-scale").replaceChildren();
        //Remove remaining balls
        var puzzle =  document.getElementById("puzzle-view-bg");
        var remaining_balls = puzzle.getElementsByClassName("ball-sprite");
        while(remaining_balls[0]){
            puzzle.removeChild(remaining_balls[0]);
        }
        //Recreate all balls
        for(var i =0; i< this.balls.length; i++){
            this.balls[i].placed = false;
            var img = this.balls[i].get_img();
            img.style.left=this.balls[i].get_left();
            img.style.top = "70%";
            img.style.width = "3%";
            img.style.bottom = "";
            puzzle.appendChild(img);
        }
        this.left_weight = 0;
        this.right_weight = 0;
    }
    activate_scales(){
        //add scales section.
        var puzzle =  document.getElementById("puzzle-view-bg");
        //Add scales div
        var div = this.create_element("scales-sprite-div", "div");
        this.scales_sprite = this.create_element("scales-sprite","img");
        this.scales_sprite.src = "./images/puzzles/billiards/scales.png";
        div.appendChild(this.scales_sprite);
        puzzle.appendChild(div);
        //Create divs for balls to sit in
        this.left_scale = this.create_element("ball-div", "div");
        this.left_scale.id = "left-scale";
        this.left_scale.style.left=("32%");
        this.left_scale.addEventListener("mouseenter", () => {
            this.left_scale.title = "True";
        });
        this.left_scale.addEventListener("mouseleave", () => {
            this.left_scale.title = "False";
        });
        puzzle.appendChild(this.left_scale);
        this.right_scale = this.create_element("ball-div", "div");
        this.right_scale.id = "right-scale";
        this.right_scale.style.left=("54%");
        this.right_scale.addEventListener("mouseenter", () => {
            this.right_scale.title = "True";
        });
        this.right_scale.addEventListener("mouseleave", () => {
            this.right_scale.title= "False";
           
        });
        puzzle.appendChild(this.right_scale);
        // Create balls
        //Reset balls to 0 
        this.balls.length = 0;
        //Reset weights too
        this.left_weight = 0;
        this.right_weight = 0;
        // Random one to be heavy (pick random 0-8)
        var heavy = Math.floor(Math.random() * 9);
        for(var i =0; i<9; i++){
            var ball;
            if(i == heavy){
                ball = new Ball(2,i);
                console.log(ball);
            }else{
                ball = new Ball(1,i);
            }
            var ball_img = this.create_element("ball-sprite","img");
            ball_img.src = "./images/puzzles/billiards/" + (i+1).toString() + ".png";
            var left = (27 + (5*i)).toString() + "%";
            ball_img.style.left = left;
            ball_img.id = i+1;
            puzzle.appendChild(ball_img);
            ball.set_img(ball_img);
            ball.set_left(left);
            this.dragElement(ball);
            this.balls.push(ball);
        }
        this.set_answer(heavy+1);
        this.activate();
        //Create reset_btn after others 
        const reset_btn = this.create_element("reset-btn","btn");
        reset_btn.addEventListener("click", () => {
            this.reset_balls();
        });
        puzzle.appendChild(reset_btn);
        //Create weigh_btn after others 
        const weigh_btn = this.create_element("weigh-btn","btn");
        weigh_btn.addEventListener("click",() => { 
            this.calculate_weight()
        });
        puzzle.appendChild(weigh_btn);
        this.num_weighs = 2;
    }
    dragElement(ball) {
        var elmnt = ball.get_img();
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            //Check if ball is already inside div
            if(!ball.placed){
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          // Check if item was released on scales
          var left = document.getElementById("left-scale");
          var right = document.getElementById("right-scale");
            if(left.title == "True"){
                add_to_div(left);
                left.appendChild(ball.ball_img);
                ball.placed = true;
            } else if(right.title == "True"){
                add_to_div(right);
                right.appendChild(ball.ball_img);
                ball.placed = true;
            } else {
                //Snap back to home
                ball.ball_img.style.left=ball.get_left();
                ball.ball_img.style.top = "70%";
            }
        }
        function add_to_div(elmnt){
            // Get number of balls inside div already
            var num_balls = elmnt.children.length;
            //Do stacking
            if(num_balls>=7){
                ball.ball_img.style.left=((num_balls % 7) * 25) + 25 + "%";
                ball.ball_img.style.top= "40%";   
            } else if (num_balls>=4) {
                ball.ball_img.style.left=((num_balls % 4) * 25) + 12.5 +"%";
                ball.ball_img.style.top= "60%";   
            } else{
                ball.ball_img.style.left=((num_balls % 4) * 25) + "%";
                ball.ball_img.style.top= "80%";   

            }
            //position accordingly
            ball.ball_img.style.width="25%";
        }

    }
    
}
