import { Puzzle } from "./puzzle.js";
import {stables_interior} from "./stables.js";
import {move} from "./interaction.js";
import {room} from "./renderer.js"
import { armoury_entrance } from "./armoury.js";
import { Scales } from "./ball.js";


var puzzles = [];
export var stables_plumbing, armoury_guns, armoury_music, billiards_ball;

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
    armoury_music.set_explanation("You open the ornate chest in the centre of the table and immediately a hidden music box starts playing. Inside the box is a piece of torn paper with some sheet music on it. The sheet music doesn't seem to correspond to the music playing, at least not initially...<br><br> There is a small wooden box inside the chest, with an intricate 5 letter combination lock on it. <br><br> You can use the new buttons on the side of the screen to control the music.")
    armoury_music.set_success_text("Correct! Upon entering the word 'Spring' into the combination lock, it opens, revealing another key! This one fits the door to the billiards room.",function(){
        armoury_entrance.add_nav_btn("to-billiards","63","40",move,"billiards-entrance");
        room.add_to_inventory("music-key")
        // Add new nav button  (reload scene)
        if(armoury_entrance.is_active()){
            armoury_entrance.activate();
        }
    });
    armoury_music.set_hints(["Make sure your sound is turned up for this one!", "Can you hear the electronic beeps hidden inside the music box tune?", "The beeps are morse code, which can be deciphered using the sheet you found in the chest.", "The Morse code is ' . . . / . _ _ . / . _ . / . . / _  . / _  _ .","If you don't read sheet music, why not look up a decipher chart online?","The answer is Spring"]);
    armoury_music.set_answer("SPRING");
    armoury_music.is_music_puzzle("./audio/armoury_music2.mp3");
    puzzles.push(armoury_music);

    billiards_ball = new Scales("billiards-ball","./images/puzzles/billiards/base.png");
    billiards_ball.set_explanation("There appears to be a small set of scales in the cabinet, alongside 9 identical looking billiard balls. A note reads: <br><br>One of these balls is heavier than the others. Undetectable by feel alone, but these scales are accurate enough to determine the heavier ball. <br> Using the scale only <b>twice</b>, identify the heavier ball, and write its number in the box below.<br><br> The heavier ball will randomise each time you open this puzzle, and you only get one guess per opening, so there will be no cheating!")
    billiards_ball.set_success_text("Correct", function(){console.log("Correct");});
    billiards_ball.one_guess();
    puzzles.push(billiards_ball);
}