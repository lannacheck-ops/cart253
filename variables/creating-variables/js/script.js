/**
 * Creating Variables
 * Lanna Check
 * 
 * Learning how to create variables
 */

"use strict";
let cheeseRed = 235;
let cheeseGreen = 227;
let cheeseBlue = 86;

let holeColour = 0;
let holeSize = 180;
let holeX = 140;
let holeY = 175;



/**
 * Creates canvas
*/
function setup() {
    createCanvas(480, 480);

}


/**
 * Draws a hole in a piece of cheese
*/
function draw() {
    // The cheese
    background(cheeseRed, cheeseGreen, cheeseBlue);

    // The hole
    push();
    noStroke();
    fill(0);
    ellipse(holeX, holeY, holeSize);
    pop();

}