// Class for the 8 queens puzzle

import { Puzzle } from "./puzzle.js";

class Queen {
    constructor (id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.img;
    }
    get_x(){
        return this.x
    }
    get_y(){
        return this.y
    }
    set_img(img){
        this.img = img;
    }
    get_img(){
        return this.img;
    }
}




export class Board extends Puzzle{
    constructor(name, background) {
        super(name,background);
        this.queens = [];
    }

    reset_queens(){
        var puzzle =  document.getElementById("puzzle-view-bg");
        var remaining_queens = puzzle.getElementsByClassName("queen-sprite");
        while(remaining_queens[0]){
            puzzle.removeChild(remaining_queens[0])
        }
        this.create_queens(puzzle);
    }

    create_queens(puzzle){
        //add queens to the board.
        for(var i =0; i<8; i++){
            var img = this.create_element("queen-sprite","img")
            img.src = "./images/puzzles/smoking/queen.png"
            var x = 30+(5*i) + "%";
            var y = "90%";
            var queen = new Queen(i,x,y);
            queen.set_img(img);
            queen.get_img().style.left=x;
            queen.get_img().style.top = y;
            this.dragElement(queen);
            puzzle.appendChild(queen.get_img());
            this.queens.push(queen);
        }
    }

    activate_board(){
        var puzzle =  document.getElementById("puzzle-view-bg");
        this.create_queens(puzzle);
        
        this.activate();

        const reset_btn = this.create_element("reset-btn","btn");
        reset_btn.addEventListener("click", () => {
            this.reset_queens();
        });
        puzzle.appendChild(reset_btn);
    }

    dragElement(queen) {
        var elmnt = queen.get_img();
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
        }
      
        function dragMouseDown(e) {
            //Check if queen is already inside div
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
          
        }
    }
}