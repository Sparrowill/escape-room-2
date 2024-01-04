import {create_rooms} from './interaction.js'

// Event Listeners for buttons

document.getElementById("test").addEventListener("click", function (){
   // showText("Text ");
   // showInteract("Interaction Test With longer text","Agree but longer");
   //move("stables-interior");
});

//Event listener for cancel interaction button
document.getElementById("cancel").addEventListener("click", function (){
    console.log("Cancelled");
    document.getElementById("dialogue-bg").style.display = "none"
});

//Event listener for agree interaction button
document.getElementById("agree").addEventListener("click", function (){
    console.log("Agreed");
    document.getElementById("dialogue-bg").style.display = "none"
});

// Start the room
create_rooms();

