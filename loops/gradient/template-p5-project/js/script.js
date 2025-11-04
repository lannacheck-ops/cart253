/**
 * Gradient
 * Lanna Check
 * 
 * Draws a gradient out of lines
 */

"use strict";

/**
 * Creates a canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Draw a gradient
*/
function draw() {
    background(0);

    let y = 0;

    randomSeed(0);
    for (let x = 0; x <= width; x++) {
        const shade = map(x, 0, width, 0, 255);
        push();
        stroke(shade);
        line(x, y, x, height)
        pop();

        y += random(0, 2);
    }
}