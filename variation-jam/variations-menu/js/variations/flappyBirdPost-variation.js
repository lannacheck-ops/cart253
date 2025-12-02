/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Image of letter
let letterImg = undefined;
// Letter variables
let letter = {
    x: undefined,
    y: undefined,
    velocity: 0,
    gravity: 0.6,
    active: false, // Checks if the letter has been dropped
    size: 32
}
// Load letter image
function preload() {
    letterImg = loadImage('assets/images/letter.png');
}
/**
 * This will be called just before the flappyBirdPost variation starts
 */
function flappyBirdPostSetup() {
    // Reset the bird's variables before the game starts
    bird.x = birdInitialX;
    bird.y = birdInitialY;
    bird.angle = 0;
    // Empty bird nest array
    birdNest = [];
    // Sets the max amount of bird nests to appear
    birdNestMax = 1;
    for (i = 0; i < birdNestMax; i++) {
        birdNest.push(createBirdNest(i));
    }
    // Rest letter active
    letter.active = false;
    // Empties array of pipes before the game starts
    pipes = [];
    // Sets the max amount of bird in the array
    pipeMax = 2;
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
 * Draws the Flappy Bird Post game
 */
function flappyBirdPostDraw() {
    background("#65c5f8ff");
    // Draws the pipes
    for (let pipe of pipes) {
        drawPipe(pipe);
        movePipe(pipe);
        checkPipeOverlap(pipe);
    }
    // Draws the bird nests
    for (let nest of birdNest) {
        drawBirdNest(nest);
        moveBirdNest(nest);
        checkLetterBirdNestCollision(nest);
        checkBirdBirdNestOverlap(nest);
    }
    // Moves the letter 
    moveLetter();
    // Draws the letter
    letterSpawn();

    // Draws the bird
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
 * Calls the key pressed function when this variation is active
 */
function flappyBirdPostKeyPressed(event) {
    // If the ESC key is pressed go back to the main menu
    if (event.keyCode === 27) {
        state = "menu";
    }
    // If the spacebar is pressed drop the letter
    if (gameStart && !gameFailed) {
        if (event.keyCode === 32) {
            letter.active = true
        }
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

function checkLetterBirdNestCollision(nest) {
    // Get the distance from the rightmost side of the bird to the middle of the pipe
    const d = dist(letter.x, letter.y, nest.x, nest.bird.y);
    const collision = (d < letter.size / 2 + nest.width / 2);

    // If the bird overlaps either the top or bottom pipe, stop the game
    if (collision === true && letter.active) {
        // Add the score if the bird passes through the pipe it was overlapping
        score += 5;
        letter.active = false;
        resetBirdNest(nest);
    }
}

function checkBirdBirdNestOverlap(nest) {
    const d = dist(bird.x, bird.y, nest.x, nest.bird.y);
    const collision = (d < bird.size / 2 + nest.width / 2);

    // If the bird collides with the bird nest the player loses
    if (collision === true) {
        gameFailed = true;
    }
}
/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function flappyBirdPostMousePressed() {

}