// class Room {
//     constructor(name, background){
//         this.name = name;
//         this.background = background;
//         this.active = false;
//     }
//     activate() {
//         this.active = true;
//     }
//     deactivate() {
//         this.active = false;
//     }


// }
// Event Listener for buttons
// TODO get element by class, extract id, then do stuff based on that, rather than many listeners
document.getElementById("test").addEventListener("click", function (){
    showText("Text ");
});

// Function to display text in the dialogue box
function showText(text){
    container = document.getElementById("dialogue-bg");
    // Set text value (auto expands and wraps)
    document.getElementById("dialogue-text").innerHTML = text;
    // dialogue box in
    container.style.display = "block";
    display_duration = 1500 + ( text.length * 30 );
    // Display the text for a time period, depending on the length of the text
    setTimeout(function (){
        container.style.display = "none";
        console.log("Done");
    },display_duration);
}