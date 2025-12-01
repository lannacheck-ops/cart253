/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */
function flappyBirdPostSetup() {
    birdNest = [];
    birdNestMax = 1;
    for (i = 0; i < birdNestMax; i++) {
        birdNest.push(createBirdNest(i));
    }
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
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function flappyBirdPostKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function flappyBirdPostMousePressed() {

}