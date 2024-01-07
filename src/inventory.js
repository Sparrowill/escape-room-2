import { room } from "./renderer.js"

export function create_inventory(){
    room.create_inventory_item("stables-key", "./images/inventory/stables_key.png");
    room.create_inventory_item("stables-sleigh-placeholder", "./images/inventory/placeholder.png");
    room.create_inventory_item("stables-bench-placeholder", "./images/inventory/placeholder.png")
}