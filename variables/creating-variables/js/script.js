/**
 * Creating Variables
 * Lanna Check
 * 
 * Learning how to create variables
 */

"use strict";

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
    background('rgba(255, 255, 0, 1)');

    // The hole
    push();
    noStroke();
    fill(0);
    ellipse(140, 175, 180);
    pop();

}