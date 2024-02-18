import {Scene} from "./scene.js"
import {move, show_text, show_interact, fire_alarm} from "./interaction.js"
import {stables_plumbing} from "./puzzles.js";
import { room } from "./renderer.js";


export var stables_interior;

export function create_stables(){
    var stables_entrance = new Scene("stables-entrance","./images/backgrounds/stables/entrance.png");
    stables_entrance.add_nav_btn("to-interior","75","20",move,"stables-interior");
    stables_entrance.add_nav_btn("to-mirza","50","20",move,"stables-mirza");
    stables_entrance.add_feedback_btn("sleigh-rear","37","55","40","30", "13",show_text,"There's nothing in the back of this sleigh. Sleigh? Nay!");
    stables_entrance.add_interact_btn("sleight-seat","43","43","20","16","15",show_interact,"There's something under this seat cushion. ", "Look",function(){
        if(!room.inventory_contains("gun-clue")){
            room.add_to_inventory("gun-clue");
            stables_entrance.show_long_text("Hidden under the cushion seat was a piece of paper with a selection of charcoal drawings. They're in 5 distinct rows");
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
    stables_entrance.add_feedback_btn("sink-1","0","40","0","10","10",show_text,"It's either a sink, or a feed bin. I don't know. Either way it's empty.");
    stables_entrance.add_feedback_btn("sink-2","13","29","0","10","14",show_text,"It's either a sink, or a feed bin. I don't know. Either way it's empty.");

    window.scenes.push(stables_entrance);
    
    stables_interior = new Scene("stables-interior","./images/backgrounds/stables/interior.png");
    stables_interior.add_nav_btn("to-entrance","27","40",move,"stables-entrance");
    stables_interior.add_nav_btn("to-mirza","70","40",move,"stables-mirza");
    stables_interior.add_feedback_btn("cart","35","50","0","26","24",show_text,"Just a rickety old cart. The wheels look to be in good condition though.");
    stables_interior.add_feedback_btn("sleigh","30","30","0","15","12",show_text,"You expect me to be able to see into the sleigh from over here? You must be mad!");
    stables_interior.add_feedback_btn("big door","5","10","330","60","15",show_text,"That's the large door used to get horses out. It's very well secured.");
    stables_interior.add_feedback_btn("hassan","54","17","0","3","3",show_text,"It's a name plaque for a horse. I can't read it from over here.");
    stables_interior.add_feedback_btn("blurry-plaque","47","17","0","3","2",show_text,"It's a name plaque for a horse. I can't read it from over here.");
    stables_interior.add_feedback_btn("lance","44","10","0","4","25",show_text,"That's a lance. Seeing as I don't have a squire, or a huge interest in jousting. I'm going to leave it here.");
    stables_interior.add_interact_btn("fire-alarm", "27", "10","0","3","2",show_interact,"It has a button. Press it?","Press",fire_alarm);
    stables_interior.add_interact_btn("fire-alarm", "30", "18","0","8","3",show_interact,"It has a button. Press it?","Press",fire_alarm);
    stables_interior.add_interact_btn("bench-paper", "80", "45","0","8","7",show_interact,"There's a lot of stuff pushed down the side of this bench. Do you want to look through it?","Yes",function (){
        if(!room.inventory_contains("stables-bench-clue")){
            room.add_to_inventory("stables-bench-clue");
            stables_entrance.show_long_text("Only this piece of paper seems to be of any interest. Best to take it with you in case it helps somewhere down the line.")
        } else{
            show_text("There's nothing more to get from here.");
        }
    });
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
    stables_mirza.add_feedback_btn("mirza","22","32","0","5","8",show_text,"It's a name plaque for a horse. It says 'Mirza'.");
    stables_mirza.add_feedback_btn("lance","0","10","0","10","18",show_text,"That's a lance. Seeing as I don't have a squire, or a huge interest in jousting. I'm going to leave it here.");
    stables_mirza.add_feedback_btn("sink","35","50","0","10","10",show_text,"It's either a sink, or a feed bin. I don't know. Either way it's empty.");
    stables_mirza.add_feedback_btn("pommel","32","10","0","30","18",show_text,"A pair of wonderfully ornate pommels. Useful for topping things, I suppose.");
    stables_mirza.add_feedback_btn("case","45","10","0","12","24",show_text,"There's nothing of interest in this case");

    window.scenes.push(stables_mirza);

    // Load first scene. Starts the room.
       stables_entrance.activate();
}