/**
 * Mr. Furious
 * Lanna Check
 * Arielle Wong
 * Chloe Guerin
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    }
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    background(160, 180, 200);

    // Make Mr. Furious get redder over time

    //Reduce the green value
    mrFurious.fill.g -= 1;
    mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 225);

    //Reduce the blue value
    mrFurious.fill.b -= 1;
    mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 225);

    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();
}