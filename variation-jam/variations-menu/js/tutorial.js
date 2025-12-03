/**
 * Contains the Tutorial of the game
 */

// Instrction variable
let instructions = {
    box: {
        x: undefined,
        y: undefined,
        width: 220,
        height: 200,
        corner: 20
    },
    txt: "Click to fly, Press spacebar to deliver letters",
    size: 25
}
/**
 * Sets up the tutorial screen
 */
function tutorialSetup() {
    instructions.box.x = width / 2;
    instructions.box.y = height / 2 - instructions.box.height / 2;
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
}

/**
 * Draws the Flappy Bird tutorial
 */
function tutorialDraw() {
    background("#65c5f8ff");
    // Moves the letter 
    moveLetter();
    // Draws the letter
    letterSpawn();

    // Draws, moves and rotates the bird
    push();
    translate(bird.x, bird.y); // Set the center(center of the canvas) of rotation to the bird's x and y
    rotate(bird.angle); // Rotate the bird
    drawBird();
    moveBird();
    pop();
    // Check if the bird is overlapping the edge of the canvas
    checkBirdCanvasOverlapTutorial();
    // Draw tutorial instrctions
    drawInstructions();
    // Draw the esc text
    drawEsc();
}

/**
 * Check if the bird is overlapping the edge of the canvas
 */
function checkBirdCanvasOverlapTutorial() {
    if (bird.y - bird.size / 2 < 0 || bird.y + bird.size / 2 > height) {
        // Reset the bird position when there's an overlap
        bird.x = birdInitialX;
        bird.y = birdInitialY;
        bird.angle = 0;
        bird.velocity = 0;
    }
}

// Draw the game instructions text 
function drawInstructions() {
    // Draw the text box
    push();
    stroke(0);
    strokeWeight(3);
    fill(bird.color);
    rect(instructions.box.x, instructions.box.y, instructions.box.width, instructions.box.height, instructions.box.corner);
    pop();

    // Draw the text
    push();
    fill(0);
    textFont(pixelFont);
    textSize(instructions.size);
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    text(instructions.txt, instructions.box.x + 5, instructions.box.y + instructions.size * 4, instructions.box.width - 10);
    pop();
}

/**
 * Draw the esc text at the top right of the canvas
 */
function drawEsc() {
    push();
    fill(0);
    stroke(255);
    strokeWeight(3);
    textFont(pixelFont);
    textSize(30);
    textAlign(LEFT, CENTER);
    text("ESC", width / 1.2, 30);
    pop();
}