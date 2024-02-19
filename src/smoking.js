import {Scene} from "./scene.js"
import {move, show_interact, show_text} from "./interaction.js"
import { smoking_chess, smoking_exit } from "./puzzles.js";

export var smoking_entrance, smoking_end
export function create_smoking(){

    smoking_entrance = new Scene("smoking-entrance", "./images/backgrounds/smoking/entrance.png");
    smoking_entrance.add_nav_btn("to-interior","50","30",move,"smoking-interior");
    smoking_entrance.add_interact_btn("cabinet","0","50","0","40","15",show_interact,"A cabinet. Open it?","Yes", function(){
       
        if(smoking_chess.is_solved()){
            show_text("There's nothing more in this cabinet");
        }
        else{
           smoking_chess.activate_board();
        }
    });
    smoking_entrance.add_interact_btn("exit","59","15","0","37","5",show_interact,"This is the exit. Want to have a look?", "Yes", function(){
        if(smoking_exit.is_solved()){
            show_text("You've solved the last puzzle. Click the yellow dot to leave the game!")
        } else{
            smoking_exit.activate_door();
        }
    })
    smoking_entrance.add_interact_btn("exit","64","15","0","17","5",show_interact,"This is the exit. Want to have a look?", "Yes", function(){
        if(smoking_exit.is_solved()){
            show_text("You've solved the last puzzle. Click the yellow dot to leave the game!")
        } else{
            smoking_exit.activate_door();
        }
    })
    smoking_entrance.add_feedback_btn("large-painting","0","10","0","30","27",show_text,"A large painting. Disappointingly nothing behind it.");
    smoking_entrance.add_feedback_btn("small-paintings","29","10","0","28","8",show_text,"Some smaller portraits of occupants of the house.");
    smoking_entrance.add_feedback_btn("seating","15","40","0","40","35",show_text,"This being a smoking room, it seems apt to have deep burgundy furniture to recline on with a cigar and a port after a large lunch. Unfortunately you have neither of these things, so keep off");
    smoking_entrance.add_feedback_btn("vase","82","40","0","30","9",show_text,"Just a big ol' vase.");


    window.scenes.push(smoking_entrance);

    var smoking_interior = new Scene("smoking-interior", "./images/backgrounds/smoking/interior.png");
    smoking_interior.add_nav_btn("to-billiards","37","30",move,"billiards-entrance");
    smoking_interior.add_nav_btn("to-entrance","45","50",move,"smoking-entrance");
    
    smoking_interior.add_interact_btn("cabinet","58","38","0","10","5",show_interact,"A cabinet. Open it?","Yes", function(){
        if(smoking_chess.is_solved()){
            show_text("There's nothing more in this cabinet");
        }
        else{
           smoking_chess.activate_board();
        }
    });
    smoking_interior.add_feedback_btn("large-painting","66","10","0","30","34",show_text,"A large painting. Disappointingly nothing behind it.");
    smoking_interior.add_feedback_btn("seating","48","50","0","40","52",show_text,"This being a smoking room, it seems apt to have deep burgundy furniture to recline on with a cigar and a port after a large lunch. Unfortunately you have neither of these things, so keep off");
    smoking_interior.add_feedback_btn("small-paintings","43","10","0","23","23",show_text,"Some smaller portraits of occupants of the house.");
    smoking_interior.add_feedback_btn("credenza","0","40","0","60","25",show_text,"'The largest locked cabinet in the room, surely he's hidden something in there!' I hear you cry. Alas, no.");
    smoking_interior.add_feedback_btn("credenza2","0","10","0","30","15",show_text,"'The largest locked cabinet in the room, surely he's hidden something in there!' I hear you cry. Alas, no.");

    smoking_interior.add_feedback_btn("more-paintings","15","10","0","30","18",show_text,"It is a very arty room this isn't it.. I'm not sure I like it.");
    smoking_interior.add_feedback_btn("even-more-paintings","33","10","0","12","10",show_text,"I have simply run out of quips about paintings. There are far too many in this room.");
    window.scenes.push(smoking_interior);

    smoking_end = new Scene("smoking-end","./images/backgrounds/splash/splash.png");
    smoking_end.is_final_scene();
    window.scenes.push(smoking_end);
}