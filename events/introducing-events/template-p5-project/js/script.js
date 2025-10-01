/**
 * Introducing events
 * Lanna Check
 * 
 * Taking a look at how events work in JavaScript and p5
 */

"use strict";

/**
 * Draws canvas and background
*/
function setup() {
    createCanvas(400, 400);
    background(0);
}


/**
 * Does nothing
*/
function draw() {

}

/**
 * Draws a circle at the mouse location
*/
function mousePressed() {
    push();
    noStroke();
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50);
    pop();
}