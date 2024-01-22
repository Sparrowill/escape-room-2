import { Puzzle } from "./puzzle.js";
import {stables_interior} from "./stables.js";
import {move, show_interact, show_text} from "./interaction.js";
import {room} from "./renderer.js"
import { armoury_entrance } from "./armoury.js";
import { Scales } from "./ball.js";
import {billiards_entrance, billiards_interior} from "./billiards.js";


var puzzles = [];
export var stables_plumbing, armoury_guns, armoury_music, billiards_ball, billiards_glass, billiards_latin, billiards_latin_lit;

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
    billiards_ball.set_explanation("There appears to be a small set of scales in the cabinet, alongside 9 identical looking billiard balls. A note reads: <br><br>One of these balls is heavier than the others. Undetectable by feel alone, but these scales are accurate enough to determine the heavier ball. <br> Using the scale only <b>twice</b>, identify the heavier ball, and write its number in the box below.<br><br> The heavier ball will randomise each time you open this puzzle, and you only get one guess per opening, so there will be no cheating!<br><br> Drag the billiard balls onto the scales, and use the reset and weigh buttons on the side of the screen to determine which is heavier.")
    billiards_ball.set_success_text("Correct! Did you get lucky by guessing? If so, I encourage you to try and do it properly. You can redo this puzzle at much as you like. It is possible to definitively say which ball is heavier after only two uses of the scales. <br><br>Anyway, probably worth taking the heavier ball, just in case...", function(){
        room.add_to_inventory("billiard-ball");
    });
    billiards_ball.set_hints(["There is a hint for this puzzle available in one of the rooms. Have you found it yet?","With only two weighs, you have to narrow down nine balls to one. Nine doesn't divide evenly by two...","By weighing the balls in groups of three, you can identify which group the heavy ball is in pretty quickly","Now that you know which group of three the heavy ball is in, you can use a similar technique to narrow down which of the group is heavier.", "Weigh three balls on each side. The group with the heavier ball will go down. If neither side goes down, the heavier ball is in the group of three you didn't weigh. Take the group with the heavier ball and weigh two of the balls against each other. The heavier one will go down. If neither goes down, the heavier one is the one you didn't weigh."]);
    billiards_ball.one_guess();
    puzzles.push(billiards_ball);

    billiards_glass = new Puzzle("billiards-glass","./images/puzzles/billiards/glass.png");
    billiards_glass.has_no_answer();
    billiards_glass.set_explanation("No explanation for this one. If you've found all the pieces it should be easy!");
    billiards_glass.add_interact_btn("glass-break","63.5","32","0","4.5","3.5",show_interact,"Interact?","Yes",function (){
        if(room.inventory_contains("billiard-ball")){
            billiards_glass.show_long_text("You throw the ball at the glass, cracking the pane. <br> Sunlight refracts through the cracked glass, illuminating the wall opposite.");
            billiards_glass.solved = true;
        } else {
            show_text("Yep, that's definitely a glass pane.");
        }
    });
    billiards_glass.set_hints(["This puzzle is technically solvable without having found the hint, but you don't want to.","Have you solved the billiards ball puzzle yet?","The hint you need is in the armoury","Click on the stained glass pane in the armoury window", "Once you have solved the billiards ball puzzle, go up two rows from the top of the right-hand stained glass pane. Click on the glass circle that is immediately to the left."]);
    puzzles.push(billiards_glass);


    billiards_latin = new Puzzle ("billiards-latin","./images/puzzles/billiards/latin.png");
    billiards_latin.has_no_answer();
    billiards_latin.set_explanation("No explanation here, this should be obvious if you've got all the pieces in place. If you have to guess, you haven't got all the pieces!");
    billiards_latin.set_hints(["If you've done everything else correctly, the answer should be apparent. If you're having to guess, you haven't done everything yet.","If you haven't solved the billiards ball puzzle yet, you should","If you haven't solved the window puzzle yet, you should.","You cannot solve this puzzle without first solving the window puzzle."]);
    puzzles.push(billiards_latin);

    billiards_latin_lit = new Puzzle("billiards-latin","./images/puzzles/billiards/latin_lit.png")
    billiards_latin_lit.set_explanation("No explanation here, this should be obvious if you've got all the pieces in place");
    billiards_latin_lit.set_success_text("Correct! Temptation. <br>(You try finding a longer word made up of those letters in that order!)<br><br> As you press each letter in turn, they recess into the wall. Behind you, a previously unseen doorway unlatches to reveal a secret passageway into the next room.",function () {
       billiards_interior.add_nav_btn("to-smoking","47","47",move,"smoking-entrance");
        // Add new nav button  (reload scene)
        if(billiards_interior.is_active()){
            billiards_interior.activate();
        }
    });
    billiards_latin_lit.set_answer("TEMPTATION");
    billiards_latin_lit.set_hints(["If you've done everything else correctly, the answer should be apparent. If you're having to guess, you haven't done everything yet.","If you haven't solved the billiards ball puzzle yet, you should","If you haven't solved the window puzzle yet, you should.","All the right letters should now be illuminated","The answer is TEMPTATION"]);
    puzzles.push(billiards_latin_lit);
}