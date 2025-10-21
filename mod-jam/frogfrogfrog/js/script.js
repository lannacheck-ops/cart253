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
        maxy: 100,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    // The frog's hunger
    hunger: {
        x: 70,
        y: 40,
        max: 500,
        min: 0,
        value: 495,
        timer: 10,
        reduction: 0.3
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
    setInterval(reduceHungerMeter, frog.hunger.timer)
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

    hungerMeter();
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
    fly.sinCount += random(0.5, 4);
    //fly.y += random(-3, 3)
    if (fly.x > width) {
        resetFly(fly);
    }
}

/**
 * Creates flies with random parameters
 */
function createFly() {
    const fly = {
        x: random(-40, -10),
        y: random(100, 200), // Will be random
        D: random(120, 300),
        A: random(10, 30),
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
 * Resets the flies parameters
 */
function resetFly(fly) {
    fly.x = random(-50, -10);
    fly.y = random(100, 200); // Will be random
    fly.D = random(120, 300);
    fly.A = random(10, 30);
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
        if (frog.tongue.y <= frog.tongue.maxy) {
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
        // Add to frog's hunger meter
        frog.hunger.value += fly.size
        frog.hunger.value = constrain(frog.hunger.value, frog.hunger.min, frog.hunger.max);
        // Reset the fly
        resetFly(fly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function hungerMeter() {
    // Hunger meter background
    push();
    strokeWeight(5);
    fill("#838282ff");
    rect(frog.hunger.x, frog.hunger.y, frog.hunger.max, 30, 8);
    pop();
    // Actual Hunger meter
    push();
    noStroke();
    fill("#4bb71cff");
    rect(frog.hunger.x + 2.5, frog.hunger.y + 2.5, frog.hunger.value, 25, 8);
    pop();
}

function reduceHungerMeter() {
    if (frog.hunger.value > frog.hunger.min) {
        frog.hunger.value -= frog.hunger.reduction
    };

}
/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}