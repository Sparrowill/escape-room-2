export class Puzzle {
    constructor(name, background){
        this.name = name;
        this.background = background;
        this.active = false;

    }
    activate() {
        this.active = true;
        //Set background
        document.getElementById("room-view").src=this.background
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

    is_active() {
        return this.active;
    }
}
    // Set explanation takes a long string of text which explains the puzzle
    // Show explanation txt displays this on top of the puzzle, alongside an OK button
    // Explanation is reachable from top left at all times.
    // Have a common i info icon in all puzzle screens?
    // This could then also house the hint section. 
    // Set hints takes an array and creates a dropdown based on how many are given

// Swap inventory out to dark wood texture. OR translucent colour. Look at original for ideas.