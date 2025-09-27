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
        r: 180,
        g: 107,
        b: 43
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
        maxY: 280,
        left: {
            x: 245,
            y: 280,
            maxX: 245
        },
        right: {
            x: 395,
            y: 280,
            maxX: 395
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
    moveCatEyes();
}

function moveCatEyes() {
    cat.eye.left.x = mouseX
    cat.eye.left.y = mouseY
    cat.eye.left.x = constrain(cat.eye.left.x, cat.eye.left.maxX - cat.eye.size + 90, cat.eye.left.maxX + cat.eye.size - 90)
    cat.eye.left.y = constrain(cat.eye.left.y, cat.eye.maxY - cat.eye.size + 90, cat.eye.maxY + cat.eye.size - 90)

    cat.eye.right.x = mouseX
    cat.eye.right.y = mouseY
    cat.eye.right.x = constrain(cat.eye.right.x, cat.eye.right.maxX - cat.eye.size + 90, cat.eye.right.maxX + cat.eye.size - 90)
    cat.eye.right.y = constrain(cat.eye.right.y, cat.eye.maxY - cat.eye.size + 90, cat.eye.maxY + cat.eye.size - 90)
}
/**
 * Draws cat-sona's whole body
 */
function drawCat() {
    drawCatTail();
    drawCatBody();
    drawCatEars();
    drawCatHead();
    drawCatWhiskers();
    drawCatEyes();
    drawCatNose();
    drawCatMouth();
    drawFrontHair();

}

function drawCatTail() {
    push();
    noFill();
    stroke(130, 84, 60);
    strokeWeight(50);
    line(50, 100, 200, 450);
    pop();
}
/**
 * Draws cat's head
 */
function drawCatHead() {
    push();
    //stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    //strokeWeight(cat.stroke.size);
    noStroke();
    fill(168, 87, 39);
    ellipse(cat.x, 320, 340, 380);
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    ellipse(cat.x, cat.y, cat.size, cat.size);//, 180);
    pop();
}

function drawCatWhiskers() {
    // Left whiskers
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(7);
    line(220, 340, 100, 320);
    line(220, 360, 100, 360);
    line(220, 380, 100, 400);
    pop();

    // Right whiskers
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(7);
    line(420, 340, 540, 320);
    line(420, 360, 540, 360);
    line(420, 380, 540, 400);
    pop();
}
/**
 * Draws cat's eyes 
 */
function drawCatEyes() {
    // Left Eye
    push();
    noStroke();
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    circle(245, 280, cat.eye.size);
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
    noStroke();
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    circle(395, 280, cat.eye.size);
    pop();

    // Right Iris
    push();
    noStroke();
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
/**
 * Draws cat's nose 
 */
function drawCatNose() {
    push();
    //noStroke();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeJoin(ROUND);
    strokeWeight(5);
    fill(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    triangle(295, 340, 345, 340, 320, 370);
    pop();
}
/**
 * Draws cat's mouth: left and right lip
 */
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

/**
 * Draws cat's ears
 */
function drawCatEars() {
    // Left Ear
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    triangle(170, 200, 190, 50, 300, 130);
    pop();

    // Left Inner Ear
    push();
    noStroke();
    fill(245, 203, 188);
    triangle(190, 200, 205, 90, 280, 130);
    pop();

    // Right Ear
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    triangle(470, 200, 450, 50, 340, 130);
    pop();

    // Right Inner Ear
    push();
    noStroke();
    fill(245, 203, 188);
    triangle(450, 200, 435, 90, 360, 130);
    pop();
}
/**
 * Draws cat's hair
 */
function drawFrontHair() {
    push();
    noFill();
    stroke(56, 35, 16);
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
/**
 * Draws cat's lower body
 */
function drawCatBody() {
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    rectMode(CENTER)
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    ellipse(320, 600, 450, 480);
    pop();
}
