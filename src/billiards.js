import {Scene} from "./scene.js"
import {move, show_interact,show_text} from "./interaction.js"
import { billiards_ball } from "./puzzles.js";

export function create_billiards(){
    var billiards_entrance = new Scene("billiards-entrance", "./images/backgrounds/billiards/entrance.png");
    billiards_entrance.add_nav_btn("to-armoury","35","45",move,"armoury-interior");
    billiards_entrance.add_nav_btn("to-interior","20","45",move,"billiards-interior");
    billiards_entrance.add_nav_btn("to-cabinet","85","50",move,"billiards-cabinet");


    window.scenes.push(billiards_entrance);

    var billiards_interior = new Scene("billiards-interior", "./images/backgrounds/billiards/interior.png");
    billiards_interior.add_nav_btn("to-entrance","65","45",move,"billiards-entrance");
    billiards_interior.add_nav_btn("to-cabinet","30","45",move,"billiards-cabinet");

    window.scenes.push(billiards_interior);
    

    var billiards_cabinet = new Scene("billiards-cabinet", "./images/backgrounds/billiards/cabinet.png");
    billiards_cabinet.add_nav_btn("to-entrance","55","45",move,"billiards-entrance");
    billiards_cabinet.add_interact_btn("ball-puzzle","65","34","0","34","10",show_interact,"Look closer?","Look",function (){
            if(billiards_ball.is_solved()){
                show_text("There's nothing more to look at here");
            } else{
                billiards_ball.activate_scales();
            }
    })
    window.scenes.push(billiards_cabinet);

    billiards_cabinet.activate();
}