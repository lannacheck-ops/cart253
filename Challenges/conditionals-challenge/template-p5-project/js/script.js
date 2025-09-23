/**
 * Circle Master
 * Lanna Check, Arielle Wong, 
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
    x: 200,
    y: 200,
    size: 100,
    fill: "#ff0000",
    vX: 0,
    vY: 0,
    maxV: 5,
    dirX: 1,
    dirY: 1
};

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
    background("#aaaaaa");

    // Move user circle
    moveUser();

    // Draw the user and puck
    drawUser();
    drawPuck();
    movePuck();

    puck.x = constrain(puck.x, 0 + (puck.size / 2), width - (puck.size / 2));
    puck.y = constrain(puck.y, 0 + (puck.size / 2), height - (puck.size / 2));
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
}

function movePuck() {

    const distance = dist(user.x, user.y, puck.x, puck.y);
    const checkOverlap = (distance < user.size / 2 + puck.size / 2);

    const distanceX = dist(user.x, 0, puck.x, 0);
    const distanceY = dist(0, user.y, 0, puck.y)


    if (checkOverlap) {
        if (distanceX < distanceY) {
            puck.vX = puck.maxV
            if (user.x > puck.x) {
                puck.dirX = -1
            }
            else {
                puck.dirX = 1
            }
        }
        if (distanceY < distanceX) {
            puck.vY = puck.maxV
            if (user.y > puck.y) {
                puck.dirY = -1
            }
            else {
                puck.dirY = 1
            }
        }


    }
    else {
        puck.vX -= 0.1;
        puck.vY -= 0.1;
        puck.vX = constrain(puck.vX, 0, puck.maxV);
        puck.vY = constrain(puck.vY, 0, puck.maxV);
    }

    puck.x += puck.vX * puck.dirX;
    puck.y += puck.vY * puck.dirY;
}