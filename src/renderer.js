import {create_rooms} from './interaction.js'
import { Player, create_inventory_item } from './player.js';
import {create_puzzles} from './puzzles.js'
// Event Listeners for buttons

//Event listener for cancel interaction button
document.getElementById("cancel").addEventListener("click", function (){
    window.cancel = true;
    document.getElementById("dialogue-bg").style.display = "none";
    document.getElementById("dialogue-btn-container").style.display = "none";

});

//Event listener for agree interaction button
document.getElementById("agree").addEventListener("click", function (){
    window.agree = true;
    document.getElementById("dialogue-bg").style.display = "none";
    document.getElementById("dialogue-btn-container").style.display = "none";
});

// Create the room (player inventory)
export var room = new Player();
// Start the room
create_rooms();
create_puzzles();


