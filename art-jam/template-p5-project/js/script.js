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
    size: 360,
    // Cat's eyes parameters
    eye: {
        size: 105,
        irisSize: 70,
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
    drawCatBody();
    drawCatEars();
    drawCatHead();
    drawCatEyes();
    drawCatNose();
    drawCatMouth();
    drawFrontHair();
    // drawCatBrows();

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
    ellipse(cat.x, cat.y, cat.size, cat.size);//, 180);
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

function drawCatEars() {
    // Left Ear
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    triangle(170, 200, 190, 50, 300, 130);
    pop();

    // Right Ear
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    triangle(470, 200, 450, 50, 340, 130);
    pop();
}

function drawFrontHair() {
    push();
    noFill();
    stroke(8, 4, 3);
    strokeWeight(25);
    // Left hair
    line(300, 120, 370, 215);
    line(320, 120, 400, 215);
    line(340, 125, 430, 220);
    line(360, 125, 450, 215);
    line(390, 135, 470, 220);
    line(410, 145, 475, 220);

    // Right hair
    line(270, 130, 230, 210);
    line(250, 140, 205, 215);
    line(225, 150, 180, 220);
    line(205, 160, 160, 220);
    pop();
}

function drawCatBody() {

}