/**
 * Art Jam
 * Lanna Check
 * 
 * An interactive self-potrait where player pet my cat persona using the mouse
 */

"use strict";

// Cat-sona's variables
let cat = {
    // Cat's head parameters
    x: undefined,
    y: undefined,
    fill: {
        r: 155,
        g: 114,
        b: 60
    },
    stroke: {
        r: 74,
        g: 46,
        b: 24,
        size: 5
    },
    size: 400,
    // Cat's eyes parameters
    eye: {
        size: 115,
        irisSize: 80,
        fill: {
            r: 241,
            g: 240,
            b: 240
        },
        left: {
            x: 245,
            y: 280
        },
        right: {
            x: 395,
            y: 280
        }
    }
};

/**
 * Creates the canvas and sets intial variables
*/
function setup() {
    createCanvas(640, 640);

    // Sets the cat-sona's position variables
    cat.x = width / 2
    cat.y = 300
}


/**
 * Draws cat-sona and displays it
*/
function draw() {
    background("#f0c864ff");

    drawCat();
}
/**
 * Draws cat-sona's whole body
 */
function drawCat() {
    drawCatHead();
    drawCatEyes();
    drawCatNose();
    drawCatMouth();
    drawCatBrows();
}
/**
 * Draws cat's head
 */
function drawCatHead() {
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    rectMode(CENTER)
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    rect(cat.x, cat.y, cat.size, cat.size, 180);
    pop();
}
/**
 * Draws cat's eyes 
 */
function drawCatEyes() {
    // Left Eye
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.eye.fill.r, cat.eye.fill.g, cat.eye.fill.b);
    circle(cat.eye.left.x, cat.eye.left.y, cat.eye.size);
    pop();

    // Left Iris
    push();
    noStroke();
    fill(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    circle(cat.eye.left.x, cat.eye.left.y, cat.eye.irisSize);
    pop();

    // Left Eye shine
    push();
    stroke(241, 223, 189);
    strokeWeight(30)
    point(cat.eye.left.x + 5, cat.eye.left.y - 20);
    pop();

    // Right Eye
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.eye.fill.r, cat.eye.fill.g, cat.eye.fill.b);
    circle(cat.eye.right.x, cat.eye.right.y, cat.eye.size);
    pop();

    // Right Iris
    push();
    fill(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    circle(cat.eye.right.x, cat.eye.right.y, cat.eye.irisSize);
    pop();

    // Right Eye shine
    push();
    stroke(241, 223, 189);
    strokeWeight(30)
    point(cat.eye.right.x + 5, cat.eye.right.y - 20);
    pop();

}

function drawCatNose() {
    push();
    noStroke();
    fill(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    triangle(295, 340, 345, 340, 320, 370);
    pop();
}

function drawCatMouth() {
    push();
    noFill();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(5);
    // Left lip
    line(275, 372, 300, 388);
    line(300, 388, 318, 368);
    // Right lip
    line(363, 372, 338, 388);
    line(338, 388, 320, 368);
    pop();
}

function drawCatBrows() {
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b)
    strokeWeight(15);
    line(200, 200, 290, 180);
    line(440, 200, 350, 180);
    pop();

}