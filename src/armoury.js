import {Scene} from "./scene.js"
import {move} from "./interaction.js"

export function create_armoury(){
    var armoury_entrance = new Scene("armoury-entrance","./images/backgrounds/armoury/entrance.png");
    armoury_entrance.add_nav_btn("to-stables","2","60",move,"stables-entrance");
    armoury_entrance.add_nav_btn("to-interior","60","45",move,"armoury-interior");
    window.scenes.push(armoury_entrance);


    var armoury_interior = new Scene("armoury-interior","./images/backgrounds/armoury/interior.png");
    armoury_interior.add_nav_btn("to-entrance","50","35",move,"armoury-entrance");
    window.scenes.push(armoury_interior);

   // armoury_entrance.activate();
}