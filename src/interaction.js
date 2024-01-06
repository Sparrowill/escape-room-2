import {Scene} from "./scene.js"
import { stables_plumbing } from "./puzzles.js";

// Global array to store all scenes for looping through.
var scenes = [];

//Global vars for agree or cancel
window.agree = false;
window.cancel = false;

export function create_rooms(){
    create_stables();

}

function create_stables(){
    var stables_entrance = new Scene("stables-entrance","./images/backgrounds/stables/entrance.png");
    stables_entrance.add_nav_btn("to-interior","75","20",move,"stables-interior");
    stables_entrance.add_nav_btn("to-mirza","50","20",move,"stables-mirza");
    stables_entrance.add_feedback_btn("sleigh","40","60","40","20", "10",show_text,"You have clicked the sleigh");
    stables_entrance.add_feedback_btn("cart","60","40","40","20", "10",show_text,"You have clicked the cart");
    stables_entrance.add_interact_btn("hassan","15","10","0","2","4",show_interact,"Shall we print 'Hassan' to console?", "Print",function(){console.log("Hassan");})
    scenes.push(stables_entrance);
    
    var stables_interior = new Scene("stables-interior","./images/backgrounds/stables/interior.png");
    stables_interior.add_nav_btn("to-entrance","30","30",move,"stables-entrance");
    stables_interior.add_nav_btn("to-mirza","70","40",move,"stables-mirza");
    scenes.push(stables_interior);
    
    var stables_mirza = new Scene("stables-mirza","./images/backgrounds/stables/mirza.png");
    stables_mirza.add_nav_btn("to-entrance","5","90",move,"stables-entrance");
    stables_mirza.add_nav_btn("to-interior","95","90",move,"stables-interior");
    stables_mirza.add_interact_btn("board","45","60","10","20","20",show_interact,"There's something behind this board. ", "Look",function(){
        if(stables_plumbing.is_solved()){
            show_text("There's nothing more behind here to look at.");
        } else {
            stables_plumbing.activate();
        }
    })
    scenes.push(stables_mirza);

    stables_entrance.activate();
}

//Function to move from one scene to another
function move(destination){
    scenes.forEach( (scene) => {
        scene.deactivate();
   
    });
    // Has to be separate loops as otherwise we risk deactivating a scene we just activated.
    scenes.forEach( (scene) => {
        if(scene.get_name() == destination){
            scene.activate();
        }
    });
}

// Function to display text in the dialogue box
export function show_text(text){
    disable_btns();
    var container = document.getElementById("dialogue-bg");
    // Set text value (auto expands and wraps)
    document.getElementById("dialogue-text").innerHTML = text;
    // dialogue box appears
    container.style.display = "block";
    var display_duration = 1500 + ( text.length * 30 );
    // Display the text for a time period, depending on the length of the text
    setTimeout(function (){
        container.style.display = "none";
        enable_btns();
    },display_duration);
}

//Function to display an interactive text dialogue box
export function show_interact(question, text, agreeFunc){
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
    scenes.forEach( (scene) => {
        if(scene.is_active()){
            scene.toggle_all_btns(true);
        }
    });
}

//Function to enable clicking on other buttons in the scene 
function enable_btns(){
    scenes.forEach( (scene) => {
        if(scene.is_active()){
            scene.toggle_all_btns(false);
        }
    });
}