/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the red variation starts
 */
function flappyBirdSetup() {
    bird.x = birdInitialX;
    bird.y = birdInitialY;
}

/**
 * This will be called every frame when the red variation is active
 */
function flappyBirdDraw() {
    background("#65c5f8ff");
    drawBird();
    moveBird();
}

/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function flappyBirdKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function flappyBirdMousePressed() {
    gameStart = true;
    bird.velocity = bird.lift;
}