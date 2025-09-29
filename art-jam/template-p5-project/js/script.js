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
    pinkFill: {
        r: 245,
        g: 203,
        b: 188
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
        irisSizeX: 70,
        irisLeftSizeY: 70,
        irisRightSizeY: 70,
        shineLeftSize: 30,
        shineRightSize: 30,
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
    },
    whisker: {
        timer: 0,
        startY: 340,
        endY: 320,
        left: {
            startX: 220,
            endX: 100
        },
        right: {
            startX: 420,
            endX: 540
        }
    },
    tail: {
        startX: 50
    },
    ear: {
        left: {
            midX: 190
        },
        right: {
            midX: 450
        }
    },
    happiness: 0
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
    //moveCatEyes();
    blinkCatEyes();
    massageCat();
}
/**
 * Makes the cat's eye blink when the mouse is pressed over a specific eye
 */
function blinkCatEyes() {

    const dLeftEye = dist(mouseX, mouseY, cat.eye.left.x, cat.eye.left.y);
    const overlapLeftEye = (dLeftEye < cat.eye.irisSizeX / 2);

    if (overlapLeftEye && mouseIsPressed) {
        cat.eye.irisLeftSizeY = 10;
        cat.eye.shineLeftSize = 0;
    }
    else {
        cat.eye.irisLeftSizeY = 70;
        cat.eye.shineLeftSize = 30;
    }

    const dRightEye = dist(mouseX, mouseY, cat.eye.right.x, cat.eye.right.y);
    const overlapRightEye = (dRightEye < cat.eye.irisSizeX / 2);

    if (overlapRightEye && mouseIsPressed) {
        cat.eye.irisRightSizeY = 10;
        cat.eye.shineRightSize = 0;
    }
    else {
        cat.eye.irisRightSizeY = 70;
        cat.eye.shineRightSize = 30;
    }

}

function massageCat() {
    // Check if mouse is overlapping the head
    const dHead = dist(mouseX, mouseY, cat.x, cat.y);
    const overlapHead = (dHead < cat.size / 2);
    cat.happiness = constrain(cat.happiness, 0, 200)
    // Check if the mouse is moving (massaging)
    const mouseIsMoving = (movedX !== 0 || movedY !== 0);

    if (overlapHead && mouseIsMoving && mouseIsPressed) {
        cat.whisker.timer += 1
        cat.happiness += 1
        if (cat.whisker.timer >= 24) {
            cat.whisker.timer = 0
        }
        if (cat.whisker.timer < 12) {
            cat.whisker.endY = 300
            cat.tail.startX = 200
            cat.ear.left.midX = 210
            cat.ear.right.midX = 430
        }
        if (cat.whisker.timer >= 12 && cat.whisker.timer < 25) {
            cat.whisker.endY = 320
            cat.tail.startX = 50
            cat.ear.left.midX = 190
            cat.ear.right.midX = 450
        }

    }

    if (cat.happiness >= 120) {
        drawCatMouth()
    }
    if (!mouseIsPressed) {
        cat.whisker.endY = 320
        cat.tail.startX = 50
        cat.ear.left.midX = 190
        cat.ear.right.midX = 450
        if (cat.happiness > 0) {
            cat.happiness -= 1
        }
    }
    console.log(cat.whisker.timer);
    console.log(cat.happiness);
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
    drawCatLips();
    drawFrontHair();

}
/**
 * Draws cat's tail
 */
function drawCatTail() {
    push();
    noFill();
    stroke(130, 84, 60);
    strokeWeight(50);
    line(cat.tail.startX, 100, 200, 450);
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
/**
 * Draw cat's whiskers
 */
function drawCatWhiskers() {
    // Left whiskers
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(7);
    // Whisker 1
    line(cat.whisker.left.startX, cat.whisker.startY, cat.whisker.left.endX, cat.whisker.endY);
    // Whisker 2
    line(cat.whisker.left.startX, cat.whisker.startY + 20, cat.whisker.left.endX, cat.whisker.endY + 40);
    // Whisker 3
    line(cat.whisker.left.startX, cat.whisker.startY + 40, cat.whisker.left.endX, cat.whisker.endY + 80);

    // Right whiskers
    // Whisker 1
    line(cat.whisker.right.startX, cat.whisker.startY, cat.whisker.right.endX, cat.whisker.endY);
    // Whisker 2
    line(cat.whisker.right.startX, cat.whisker.startY + 20, cat.whisker.right.endX, cat.whisker.endY + 40);
    // Whisker 3
    line(cat.whisker.right.startX, cat.whisker.startY + 40, cat.whisker.right.endX, cat.whisker.endY + 80);
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
    ellipse(cat.eye.left.x, cat.eye.left.y, cat.eye.irisSizeX, cat.eye.irisLeftSizeY);
    pop();

    // Left Eye shine
    push();
    stroke(241, 223, 189);
    strokeWeight(cat.eye.shineLeftSize)
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
    ellipse(cat.eye.right.x, cat.eye.right.y, cat.eye.irisSizeX, cat.eye.irisRightSizeY);
    pop();

    // Right Eye shine
    push();
    stroke(241, 223, 189);
    strokeWeight(cat.eye.shineRightSize)
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
    noStroke();
    fill(cat.pinkFill.r, cat.pinkFill.g, cat.pinkFill.b);
    triangle(303, 388, 319, 369, 335, 388);
    triangle(290, 386, 318, 408, 348, 386);
    pop();

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

function drawCatLips() {
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
    triangle(170, 200, cat.ear.left.midX, 50, 300, 130);
    pop();

    // Left Inner Ear
    push();
    noStroke();
    fill(cat.pinkFill.r, cat.pinkFill.g, cat.pinkFill.b);
    triangle(190, 200, cat.ear.left.midX + 15, 90, 280, 130);
    pop();

    // Right Ear
    push();
    stroke(cat.stroke.r, cat.stroke.g, cat.stroke.b);
    strokeWeight(cat.stroke.size);
    fill(cat.fill.r, cat.fill.g, cat.fill.b);
    triangle(470, 200, cat.ear.right.midX, 50, 340, 130);
    pop();

    // Right Inner Ear
    push();
    noStroke();
    fill(cat.pinkFill.r, cat.pinkFill.g, cat.pinkFill.b);
    triangle(450, 200, cat.ear.right.midX - 15, 90, 360, 130);
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
