/**
 * Introducing Variables
 * Lanna check
 * 
 * Learning how to use variables
 */

"use strict";

/**
 * Creates a canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 *Draws a circle at the center of the canvas
*/
function draw() {
    background(0);

    // Draws a circle
    push();
    fill(255, 255, 0);
    noStroke();
    ellipse(width / 2, height / 2, mouseX, mouseY);
    pop();

}