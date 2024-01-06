import {Scene} from "./scene.js"
import {move} from "./interaction.js"

export function create_armoury(){
    var armoury_entrance = new Scene("armoury-entrance","./images/backgrounds/armoury/entrance.png");
    armoury_entrance.add_nav_btn("to-stables","2","60",move,"stables-entrance");
    
    window.scenes.push(armoury_entrance);
}