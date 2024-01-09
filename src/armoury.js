import {Scene} from "./scene.js"
import {move, show_interact,show_text} from "./interaction.js"
import { armoury_guns, armoury_music } from "./puzzles.js";
import { room } from "./renderer.js";


export var armoury_entrance
export function create_armoury(){
    armoury_entrance = new Scene("armoury-entrance","./images/backgrounds/armoury/entrance.png");
    armoury_entrance.add_feedback_btn("chair","0","65","0","30","23",show_text,"Awww I'm sorry, are you getting tired? Do you want a sit down?");
    armoury_entrance.add_feedback_btn("stairs","6","10","0","60","20",show_text,"There's nothing up the stairs. How big do you think this game is???");
    armoury_entrance.add_feedback_btn("swords","34","15","0","30","11",show_text,"A wall of swords. Nothing much else really.");
    armoury_entrance.add_feedback_btn("armour-1","27","13","0","50","7",show_text,"Suits of armour. No you may not put them on");
    armoury_entrance.add_feedback_btn("armour-2","45","13","0","40","7",show_text,"Suits of armour. No you may not put them on");
    armoury_entrance.add_feedback_btn("gun-wall","70","10","0","42","30",show_text,"A wall of guns, all locked away unfortuately. Nothing really interesting to be found here.");
    armoury_entrance.add_feedback_btn("saddle","34","45","0","15","12",show_text,"I'll be honest. I'm not sure what these are. A saddle?");
    armoury_entrance.add_feedback_btn("fire-exit","50","30","0","17","7",show_text,"This door will remain locked. There's a defined route to this game! We can't have you running about willy nilly!");
    armoury_entrance.add_feedback_btn("sofa","70","52","0","20","30",show_text,"Careful! That's antique! There's nothing there anyway.");
    armoury_entrance.add_nav_btn("to-stables","2","60",move,"stables-entrance");
    armoury_entrance.add_nav_btn("to-interior","57","45",move,"armoury-interior");
    armoury_entrance.add_interact_btn("music-puzzle","53","51","0","11","10",show_interact,"It's an old box, with an integrated lock on the front","Look",function (){
        if(room.inventory_contains("gun-key")){
            if(armoury_music.is_solved()){
                show_text("Please don't open that box again. The music was repetitive enough the first time round!");
            } else{
                // Start Puzzle
                armoury_music.activate();
                //Start music
                var audio = new Audio("./audio/armoury_music.mp3");
                audio.loop = true;
                audio.play();
                var interval = setInterval(function () {
                    if(!armoury_music.is_active()){
                        audio.pause();
                        clearInterval(interval);
                        }
                },10);
            }
        } else{
            show_text("The box is locked. I need a key.");
        }
    })
    armoury_entrance.add_feedback_btn("floor","47","70","0","20","20",show_text,"An interesting floor pattern, but that's all it is.");



    window.scenes.push(armoury_entrance);


    var armoury_interior = new Scene("armoury-interior","./images/backgrounds/armoury/interior.png");
    armoury_interior.add_nav_btn("to-entrance","50","35",move,"armoury-entrance");
    armoury_interior.add_nav_btn("to-stables","76","40",move,"stables-entrance");
    armoury_interior.add_interact_btn("window-pane","53","26","0","4","3",show_interact,"That is an interesting piece of stained glass", "Take photo",function(){
        if(!room.inventory_contains("window-clue")){
            room.add_to_inventory("window-clue");
           armoury_interior.show_long_text("The photo shows an intricate stained glass pane. With some useful markings on.");
        } else{
            show_text("Why would I take another photo of the same piece of glass?");
        }
    })
    armoury_interior.add_interact_btn("gun-puzzle","0","10","0","40","20",show_interact,"Look closer?","Look",function (){
        if(armoury_guns.is_solved()){
            show_text("There's nothing more to look at here");
        } else{
            armoury_guns.activate();
        }
    })
    armoury_interior.add_interact_btn("music-puzzle","46","42","0","8","6",show_interact,"It's an old box, with an integrated lock on the front","Look",function (){
        if(room.inventory_contains("gun-key")){
            if(armoury_music.is_solved()){
                show_text("Please don't open that box again. The music was repetitive enough the first time round!");
            } else{
                // Start Puzzle
                armoury_music.activate();
                //Start music
                var audio = new Audio("./audio/armoury_music.mp3");
                audio.loop = true;
                audio.play();
                var interval = setInterval(function () {
                    if(!armoury_music.is_active()){
                        audio.pause();
                        clearInterval(interval);
                        }
                },10);
            }
        } else{
            show_text("The box is locked. I need a key.");
        }
    })
    armoury_interior.add_feedback_btn("double-doors","20","10","0","44","16",show_text,"Those doors are bolted from the other side. No way through.");
    armoury_interior.add_feedback_btn("swords-1","37","10","0","30","10",show_text,"Nothing of interest, except for the fact it's a wall of swords.");
    armoury_interior.add_feedback_btn("swords-2","62","10","0","30","8",show_text,"Ooh, this one has a shield. Fancy. Still, it's just a wall of swords.")
    armoury_interior.add_feedback_btn("chair","60","40","0","20","7",show_text,"Awww I'm sorry, are you getting tired? Do you want a sit down?");
    armoury_interior.add_feedback_btn("sofa","0","50","0","40","15",show_text,"Careful! That's antique! There's nothing there anyway.");
    armoury_interior.add_feedback_btn("armour","87","10","0","90","13",show_text,"Suits of armour. No you may not put them on");
    armoury_interior.add_feedback_btn("floor","40","60","0","18","20",show_text,"An interesting floor pattern, but that's all it is.");

    window.scenes.push(armoury_interior);

   armoury_interior.activate();
}