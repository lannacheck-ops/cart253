/**
 * Contains the Flappy Bird variation of the game
 */

/**
 * Sets up the Flappy Bird game
 */
function flappyBirdSetup() {
    // Reset the birds initial position before the game starts
    bird.x = birdInitialX;
    bird.y = birdInitialY;
    // Empties array of pipes before the game starts
    pipes = [];
    // Add pipes to the array
    for (i = 0; i < pipeMax; i++) {
        pipes.push(createPipes(i));
    }
}

/**
 * Draws Flappy Bird game
 */
function flappyBirdDraw() {
    background("#65c5f8ff");
    drawBird();
    moveBird();
    for (let pipe of pipes) {
        drawPipe(pipe);
        movePipe(pipe);
        checkPipeOverlap(pipe);
    }


}

/**
 * Checks if the Pipe is overlapping the Bird
 */
function checkPipeOverlap(pipe) {
    // Get the distance from the rightmost side of the bird to the middle of the pipe
    const dX = abs((bird.x + bird.size / 2) - (pipe.x + pipe.width / 2));
    // Check if they overlap on the x
    const overlapX = (dX < bird.size / 2 + pipe.width / 2);
    // Check if the bird overlaps the top Pipe
    const overlapTopY = bird.y - bird.size / 2 <= pipe.topPipe.height;
    // Check if the bird overlaps the bottom Pipe
    const overlapBottomY = bird.y + bird.size / 2 >= pipe.bottomPipe.y;

    if (overlapX == true) {
        console.log(overlapX, dX, overlapBottomY, pipe.bottomPipe.y, overlapTopY, pipe.topPipe.height, bird.y - bird.size / 2);
    }
    // If the bird overlaps either the top or bottom pipe, stop the game
    if (overlapX == true) {
        if (overlapTopY == true || overlapBottomY == true) {
            gameFailed = true;
        }
    }
}
/**
 * Exit to menu when the esc key is pressed
 */
function flappyBirdKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * Lift the bird when the mouse is pressed
 */
function flappyBirdMousePressed() {
    gameStart = true;
    if (!gameFailed) {
        bird.velocity = bird.lift;
    }

}