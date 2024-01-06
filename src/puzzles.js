import { Puzzle } from "./puzzle.js";

var puzzles = [];
export var stables_plumbing;

export function create_puzzles(){
    stables_plumbing = new Puzzle("stables_plumbing","./images/puzzles/stables/blank_maze.png")
    stables_plumbing.set_explanation("You find a large mess of pipework behind the screen, as well as a locked toolbox. A plumber has clearly been working on the system, but hasn't started taking things apart yet. You find a note that reads: <br><br>  'To the next person that has to work on this. I've given up, but I've left you my map of the pipework. I hope it helps. <br> I've also left you my toolbox. The code to which is the first four numbers that are covered by water when you start filling up this system.'");
    stables_plumbing.set_success_text("Well Done. that is correct. <br> The toolbox opens and you find a key that looks like it might fit into the stable door.");
    stables_plumbing.set_hints(["This isn't a normal 'maze' puzzle. You need to think about which sections will fill up with water first,", "The number 5 fills up first. Try working it through to get to the next numbers", "The code is 5891"]);
    stables_plumbing.set_answer("5891");
    puzzles.push(stables_plumbing);
}