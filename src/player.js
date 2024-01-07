export class Player {
    constructor(){
        this.inventory = [];
        this.items=[];
    }

    add_to_inventory(id){
        this.items.forEach((item)=>{
            if(item.id == id){
                this.inventory.push(item);
                this.redraw_inventory();
            }
        });
    }

    redraw_inventory(){
        var container = document.getElementById("inventory");   
        // Delete all inventory items
        container.replaceChildren();
        this.inventory.forEach( (item) => {
            container.appendChild(item);
        });
    }

    inventory_contains(id){
        this.inventory.forEach((item)=>{
            if(item.id == id){
                return true;
            }
        });
        return false;
    }
    create_inventory_item(id,image){
        var width = "80%";
        var margin = "2%";
        //Create holder div
        const div = document.createElement("div");
        div.classList.add("inventory-column");
        div.id = id;
        //Create image
        const img = document.createElement("img");
        img.classList.add("inventory-item");
        img.src = image;
        img.style.width = width;
        img.style.marginTop = margin;
        // Add mouse over event to make it larger
        div.addEventListener("mouseover",function (){
            img.style.marginTop = "100%";
            img.style.width = "400%";
            img.style.backgroundColor= "rgba(0,0,0,0.5)";
        });
        //Add mouse off event to make it go away again
        div.addEventListener("mouseout",function (){
            img.style.marginTop = margin;
            img.style.width = width;
            img.style.backgroundColor= "transparent";
        });
        // Add image to div
        div.appendChild(img);
        this.items.push(div);
    }
}


