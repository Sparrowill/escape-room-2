import { create_stables } from "./stables.js";
import { create_armoury } from "./armoury.js";
import { create_billiards } from "./billiards.js";

// Global array to store all scenes for looping through.
window.scenes = [];

//Global vars for agree or cancel
window.agree = false;
window.cancel = false;

//Global var for show_text
window.timeout;

export function create_rooms(){
    create_stables();
    create_armoury();
    create_billiards()
}

//Function to move from one scene to another
export function move(destination){
    window.scenes.forEach( (scene) => {
        scene.deactivate();
   
    });
    // Has to be separate loops as otherwise we risk deactivating a scene we just activated.
    window.scenes.forEach( (scene) => {
        if(scene.get_name() == destination){
            scene.activate();
        }
    });
}

// Function to display text in the dialogue box
export function show_text(text){
    if( window.timeout != undefined){
        clearTimeout(window.timeout);
    }
    var container = document.getElementById("dialogue-bg");
    // Set text value (auto expands and wraps)
    document.getElementById("dialogue-text").innerHTML = text;
    // dialogue box appears
    container.style.display = "block";
    var display_duration = 1000 + ( text.length * 30 );
    // Display the text for a time period, depending on the length of the text
    window.timeout = setTimeout(function (){
        container.style.display = "none";
    },display_duration);
}


//Function to display an interactive text dialogue box
export function show_interact(question, text, agreeFunc){
    if( window.timeout != undefined){
        clearTimeout(window.timeout);
    }
    disable_btns();
    document.getElementById("dialogue-btn-container").style.display = "flex"
    var container = document.getElementById("dialogue-bg");
    // Set text value (auto expands and wraps)
    document.getElementById("dialogue-text").innerHTML = question;
    // Set button value
    document.getElementById("agree").innerHTML = text;
    // dialogue box appears
    container.style.display = "block";
    var interval = setInterval(function () {
        // If a button has been pressed
        if(window.agree || window.cancel){
            enable_btns();
            window.cancel = false;
            clearInterval(interval);
            // If the button pressed was agree
            if(window.agree){
                window.agree = false;
                agreeFunc();
            }
        }
    },10);
    return true;
}

//Function to disable clicking on other buttons in the scene 
function disable_btns(){
    window.scenes.forEach( (scene) => {
        if(scene.is_active()){
            scene.toggle_all_btns(true);
        }
    });
}

//Function to enable clicking on other buttons in the scene 
function enable_btns(){
    window.scenes.forEach( (scene) => {
        if(scene.is_active()){
            scene.toggle_all_btns(false);
        }
    });
}

export function fire_alarm(){
    
    new Audio("./audio/firealarm.mp3").play();
    show_text("That's the fire alarm. Don't touch that...")
}