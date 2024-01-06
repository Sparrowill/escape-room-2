import {Scene} from "./scene.js"
import {move} from "./interaction.js"

export function create_armoury(){
    var armoury_entrance = new Scene("armoury-entrance","./images/backgrounds/armoury/entrance.png");

    
    window.scenes.push(armoury_entrance);
}