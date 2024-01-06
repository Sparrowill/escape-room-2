// Player class houses the inventory.
// Methods for 'add to inventory', 'Check if item is in inventory'

export class Player {
    constructor(){
        this.inventory = [];
    }

    add_to_inventory(item){
        this.inventory.push(item);
        this.redraw_inventory();
    }

    redraw_inventory(){
        var container = document.getElementById("inventory");   
        // Delete all inventory items
        container.replaceChildren();
        this.inventory.forEach( (item) => {
            container.appendChild(item);
        });
    }
}

export function create_inventory_item(id,image){
    //Create holder div
    const div = document.createElement("div");
    div.classList.add("inventory-column");
    div.id = id;
    //Create image
    const img = document.createElement("img");
    img.classList.add("inventory-item");
    img.src = image;
    // Add mouse over event to make it larger
    div.addEventListener("mouseover",function (){
        img.style.marginTop = "100%";
        img.style.width = "400%";
        img.style.backgroundColor= "rgba(0,0,0,0.5)";
    });
    //Add mouse off event to make it go away again
    div.addEventListener("mouseout",function (){
        img.style.marginTop = "0%";
        img.style.width = "100%";
        img.style.backgroundColor= "transparent";
    });
    // Add image to div
    div.appendChild(img);
    return div;
}