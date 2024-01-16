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
        this.balls_left = []
        this.balls_right = []
        this.heavy;
        this.scales_sprite;
        this.left_scale;
        this.right_scale;
    }
    add_ball(ball, left){
        if(left == true){
            this.balls_left.push(ball);
        } else{
            this.balls_right.push(ball);
        }
    }
    calculate_weight(){

    }
    do_tip(){
        
    }
    reset_balls(){
        for(var i =0; i< this.balls.length; i++){
            var img = this.balls[i].get_img();
            img.style.left=this.balls[i].get_left();
            img.style.top = "70%";
        }
    }
    activate_scales(){
        //add scales section.
        var puzzle =  document.getElementById("puzzle-view-bg");
        this.scales_sprite = this.create_element("scales-sprite","img");
        this.scales_sprite.src = "./images/puzzles/billiards/scales.png";
        puzzle.appendChild(this.scales_sprite);
        //Create divs for balls to sit in
        this.left_scale = this.create_element("ball-div", "div");
        this.left_scale.id = "left-scale";
        this.left_scale.style.left=("34%");
        this.left_scale.addEventListener("mouseenter", () => {
            console.log(this.left_scale);
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
        //Set up reset button
        // Create balls
        // Random one to be heavy (pick random 0-8)
        var heavy = Math.floor(Math.random() * 9);
        //Remove zero index
        heavy++;
        for(var i =0; i<9; i++){
            var ball;
            if(i == heavy){
                ball = new Ball(2,i);
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
        this.set_answer(heavy);
        this.activate();
        //Create reset_btn after others 
        const reset_btn = this.create_element("reset-btn","btn");
        reset_btn.addEventListener("click", () => {
            this.reset_balls();
        });
        puzzle.appendChild(reset_btn);
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
          console.log("Grabbed Ball #");
          console.log(ball.number+1);
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
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
            add_to_div();
            left.appendChild(ball.ball_img);
            } else if(right.title == "True"){
                add_to_div();
            right.appendChild(ball.ball_img);
            } else {
                console.log("Not released inside div");
            }
        }
        function add_to_div(){
            ball.ball_img.style.left="0%";
            ball.ball_img.style.top="0%";
            ball.ball_img.style.width="25%";
            //TODO fix the reset function.
            //TODO implment stacking, ideally through CSS, but can be specified if necessary
        }
      
    }
}
