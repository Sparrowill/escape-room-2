class Scene {
    constructor(name, background){
        this.name = name;
        this.background = background;
        this.active = false;
        this.nav_btns = [];
    }
    activate() {
        this.active = true;
        //Set background
        document.getElementById("room-view").src=this.background
        this.create_nav_btns()
    }

    deactivate() {
        var room = document.getElementById("room-view-bg");
        // Remove placed html DOM children, leave img
        room.replaceChildren();
        var img = document.createElement("img");
        img.id = "room-view";
        img.classList.add("room-view")
        room.appendChild(img)

        this.active = false;
    }

    get_name() {
        return this.name;
    }

    add_nav_btn(id,x,y,destination){
        const btn = document.createElement("button");
        btn.id = id;
        btn.classList.add("nav-btn");
        btn.style.left = x + "%";
        btn.style.top = y + "%";
        this.nav_btns.push(btn);
        btn.addEventListener("click", () => {
            move(destination);
         });
    }
    create_nav_btns(){
        var room = document.getElementById("room-view-bg");
        this.nav_btns.forEach( (btn) => {
            room.appendChild(btn);
        });
    }
 
}

// Class activate sets the background, then draws the movement dots, and all the interaction buttons

//Move function outside the class system takes in the name of the scene to move to. Searches through a global list of the class instances to find that one
// Then deactivates all classes, and activates that one only.

// Global array of all scenes for easy access.
var scenes = [];


// Event Listener for buttons
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

//Create Scene class instances
/************************
        Stables
***********************/
stables_entrance = new Scene("stables-entrance","./images/backgrounds/stables/entrance.png");
stables_entrance.add_nav_btn("nav1","75","20","stables-interior");
stables_entrance.add_nav_btn("nav2","50","20","stables-mirza");
scenes.push(stables_entrance);

stables_interior = new Scene("stables-interior","./images/backgrounds/stables/interior.png");
stables_interior.add_nav_btn("nav1","30","30","stables-entrance");
stables_interior.add_nav_btn("nav1","70","40","stables-mirza");
scenes.push(stables_interior);

stables_mirza = new Scene("stables-mirza","./images/backgrounds/stables/mirza.png");
stables_mirza.add_nav_btn("nav2","5","90","stables-entrance");
stables_mirza.add_nav_btn("nav2","95","90","stables-interior");
scenes.push(stables_mirza);



// First scene is stable entrance
stables_entrance.activate();


// Function to display text in the dialogue box
function showText(text){
    container = document.getElementById("dialogue-bg");
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
function showInteract(question, text){
    container = document.getElementById("dialogue-bg");
    // Set text value (auto expands and wraps)
    document.getElementById("dialogue-text").innerHTML = question;
    // Set button value
    document.getElementById("agree").innerHTML = text;
    // dialogue box appears
    container.style.display = "block";
}

//Function to move from one scene to another
function move(destination){
    scenes.forEach( (scene) => {
        scene.deactivate();
   
    });
    // Has t be separate loops as otherwise we risk deactivating a scene we just activated.
    scenes.forEach( (scene) => {
        if(scene.get_name() == destination){
            scene.activate();
            console.log(scene)
        }
    });
}