/**
 * Mr. Furious
 * Lanna Check
 * Arielle Wong
 * Chloe Guerin
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Sky varables
let sky = {
    r: 160,
    g: 180,
    b: 200
};

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
    },
    // Shake Intensity
    shake: 1
};

// Bird variables
let bird = {
    x: 0,
    y: 80,
    size: 40,

    fill: "#d09250ff"
}

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
    // Sky color
    background(sky.r, sky.g, sky.b);

    // Sky getting darker
    sky.r -= 1;
    sky.g -= 1;
    sky.b -= 1;

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
    // Shake Mr Furious
    mrFurious.x += random((mrFurious.shake * -1), mrFurious.shake);
    mrFurious.y += random((mrFurious.shake * -1), mrFurious.shake);
    drawBird();
    //Change Shake Intensity
    mrFurious.shake += random(0.1, 0.5);
    // Constrain Mr Furious
    mrFurious.x = constrain(mrFurious.x, 0, width);
    mrFurious.y = constrain(mrFurious.y, 0, height);

}

/**
 * Draws bird and moves it
 */
function drawBird() {
    push();
    fill(bird.fill);
    noStroke();
    circle(bird.x, bird.y, bird.size);
    pop();

    // Moves Bird
    bird.x += 2;
    bird.x = constrain(bird.x, 0, (width + bird.size));
}