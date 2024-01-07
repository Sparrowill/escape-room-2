import {Scene} from "./scene.js"
import {move, show_interact,show_text} from "./interaction.js"
import { armoury_guns } from "./puzzles.js";
import { room } from "./renderer.js";

export function create_armoury(){
    var armoury_entrance = new Scene("armoury-entrance","./images/backgrounds/armoury/entrance.png");
    armoury_entrance.add_nav_btn("to-interior","60","45",move,"armoury-interior");
    armoury_entrance.add_feedback_btn("stairs","6","10","0","60","20",show_text,"There's nothing up the stairs. How big do you think this game is???");
    armoury_entrance.add_feedback_btn("swords","34","15","0","30","11",show_text,"A wall of swords. Nothing much else really.");
    armoury_entrance.add_feedback_btn("armour-1","27","13","0","50","7",show_text,"Suits of armour. No you may not put them on");
    armoury_entrance.add_feedback_btn("armour-2","45","13","0","40","7",show_text,"Suits of armour. No you may not put them on");
    armoury_entrance.add_feedback_btn("gun-wall","70","10","0","42","30",show_text,"A wall of guns, all locked away unfortuately. Nothing really interesting to be found here.");
    armoury_entrance.add_feedback_btn("saddle","34","45","0","15","12",show_text,"I'll be honest. I'm not sure what these are. A saddle?");
    armoury_entrance.add_feedback_btn("fire-exit","50","30","0","17","7",show_text,"This door will remain locked. There's a defined route to this game! We can't have you running about willy nilly!");
    armoury_entrance.add_feedback_btn("chair","0","60","0","30","23",show_text,"Awww I'm sorry, are you getting tired? Do you want a sit down?");
    armoury_entrance.add_feedback_btn("sofa","70","52","0","20","30",show_text,"Careful! That's antique! There's nothing there anyway.");
    armoury_entrance.add_nav_btn("to-stables","2","60",move,"stables-entrance");
    armoury_entrance.add_interact_btn("music-puzzle","53","51","0","11","10",show_interact,"It's an old box, with an integrated lock on the front","Look",function (){
        if(room.inventory_contains("gun-key")){
            
        } else{
            show_text("The box is locked. I need a key.");
        }
    })


    window.scenes.push(armoury_entrance);


    var armoury_interior = new Scene("armoury-interior","./images/backgrounds/armoury/interior.png");
    armoury_interior.add_nav_btn("to-entrance","50","35",move,"armoury-entrance");
    armoury_interior.add_interact_btn("gun-puzzle","0","10","0","40","20",show_interact,"Look closer?","Look",function (){
        if(armoury_guns.is_solved()){
            show_text("There's nothing more to look at here");
        } else{
            armoury_guns.activate();
        }
    })
    window.scenes.push(armoury_interior);

   armoury_entrance.activate();
}