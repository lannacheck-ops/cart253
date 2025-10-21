/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
let fly1 = undefined;
let fly2 = undefined;
let fly3 = undefined;


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Create flies 
    fly1 = createFly();
    fly2 = createFly();
    fly3 = createFly();
    // Give the fly its first random position
    //resetFly();
    /*
    fly.timer = random(0, 1500);
    setInterval(drawFly, fly.timer);
    */
}

function draw() {
    background("#87ceeb");
    moveFly(fly1);
    moveFly(fly2);
    moveFly(fly3);

    drawFly(fly1);
    drawFly(fly2);
    drawFly(fly3);

    moveFrog();
    moveTongue();
    drawFrog();

    checkTongueFlyOverlap(fly1);
    checkTongueFlyOverlap(fly2);
    checkTongueFlyOverlap(fly3);
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    fly.x += fly.speed;
    // Cool sine movement on the y
    fly.y = fly.A * sin(fly.sinCount * 0.05) + fly.D;
    fly.sinCount += random(1, 4);
    //fly.y += random(-3, 3)
    if (fly.x > width) {
        resetFly(fly);
    }
    /*// Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
*/
}
function createFly() {
    const fly = {
        x: random(-40, -5),
        y: random(0, 200), // Will be random
        D: random(50, 200),
        A: random(10, 40),
        size: random(10, 20),
        speed: random(3, 5),
        sinCount: 1,
        timer: undefined // Delay between fly creation
    };
    return fly;
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
    /*// Reset the fly timer each time a fly is drawn
    fly.timer = random(0, 1500);
    resetFly();
    */
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = random(-50, -5);
    fly.y = random(0, 200); // Will be random
    fly.D = random(50, 200);
    fly.A = random(10, 40);
    fly.size = random(10, 20);
    fly.speed = random(3, 5);
    fly.sinCount = 1;
    fly.timer = undefined // Delay between fly creation
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(fly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly(fly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}