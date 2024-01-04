export class Scene {
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

    add_nav_btn(id,x,y,move,destination){
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

