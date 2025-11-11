/**
 * Tarot
 * Lanna Check
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";

// Our tarot data
let tarot = undefined;

let fortune = "Click to show a fortune.";

/**
 * Load tarot data
 */
function preload() {
    tarot = loadJSON("assets/data/tarot_interpretations.json");
}

/**
 * Create Canvas
*/
function setup() {
    createCanvas(800, 400);
}


/**
 * Display tarot
*/
function draw() {
    background(0);

    // Display the information 
    push();
    textSize(16);
    fill("yellow");
    textAlign(CENTER, CENTER);
    text(fortune, width / 2, height / 2);
    pop();
}

function mousePressed() {
    // Choose random card
    const card = random(tarot.tarot_interpretations);
    // Read the fortune from the random card
    fortune = card.fortune_telling;
}