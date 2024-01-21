export class Scene {
    constructor(name, background){
        this.name = name;
        this.background = background;
        this.active = false;
        this.nav_btns = [];
        this.feedback_btns = [];
        this.interact_btns = [];
        this.long_text_on = false;
        this.current_text = "";
    }
    activate() {
        this.active = true;
        //Set background
        document.getElementById("room-view").src=this.background
        this.create_btns()
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

    add_nav_btn(id,x,y,move,destination){
        const btn = document.createElement("button");
        btn.id = id;
        // Title will give hover text on the button
        btn.classList.add("nav-btn");
        btn.style.left = x + "%";
        btn.style.top = y + "%";
        this.nav_btns.push(btn);
        btn.addEventListener("click", () => {
            move(destination);
         });
    }
    create_btns(){
        var room = document.getElementById("room-view-bg");
        this.nav_btns.forEach( (btn) => {
            room.appendChild(btn);
        });
        this.feedback_btns.forEach( (btn) => {
            room.appendChild(btn);
        });
        this.interact_btns.forEach( (btn) => {
            room.appendChild(btn);
        });
    }

    toggle_all_btns(disable){
        this.nav_btns.forEach( (btn) => {
           btn.disabled=disable;
        });
        this.feedback_btns.forEach( (btn) => {
           btn.disabled=disable;
        });
        this.interact_btns.forEach( (btn) => {
           btn.disabled=disable;
        });
    }

    create_btn(id,x,y,rotation,height, width){
        const btn = document.createElement("button");
        btn.id = id;
        btn.classList.add("hidden-btn");
        btn.style.left = x + "%";
        btn.style.top = y + "%";
        btn.style.rotate = rotation + "deg";
        btn.style.width = width + "%";
        btn.style.height = height + "%";
        return btn
    }

    add_feedback_btn(id,x,y,rotation,height, width,show_text,text){
        const btn = this.create_btn(id,x,y,rotation,height, width);
        this.feedback_btns.push(btn);
        btn.addEventListener("click", () => {
            show_text(text);
         });
    }

    add_interact_btn(id,x,y,rotation,height, width,show_interact,question, text, agreeFunc){
        const btn = this.create_btn(id,x,y,rotation,height, width);
        this.interact_btns.push(btn);
        btn.addEventListener("click", () => {
            show_interact(question, text, agreeFunc)
        });
    }
    show_long_text(input_text){
        // If it's new text to show, turn off the old one
        if(this.long_text_on && this.current_text != input_text){
            this.hide_long_text();
        }
        // If there isn't a long text on already
        if(this.long_text_on == false){
            this.current_text = input_text;
            // Create bckground
            var text_box = document.createElement("div");
            text_box.id = "long-text-bg"
            text_box.classList.add("long-text-bg");
            // Create long text
            var text = document.createElement("p");
            text.id = "long-text-text";
            text.classList.add("long-text-text");
            text.innerHTML=input_text;
            //Create exit button
            var exit = document.createElement("btn");
            exit.id = "long-text-exit";
            exit.classList.add("long-text-exit");
            exit.textContent = "X";
            exit.addEventListener("click", () => {
                this.hide_long_text()
            });
            // Add all to doc
            text_box.appendChild(text);
            text_box.appendChild(exit);
            document.getElementById("room-view-bg").appendChild(text_box);
            this.long_text_on = true;
        }
    }
    hide_long_text(){
        var long_text = document.getElementById("long-text-bg");
        long_text.replaceChildren();
        long_text.remove();
        this.long_text_on = false;
    }

    change_src(src){
        this.background = src;
        if(this.active){
            document.getElementById("room-view").src=this.background
        }
    }
}

