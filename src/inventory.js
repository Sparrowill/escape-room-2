import { room } from "./renderer.js"

export function create_inventory(){
    room.create_inventory_item("stables-key", "./images/inventory/stables_key.png");
    room.create_inventory_item("gun-key", "./images/inventory/gun_key.png");
    room.create_inventory_item("gun-clue", "./images/inventory/gun_clue.png");
    room.create_inventory_item("music-key", "./images/inventory/music-key.png");
    room.create_inventory_item("window-clue", "./images/inventory/window-clue.png");
    room.create_inventory_item("stables-bench-clue", "./images/inventory/billiard-clue.png");
    room.create_inventory_item("billiard-ball", "./images/inventory/billiard-ball.png");
    room.create_inventory_item("billiard-cabinet-key", "./images/inventory/billiard-cabinet-key.png");
    room.create_inventory_item("smoking-puzzle-clue", "./images/inventory/smoking-clue.png");
}