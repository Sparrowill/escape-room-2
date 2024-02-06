// Class for the 8 queens puzzle

import { Puzzle } from "./puzzle.js";

class Queen {
    constructor (id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.img;
        this.current_square = null;
        this.left;
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

class Square{
    constructor (id,div,x,y){
        this.id = id;;  
        this.div = div;
        this.x = x;
        this.y = y;
        this.full = false;
    }
    get_div(){
        return this.div;
    }
    is_full(){
        return this.full;
    }
}



export class Board extends Puzzle{
    constructor(name, background) {
        super(name,background);
        this.queens = [];
        this.squares = [];
    }

    reset_queens(){
        var puzzle =  document.getElementById("puzzle-view-bg");
        var remaining_queens = puzzle.getElementsByClassName("queen-sprite");
        while(remaining_queens[0]){
            remaining_queens[0].remove()
        }
        this.queens = []
        this.create_queens(puzzle);
        this.update_board();
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
            queen.left = x;
            queen.get_img().style.left = x;
            queen.get_img().style.top = y;
            this.dragElement(queen);
            puzzle.appendChild(queen.get_img());
            this.queens.push(queen);
        }
    }

    activate_board(){
        var puzzle =  document.getElementById("puzzle-view-bg");
        this.create_queens(puzzle);

        //Create 64 div for the squares
        var div_width = 4.3;
        var div_height = 8;
        var id = 0;
        for(var i=0; i<8; i++){ //rows
            for(var j = 0; j<8; j++){ //columns
                id++;
                var div = this.create_element("queen-div","div");
                div.style.width = div_width + "%";
                div.style.height = div_height + "%";
                var x = 33 + (div_width*j) + "%";
                var y = 19 + (div_height*i) + "%";
                
                div.style.left = x
                div.style.top = y
                var num = Math.floor(Math.random() * 4) + 1;
                if((i%2 == 0 && j%2 ==1)||(i%2==1 && j%2 ==0)){
                    div.style.backgroundImage =  "url('./images/puzzles/smoking/black" + num + ".png')"
                } else{
                    div.style.backgroundImage =  "url('./images/puzzles/smoking/white" + num + ".png')"
                }
                var square = new Square(id,div,x,y)
                square.x = j;
                square.y = i;
                this.squares.push(square);
                puzzle.appendChild(div);
            }
        }
        this.activate();

        const reset_btn = this.create_element("reset-btn","btn");
        reset_btn.addEventListener("click", () => {
            this.reset_queens();
        });
        puzzle.appendChild(reset_btn);
        //Add event listener to update squares whenever a queen is pike dup or dropped
        puzzle.addEventListener("mousedown", () => {
            this.update_board();
        });
        puzzle.addEventListener("mouseup", () => {
            this.update_board();
        });
    }

    update_board(){
        for(var i in this.squares){
            var square = this.squares[i];
            square.get_div().classList.remove("queen-div-red");
            square.full= false;
        }
        var filled_squares = [];
        for (var i in this.queens){
            var queen = this.queens[i];
            console.log(queen.current_square)
            //If queen is placed on the board
            if(queen.current_square != null){
                //Check all squares for threat
                for(var j in this.squares){
                    var square = this.squares[j];
                    //Check rook lines
                    if((square.x == queen.x)||(square.y == queen.y)){
                        square.get_div().classList.add("queen-div-red");
                        square.full = true;
                        filled_squares.push(square.id);
                    }
                }
            }
        }
    }


    dragElement(queen) {
        var elmnt = queen.get_img();
        var squares = this.squares;
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
        }
      
        function dragMouseDown(e) {
            queen.current_square = null;
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

          // Check if queen was released over div
          const queen_rect = elmnt.getBoundingClientRect();
          var dropped_square = null
          for (var i =0; i< squares.length; i++){
            var square = squares[i];
             const square_rect = square.get_div().getBoundingClientRect();
              if(queen_rect.right > square_rect.left){
                  if(square_rect.right > queen_rect.left){
                    if(queen_rect.bottom < square_rect.bottom){
                        if(square_rect.top < queen_rect.top){
                            dropped_square = square;
                            break;
                        }
                    }
                  }
              }
          }
          if((dropped_square != null) && (!(dropped_square.is_full()))){
            var div_width = 4.3;
            var div_height = 8;
            var id = dropped_square.id -1;
            var i = Math.floor((id)/8) ;
            var j = id-(i*8);
            var x = 33 + (div_width/4) + (div_width*j) + "%";
            var y = 19 + (div_height/4) + (div_height*i) + "%";
            elmnt.style.left = x;
            elmnt.style.top = y;
            queen.x = j;
            queen.y = i;
            queen.current_square = dropped_square.id;
            dropped_square.get_div().classList.add("queen-div-red");
          } else{
            //snap home
            queen.get_img().style.top = "90%"
            queen.get_img().style.left = queen.left;
            //Not dropped inside a square
            queen.current_square = null;
          }
        }
    }
}