import {Scene} from "./scene.js"
import {move, show_text, show_interact} from "./interaction.js"
import {stables_plumbing} from "./puzzles.js";

export var stables_interior;

export function create_stables(){
    var stables_entrance = new Scene("stables-entrance","./images/backgrounds/stables/entrance.png");
    stables_entrance.add_nav_btn("to-interior","75","20",move,"stables-interior");
    stables_entrance.add_nav_btn("to-mirza","50","20",move,"stables-mirza");
    stables_entrance.add_feedback_btn("sleigh","40","60","40","20", "10",show_text,"You have clicked the sleigh");
    stables_entrance.add_feedback_btn("cart","60","40","40","20", "10",show_text,"You have clicked the cart");
    stables_entrance.add_interact_btn("hassan","10","14","0","3","4",show_interact,"Shall we print 'Hassan' to console?", "Print",function(){console.log("Hassan");})
    window.scenes.push(stables_entrance);
    
    stables_interior = new Scene("stables-interior","./images/backgrounds/stables/interior.png");
    stables_interior.add_nav_btn("to-entrance","30","30",move,"stables-entrance");
    stables_interior.add_nav_btn("to-mirza","70","40",move,"stables-mirza");

    window.scenes.push(stables_interior);
    
    var stables_mirza = new Scene("stables-mirza","./images/backgrounds/stables/mirza.png");
    stables_mirza.add_nav_btn("to-entrance","5","90",move,"stables-entrance");
    stables_mirza.add_nav_btn("to-interior","95","90",move,"stables-interior");
    stables_mirza.add_interact_btn("board","45","60","10","20","20",show_interact,"There's something behind this board. ", "Look",function(){
        if(stables_plumbing.is_solved()){
            show_text("There's nothing more behind here to look at.");
        } else {
            stables_plumbing.activate();
        }
    })
    window.scenes.push(stables_mirza);

    // Load first scene. Starts the room.
    stables_entrance.activate();
}