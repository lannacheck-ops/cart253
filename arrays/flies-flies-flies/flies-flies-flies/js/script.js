/**
 * Flies flies flies!
 * Lanna Check
 * 
 * A project 
 */

"use strict";

// Our array of flies (specifically "fly data" really)
// Each fly has a position and a size
let flies = [];

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(300, 300);
}

/**
 * Returns a random fly
 */
function createFly() {
    // Generates random fly
    let fly = {
        x: random(0, width),
        y: random(0, height),
        size: random(10, 30),
        buzziness: random(2, 8)
    };
    return fly;
}
/**
 * Moves and displays the flies
 */
function draw() {
    background("#87ceeb");

    // Go through all the flies
    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
    }
}

/**
 * Moves the fly by changing its position randomly
 * according to its buzziness
 */
function moveFly(fly) {
    fly.x += random(-fly.buzziness, fly.buzziness);
    fly.y += random(-fly.buzziness, fly.buzziness);
}

/**
 * Draws the fly parameter to canvas
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(0);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Adds a random fly on key pressed
 */
function keyPressed() {
    // Creates a new fly
    const newFly = createFly();
    // Add it to the array
    flies.push(newFly);
}

function mousePressed() {
    // Check all the flies
    for (let fly of flies) {
        const d = dist(mouseX, mouseY, fly.x, fly.y);
        if (d < fly.size / 2) {
            // This fly was clicked
            // Get the index of this fly
            const index = flies.indexOf(fly);
            // Splice it out of the array
            flies.splice(index, 1);
        }
    }
}