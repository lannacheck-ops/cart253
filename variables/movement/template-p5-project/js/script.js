/**
 * Movement
 * Lanna Check
 * 
 * Experimenting with movement
 */

"use strict";

// Bird variables

let bird = {
    x: 120,
    y: 450,
    size: 50,
    velocity: {
        x: 0,
        y: 0
    },
    minVelocity: {
        x: -3,
        y: -2
    },
    maxVelocity: {
        x: 3,
        y: 2
    },
    accelaration: {
        x: 0.025,
        y: -0.2
    }
};

/**
 * Creates a canvas
*/
function setup() {
    createCanvas(640, 480);

}


/**
 * Move a bird and display it
*/
function draw() {
    background(0);

    // Move the bird
    bird.velocity.x += bird.accelaration.x;
    bird.velocity.y += bird.accelaration.y;

    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);


    bird.x += bird.velocity.x;
    bird.y += bird.velocity.y;

    // Draw the bird
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(bird.x, bird.y, bird.size);
    pop();

}