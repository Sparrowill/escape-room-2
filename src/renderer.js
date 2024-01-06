import {create_rooms, show_interact} from './interaction.js'
import {create_puzzles} from './puzzles.js'
// Event Listeners for buttons

document.getElementById("test").addEventListener("click", function (){
   // show_text("Text ");
   //show_interact("Interaction Test With longer text","Agree but longer",test);
   //move("stables-interior");

});

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

// Start the room
create_rooms();
create_puzzles();


function test(){
    console.log("This func was called");
}