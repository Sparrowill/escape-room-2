import { Puzzle } from "./puzzle.js";
import {stables_interior} from "./stables.js";
import {move} from "./interaction.js";
import {room} from "./renderer.js"

var puzzles = [];
export var stables_plumbing, armoury_guns, armoury_music;

export function create_puzzles(){
    stables_plumbing = new Puzzle("stables_plumbing","./images/puzzles/stables/blank_maze.png")
    stables_plumbing.set_explanation("You find a large mess of pipework behind the screen, as well as a locked toolbox. A plumber has clearly been working on the system, but hasn't started taking things apart yet. You find a note that reads: <br><br>  'To the next person that has to work on this. I've given up, but I've left you my map of the pipework. I hope it helps. <br> I've also left you my toolbox. The code to which is the first four numbers that are covered by water when you start filling up this system. <br><br> Good Luck!'");
    stables_plumbing.set_success_text("Well Done. that is correct. <br> The toolbox opens and you find a key that looks like it might fit into the stable door. It's unlocked now. There's nothing else in the toolbox, so quite what the plumber was planning to do is a mystery!",function () {
        stables_interior.add_nav_btn("to-armoury","25","20",move,"armoury-entrance");
        room.add_to_inventory("stables-key");
    });
    stables_plumbing.set_hints(["This isn't a normal 'maze' puzzle. You need to think about which sections will fill up with water first,", "The number 5 fills up first. Try working it through to get to the next numbers", "The code is 5891"]);
    stables_plumbing.set_answer("5891");
    puzzles.push(stables_plumbing);

    armoury_guns = new Puzzle("armoury-guns","./images/puzzles/armoury/guns.png")
    armoury_guns.set_explanation("As you look at the wall of guns, you see a small plaque set into the bottom of the frame. It reads: <br><br> This collection of antique weapons was curated by the gamekeeper. He was known to entertain the lord's children by leaving hidden messages around the grounds, using the framed guns as a cipher.");
    armoury_guns.set_success_text("That's right! You successfully decoded the gamekeeper's secret message. Quack, how apt for a gamekeeper... <br> <br>Now that you look closer, the frame plaque has a seam around it. <br> Popping off the plaque reveals a small key, like one that might fit into a tea chest.",function() {
        room.add_to_inventory("gun-key");
    });
    armoury_guns.set_hints(["This puzzle is only solvable if you have found the gamekeeper's hidden drawing.","You're looking for a 5-letter word","If the first gun on the gamekeeper's note is where you should start drawing, what are the subsequent guns?","This puzzle is effectively a glorified dot-to-dot.","The answer is QUACK"]);
    armoury_guns.set_answer("QUACK");
    puzzles.push(armoury_guns);

    armoury_music = new Puzzle("armoury-music","./images/puzzles/armoury/music.png");
    armoury_music.set_explanation("You open the ornate chest in the centre of the table and immediately a hidden music box starts playing. Inside the box is a piece of folded paper with some sheet music on it. The sheet music doesn't seem to correspond to the music playing, at least not initially...<br><br> There is a small wooden box inside the chest, with an intricate 5 letter combination lock on it. ")
    armoury_music.set_success_text("Correct! Upon entering the word 'Spring' into the combination lock, it opens, revealing a set of lock picks. I suppose you can unlock the next door now... Be careful not to scratch the wood of the door. Most of the items in this house are very precious!",function(){ room.add_to_inventory("lock-picks")});
    armoury_music.set_hints(["Make sure your sound is turned up for this one!", "Can you hear the electronic beeps hidden inside the music box tune?", "The beeps are morse code, which can be deciphered using the sheet you found in the chest.", "The Morse code is ' . . . / . _ _ . / . _ . / . . / _  . / _  _ .","If you don't read sheet music, why not look up a decipher chart online?","The answer is Spring"]);
    armoury_music.set_answer("SPRING");
    puzzles.push(armoury_music);

}