import {Scene} from "./scene.js"
import {move, show_interact,show_text} from "./interaction.js"

export function create_billiards(){
    var billiards_entrance = new Scene("billiards-entrance", "./images/backgrounds/billiards/entrance.png");
    billiards_entrance.add_nav_btn("to-armoury","45","45",move,"armoury-interior");

    window.scenes.push(billiards_entrance);

    billiards_entrance.activate();
}