/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

let letterImg = undefined;
let letter = {
    x: undefined,
    y: undefined,
    velocity: 0,
    gravity: 0.6,
    active: false,
    size: 32
}
function preload() {
    letterImg = loadImage('assets/images/letter.png');
}
/**
 * This will be called just before the flappyBirdPost variation starts
 */
function flappyBirdPostSetup() {
    birdNest = [];
    birdNestMax = 1;
    for (i = 0; i < birdNestMax; i++) {
        birdNest.push(createBirdNest(i));
    }
    letter.active = false;
}


/**
 * This will be called every frame when the green variation is active
 */
function flappyBirdPostDraw() {
    background("#65c5f8ff");
    for (let nest of birdNest) {
        drawBirdNest(nest);
        moveBirdNest(nest);
    }
    moveLetter();
    letterSpawn();
    push();
    translate(bird.x, bird.y); // Set the center(center of the canvas) of rotation to the bird's x and y
    rotate(bird.angle); // Rotate the bird
    drawBird();
    moveBird();
    bird.y = constrain(bird.y, 0, height);
    pop();
    checkBirdCanvasOverlap();
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function flappyBirdPostKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
    // If the spacebar is pressed
    if (event.keyCode === 32) {
        letter.active = true
    }
}

function letterSpawn() {
    push();
    image(letterImg, letter.x, letter.y, letter.size, letter.size);
    pop();
}

function moveLetter() {
    letter.x = bird.x;
    if (letter.active) {
        letter.y
        letter.velocity += letter.gravity;
        letter.y += letter.velocity;
    }
    else {
        letter.y = bird.y;
        letter.velocity = 0;
    }
    if (letter.y > height + letter.size) {
        letter.active = false;
    }
}
/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function flappyBirdPostMousePressed() {

}