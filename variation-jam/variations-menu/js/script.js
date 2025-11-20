/**
 * Variation Menu
 * Pippin Barr
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "menu";
let gameStart = false;
let gameFailed = false;
let cnv = {
    width: 500,
    heigth: 500
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(cnv.width, cnv.heigth);
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
        case "flappyBird-variation":
            flappyBirdMousePressed();
            break
        case "flappyBirdPost-variation":
            flappyBirdPostMousePressed();
            break;
        case "flappyBirdBoss-variation":
            flappyBirdBossMousePressed();
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
            flappyBirdPostKeyPressed(event);
            break;
        case "flappyBirdBoss-variation":
            flappyBirdBossKeyPressed(event);
            break;
    }
}