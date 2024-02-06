import {Scene} from "./scene.js"
import {move, show_interact,show_text} from "./interaction.js"
import { smoking_chess } from "./puzzles.js";

export function create_smoking(){

    var smoking_entrance = new Scene("smoking-entrance", "./images/backgrounds/smoking/entrance.png");
    smoking_entrance.add_nav_btn("to-interior","50","30",move,"smoking-interior");
    smoking_entrance.add_interact_btn("cabinet","0","50","0","40","15",show_interact,"A cabinet. Open it?","Yes", function(){
       
        if(smoking_chess.is_solved()){
            show_text("There's nothing more in this cabinet");
        }
        else{
           smoking_chess.activate_board();
        }
    });
    window.scenes.push(smoking_entrance);

    var smoking_interior = new Scene("smoking-interior", "./images/backgrounds/smoking/interior.png");
    smoking_interior.add_nav_btn("to-billiards","37","30",move,"billiards-entrance");
    smoking_interior.add_nav_btn("to-entrance","45","50",move,"smoking-entrance");
    window.scenes.push(smoking_interior);

smoking_entrance.activate();
}