import {Scene} from "./scene.js"
import {move, show_text, show_interact} from "./interaction.js"
import {stables_plumbing} from "./puzzles.js";
import { room } from "./renderer.js";


export var stables_interior;

export function create_stables(){
    var stables_entrance = new Scene("stables-entrance","./images/backgrounds/stables/entrance.png");
    stables_entrance.add_nav_btn("to-interior","75","20",move,"stables-interior");
    stables_entrance.add_nav_btn("to-mirza","50","20",move,"stables-mirza");
    stables_entrance.add_feedback_btn("sleigh-rear","37","55","40","30", "13",show_text,"There's nothing in the back of this sleigh. Sleigh? Nay!");
    stables_entrance.add_interact_btn("sleight-seat","43","43","20","16","15",show_interact,"There's something under this seat cushion. ", "Look",function(){
        if(!room.inventory_contains("stables-placeholder")){
            room.add_to_inventory("stables-placeholder");
            stables_entrance.show_long_text("TEMPORARY TEXT <br>You found a THING. This will surely be helpful in the future.. Right?")
        } else{
            show_text("There's nothing more under here.");
        }
    })
    stables_entrance.add_feedback_btn("cart","64","29","0","16","10",show_text,"Just a rickety old cart. The wheels look to be in good condition though.");
    stables_entrance.add_feedback_btn("hassan","10","13","0","4","5",show_text,"It's a name plaque for a horse. It says 'Hassan'.");
    stables_entrance.add_feedback_btn("ossman","26","11","0","3","3",show_text,"It's a name plaque for a horse. It says 'Ossman'.");
    stables_entrance.add_feedback_btn("mirza","37","10","0","3","1",show_text,"It's a name plaque for a horse. I can't read it from over here.");
    stables_entrance.add_feedback_btn("window","84","10","0","90","16",show_text,"These windows are far too grimy for me to see out of.");
    stables_entrance.add_feedback_btn("ring","14","23","0","2","2",show_text,"It's a very ornate ring for tying a horse to. Well mounted to the wall.");
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