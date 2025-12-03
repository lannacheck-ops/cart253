/**
 * Flappy Bird Extras!
 * Lanna Check
 * 
 * 3 Variations of the flappy game: regular flappy bird, flappy bird post, flappy bird boss.
 */

"use strict";

let state = "menu";
// Game start and fail variables
let gameStart = false;
let gameFailed = false;
// Canvas size
let cnv = {
    width: 500,
    height: 500
};
// Fonts
let pixelFont = undefined;
// Images
let letterImg = undefined;
// Sounds
let crashSfx = undefined;
let jumpSfx = undefined;
let laserSfx = undefined;
let letterSfx = undefined;
let pointsSfx = undefined;

/**
 * Preload images, sounds and fonts
 */
function preload() {
    pixelFont = loadFont('assets/fonts/PixelifySans-VariableFont_wght.ttf');
    letterImg = loadImage('assets/images/letter.png');
    crashSfx = loadSound('assets/sounds/crash.wav');
    jumpSfx = loadSound('assets/sounds/jump.mp3');
    laserSfx = loadSound('assets/sounds/laser-beam.wav');
    letterSfx = loadSound('assets/sounds/letter-drop.wav');
    pointsSfx = loadSound('assets/sounds/points.wav');
}
/**
 * Create the canvas
*/
function setup() {
    createCanvas(cnv.width, cnv.height);
    angleMode(DEGREES);
}


/**
 * Display the menu or the current variation
*/
function draw() {
    // A "switch" statement is like a cleaner alternative to writing multiple if...else if...else statements.
    switch (state) { // Check value in the "state" variable
        case "menu": // Compare if the state value is equal to "menu"
            menuDraw();// Call menuDraw function if the state is "menu"
            gameStart = false;
            gameFailed = false;
            break;//Stops JavaScript from continuing to check the other cases.
        case "flappyBird-variation":
            flappyBirdDraw();
            break;
        case "flappyBirdPost-variation":
            flappyBirdPostDraw();
            break;
        case "flappyBirdBoss-variation":
            flappyBirdBossDraw();
            break;
        case "tutorial":
            tutorialDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        // All the variations use the same mouse press function to lift the bird
        case "flappyBird-variation":
        case "flappyBirdPost-variation":
        case "flappyBirdBoss-variation":
        case "tutorial":
            flappyBirdMousePressed();
            break;
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "flappyBird-variation":
            flappyBirdKeyPressed(event);
            break
        case "flappyBirdPost-variation":
        case "tutorial":
            flappyBirdPostKeyPressed(event);
            break;
        case "flappyBirdBoss-variation":
            flappyBirdBossKeyPressed(event);
            break;
    }
}