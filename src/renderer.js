import {create_rooms} from './interaction.js'
import { Player} from './player.js';
import { create_inventory } from './inventory.js';
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

function start_room(){
    document.getElementById("splash-bg").remove();
        // Run the intro video,
    document.getElementById("intro-vid").style.display = "block";
    document.getElementById("video").play();
    setTimeout(function(){
    document.getElementById("intro-vid").style.display = "none";
    
    // Start the room
    create_inventory();
    create_rooms();
    create_puzzles();
    },49000)
}

function create_text_element(type, content, center){
    var el = document.createElement(type);
    el.innerHTML= content;
    if(center){
        el.style.textAlign = "center";
    }
    return el;
}

function create_splash_screen(){
    //Create landing page
var page = document.body;
var bg = document.createElement("div");
bg.classList.add("splash-background");
bg.id = "splash-bg";
var fg = document.createElement("div");
fg.classList.add("splash-foreground");
fg.appendChild(create_text_element("h1","Escape the Mansion", true));
fg.appendChild(create_text_element("p","Welcome to Escape the Mansion. This virtual escape room is a standalone 'one-shot' experience and does not relate at all to my previous 'Escape the Prison' room. However, the puzzles are designed to be more challenging in this room, so why not try the other one first?",true));
fg.appendChild(create_text_element("h2","Rules and Instructions",true));
fg.appendChild(create_text_element("p","<ul><li>The object of the game is to reach the exit as quickly as possible You reach the exit by solving puzzles and advancing through to new rooms.</li><br><li>Throughout the game you will (hopefully) collect clues and keys by looking around -clicking on stuff- and solving puzzles. Each clue/key is only used <b>once</b>.</li><br><li>You 'move' through the rooms by clicking on <b>yellow circles</b> (they're the same as in Escape the Prison). You can't miss them!</li><br><li>Some of the puzzles can be quite devious. You may want a pen and paper to keep track of things. If you get stuck at any point, each puzzle has hints available.</li><br><li>Some of the puzzles rely on audio. <b>Make sure your device is able to play audio before you start the room</b>.</li><br><li> As with my other room, there is no time limit. Just try to escape. I set my 'target' time while developing the game at one hour, to give you an idea.</li></ul>",false))
fg.appendChild(create_text_element("h3","Now you've read the instructions, you're ready to start. Click the button below. Good Luck", true))
var btn = document.createElement("btn");
btn.classList.add("start-btn");
btn.onclick= start_room;
btn.innerText = "Start";
fg.appendChild(btn)
bg.appendChild(fg);
page.appendChild(bg);
}

// Create the room (player inventory)
export var room = new Player();
create_splash_screen();


