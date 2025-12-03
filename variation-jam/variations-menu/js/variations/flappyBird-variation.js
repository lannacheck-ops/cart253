/**
 * Contains the Flappy Bird variation of the game
 */
let score = 0;
/**
 * Sets up the Flappy Bird game
 */
function flappyBirdSetup() {
    // Reset the bird's variables before the game starts
    bird.x = birdInitialX;
    bird.y = birdInitialY;
    bird.angle = 0;
    // Empties array of pipes before the game starts
    pipes = [];
    // Sets the max amount of bird in the array
    pipeMax = 3;
    // Reset the score
    score = 0;
    pipeGap = 140;
    pipeSpeed = 3;
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

    for (let pipe of pipes) {
        drawPipe(pipe);
        movePipe(pipe);
        checkPipeOverlap(pipe);
    }
    // Draws, moves and rotates the bird
    push();
    translate(bird.x, bird.y); // Set the center(center of the canvas) of rotation to the bird's x and y
    rotate(bird.angle); // Rotate the bird
    drawBird();
    moveBird();
    pop();

    checkBirdCanvasOverlap();
    drawScore();
    drawEsc();

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

    // If the bird overlaps either the top or bottom pipe, stop the game
    if (overlapX == true) {
        // Add the score if the bird passes through the pipe it was overlapping
        addScore(overlapX, pipe);
        if (overlapTopY == true || overlapBottomY == true) {
            gameFailed = true;
        }
    }
}

/**
 * Check if the bird touches the top or bottom of the canvas 
 */
function checkBirdCanvasOverlap() {
    if (bird.y - bird.size / 2 < 0 || bird.y + bird.size / 2 > height) {
        gameFailed = true;
    }
}
/**
 * Add the score if the bird passes through a pipe
 */
function addScore(overlapX, pipe) {
    // Checks if the bird went past a pipe
    const pastPipe = bird.x + bird.size / 2 > pipe.x + pipe.width;

    if (overlapX && pastPipe && !pipe.pastPipe) {
        // Add 1 to the score
        score += 1;
        // The pipe has been past 
        pipe.pastPipe = true;
    }

}

function drawScore() {
    let scoreTxt = "Score: " + score
    push();
    textFont(pixelFont);
    textAlign(LEFT, CENTER);
    stroke(255);
    strokeWeight(3);
    textSize(30);
    text(scoreTxt, 20, 30);
    pop();
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
        bird.angle -= 35;
    }
}
