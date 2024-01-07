import { room } from "./renderer.js"

export function create_inventory(){
    room.create_inventory_item("stables-key", "./images/inventory/stables_key.png")
    room.create_inventory_item("stables-placeholder", "./images/inventory/placeholder.png")
}