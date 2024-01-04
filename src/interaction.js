import {Scene} from "./scene.js"

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
    stables_entrance.add_nav_btn("nav1","75","20",move,"stables-interior");
    stables_entrance.add_nav_btn("nav2","50","20",move,"stables-mirza");
    scenes.push(stables_entrance);
    
    var stables_interior = new Scene("stables-interior","./images/backgrounds/stables/interior.png");
    stables_interior.add_nav_btn("nav1","30","30",move,"stables-entrance");
    stables_interior.add_nav_btn("nav2","70","40",move,"stables-mirza");
    scenes.push(stables_interior);
    
    var stables_mirza = new Scene("stables-mirza","./images/backgrounds/stables/mirza.png");
    stables_mirza.add_nav_btn("nav1","5","90",move,"stables-entrance");
    stables_mirza.add_nav_btn("nav2","95","90",move,"stables-interior");
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
function show_text(text){
    var container = document.getElementById("dialogue-bg");
    // Set text value (auto expands and wraps)
    document.getElementById("dialogue-text").innerHTML = text;
    // dialogue box appears
    container.style.display = "block";
    display_duration = 1500 + ( text.length * 30 );
    // Display the text for a time period, depending on the length of the text
    setTimeout(function (){
        container.style.display = "none";
        console.log("Done");
    },display_duration);
}

//Function to display an interactive text dialogue box
export function show_interact(question, text, agreeFunc){
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
            window.cancel = false;
            clearInterval(interval);
            // If the button pressed was agree
            if(window.agree){
                window.agree = false;
                agreeFunc();
            }
        }
    },10);
}

