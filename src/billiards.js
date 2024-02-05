import {Scene} from "./scene.js"
import {move, show_interact,show_text} from "./interaction.js"
import { billiards_ball, billiards_glass, billiards_latin,billiards_latin_lit } from "./puzzles.js";

export var billiards_interior, billiards_entrance, billiards_cabinet;

export function create_billiards(){
    billiards_entrance = new Scene("billiards-entrance", "./images/backgrounds/billiards/entrance.png");
    
    billiards_entrance.add_nav_btn("to-armoury","35","45",move,"armoury-interior");
    billiards_entrance.add_nav_btn("to-cabinet","88","45",move,"billiards-cabinet");
    billiards_entrance.add_nav_btn("to-interior","20","45",move,"billiards-interior");
    billiards_entrance.add_interact_btn("glass-puzzle","60","10","0","40","27",show_interact,"Look closer?","Look",function (){
        if(billiards_glass.is_solved()){
            show_text("You've already done enough damage...");
        } else{
            billiards_glass.activate();
        }
    });
    billiards_entrance.add_interact_btn("latin-puzzle","0","10","0","34","9",show_interact,"Look closer?","Look",function() {
        if(billiards_latin_lit.is_solved()){
            show_text("There's nothing more to see here");
        } else if(billiards_glass.is_solved()){
            billiards_latin_lit.activate();
        } else {
            billiards_latin.activate();
        }
    });

    billiards_entrance.add_feedback_btn("painting","30","10","0","14","15",show_text,"Probably a very expensive painting. Good job it's out of reach.");
    billiards_entrance.add_feedback_btn("sofa","0","52","0","20","20",show_text,"Are you getting tired? No sitting down please.");
    billiards_entrance.add_feedback_btn("chair","75","50","0","25","20",show_text,"Although this pattern is intricate, there are no puzzles here");
    billiards_entrance.add_feedback_btn("vase","9","10","0","10","5",show_text,"CAREFUL! That's a 4th century vase! Leave it alone");
    billiards_entrance.add_feedback_btn("table","22","50","0","10","8",show_text,"Hmm, yeah, seems like that should be something interesting. It isn't");
    billiards_entrance.add_feedback_btn("light","43","30","0","10","17",show_text,"Hiding things in lights is more of a prison escape thing...");
    billiards_entrance.add_feedback_btn("pool","37","54","7","24","30",show_text,"Nothing here. Coding a billiards table puzzle was too much effort for me");
    window.scenes.push(billiards_entrance);

    billiards_interior = new Scene("billiards-interior", "./images/backgrounds/billiards/interior.png");
    
    billiards_interior.add_nav_btn("to-entrance","65","45",move,"billiards-entrance");
    billiards_interior.add_nav_btn("to-cabinet","30","45",move,"billiards-cabinet");
    billiards_interior.add_interact_btn("glass-puzzle","0","10","0","40","27",show_interact,"Look closer?","Look",function (){
        if(billiards_glass.is_solved()){
            show_text("You've already done enough damage...");
        } else{
            billiards_glass.activate();
        }
    });
    billiards_interior.add_interact_btn("latin-puzzle","78","12","0","38","22",show_interact,"Look closer?","Look",function() {
        if(billiards_latin_lit.is_solved()){
            show_text("There's nothing more to see here");
        } else if(billiards_glass.is_solved()){
            billiards_latin_lit.activate();
        } else {
            billiards_latin.activate();
        }
    });
    billiards_interior.add_interact_btn("cabinet","51","39","0","11","11",show_interact,"A cabinet. Open it?","Yes", function(){
        /*
        if(room.inventory_contains("a key of some sort"")){
            show_text("There's nothing more in this cabinet");
        }
        else if(smoking.puzzle.is_solved()){
            show_text("The cabinet opens, and inside you find a THING");
            room.add_to_inventory("a key of some sort");
        } else{*/
            show_text("It's locked");
        /*}
        */
    });
    billiards_interior.add_feedback_btn("pool1","17","58","164","30","27",show_text,"Nothing here. Coding a billiards table puzzle was too much effort for me");
    billiards_interior.add_feedback_btn("pool2","41","52","0","30","13",show_text,"Nothing here. Coding a billiards table puzzle was too much effort for me");
    billiards_interior.add_feedback_btn("sofa","69","58","0","42","31",show_text,"Very old sofa. Worth more than most cars. Probably best to stand up for a little while longer...");
    billiards_interior.add_feedback_btn("chair","0","55","0","30","10",show_text,"What is your obsession with chairs? Please! Just stop trying to sit down");
    billiards_interior.add_feedback_btn("light","28","30","0","10","21",show_text,"Hiding things in lights is more of a prison escape thing...");
    billiards_interior.add_feedback_btn("painting","50","13","0","11","5",show_text,"That would be a cool place to hide something, a safe behind it maybe? Alas, no.");
    billiards_interior.add_feedback_btn("fireplace","65","20","0","10","7",show_text,"Just a fancy crest, nothing more.");
    window.scenes.push(billiards_interior);
    
    billiards_cabinet = new Scene("billiards-cabinet", "./images/backgrounds/billiards/cabinet.png");
    
    billiards_cabinet.add_nav_btn("to-entrance","55","45",move,"billiards-entrance");
    billiards_cabinet.add_interact_btn("ball-puzzle","65","34","0","33","10",show_interact,"Look closer?","Look",function (){
            if(billiards_ball.is_solved()){
                show_interact("Would you like to have another go?","Yes",function(){
                    billiards_ball.activate_scales();
                });
            } else{
                billiards_ball.activate_scales();
            }
    });
    billiards_cabinet.add_interact_btn("cabinet","34","39","0","30","17",show_interact,"A cabinet. Open it?","Yes", function(){
        /*
        if(room.inventory_contains("a key of some sort"")){
            show_text("There's nothing more in this cabinet");
        }
        else if(smoking.puzzle.is_solved()){
            show_text("The cabinet opens, and inside you find a THING");
            room.add_to_inventory("a key of some sort");
        } else{*/
            show_text("It's locked");
        /*}
        */
    });
    billiards_cabinet.add_feedback_btn("fireplace","50","13","0","20","12",show_text,"Just a fancy crest, nothing more.");
    billiards_cabinet.add_feedback_btn("vases","64","12","0","15","16",show_text,"Those are in glass cases. That means they're super duper valuabele! No touching");
    billiards_cabinet.add_feedback_btn("pool","50","98","55","37","50",show_text,"Nothing here. Coding a billiards table puzzle was too much effort for me");
    billiards_cabinet.add_feedback_btn("pool2","66","74","14","32","40",show_text,"Nothing here. Coding a billiards table puzzle was too much effort for me");
    billiards_cabinet.add_feedback_btn("light","78","38","0","12","22",show_text,"Hiding things in lights is more of a prison escape thing...");
    billiards_cabinet.add_feedback_btn("sofa","76","57","14","17","30",show_text,"Very old sofa. Worth more than most cars. Probably best to stand up for a little while longer...");

    window.scenes.push(billiards_cabinet);
    
}