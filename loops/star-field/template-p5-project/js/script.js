/**
 * Star Field
 * Lanna Check
 * 
 * Draws a star field with a for loop
 */

"use strict";

const numStars = 100;

/**
 * Create canvas
*/
function setup() {
    createCanvas(400, 400);
}


/**
 * Draws the star-field
*/
function draw() {
    background(0);

    randomSeed(1);
    for (let i = 0; i < numStars; i++) {
        drawStar();
    }
}

/**
 * Draws a random star
 */
function drawStar() {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(2, 5);

    push();
    fill(255);
    noStroke();
    ellipse(x, y, diameter);
    pop();
}
