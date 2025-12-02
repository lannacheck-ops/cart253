/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the blue variation starts
 */
function flappyBirdBossSetup() {
    // Reset the bird's variables before the game starts
    bird.x = birdInitialX;
    bird.y = birdInitialY;
    bird.angle = 0;
    // Empties array of pipes before the game starts
    pipes = [];
    // Sets the max amount of bird in the array
    pipeMax = 1;
    // Reset the score
    score = 0;
    // Reset the pipe variables
    pipeSpeed = 2;
    pipeGap = 200;
    // Add pipes to the array
    for (i = 0; i < pipeMax; i++) {
        pipes.push(createPipes(i));
    }
}

/**
 * This will be called every frame when the blue variation is active
 */
function flappyBirdBossDraw() {
    background("#65c5f8ff");
    for (let pipe of pipes) {
        drawPipe(pipe);
        movePipe(pipe);
        checkPipeOverlap(pipe);
    }

    drawBirdBoss();

    push();
    translate(bird.x, bird.y); // Set the center(center of the canvas) of rotation to the bird's x and y
    rotate(bird.angle); // Rotate the bird
    drawBird();
    moveBird();
    pop();

    checkBirdCanvasOverlap();
    drawScore();
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function flappyBirdBossKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the blue variation is active
 */
function flappyBirdBossMousePressed() {

}