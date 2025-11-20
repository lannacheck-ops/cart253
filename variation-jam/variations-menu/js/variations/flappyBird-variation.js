/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */
let pipes = [];
let pipeSpawnTimer = 1000;
let pipeGap = 200;
let pipeMax = 3;
let pipeDist = 200;
/**
 * This will be called just before the red variation starts
 */
function flappyBirdSetup() {
    bird.x = birdInitialX;
    bird.y = birdInitialY;
    // Empty array of pipes
    pipes = [];
    // Add pipes to the array
    for (i = 0; i < pipeMax; i++) {
        pipes.push(createPipes(i));
        //console.log(pipes[i].x);
    }
}

/**
 * This will be called every frame when the red variation is active
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
 * Create pipes
 */
function createPipes(i) {
    let pipe = {
        // Calculates the initial x of the pipes
        x: pipeDist * i + width + pipeDist,
        color: "#5dd41dff",
        speed: 3,
        width: 80,
        topPipe: {
            y: 0,
            height: random(50, height - pipeGap - 50)
        },
        bottomPipe: {
            y: undefined,
            height: undefined
        }
    };
    return pipe;
}
/**
 * Draw the pipes
 */
function drawPipe(pipe) {
    push();
    noStroke();
    fill(pipe.color);
    // Top pipe
    rect(pipe.x, pipe.topPipe.y, pipe.width, pipe.topPipe.height);
    // Bottom pipe
    // Set bottom pipe y
    pipe.bottomPipe.y = pipe.topPipe.height + pipeGap
    // Set bottom pipe height
    pipe.bottomPipe.height = height - pipe.bottomPipe.y
    rect(pipe.x, pipe.bottomPipe.y, pipe.width, pipe.bottomPipe.height);
    pop();
}
/**
 * Move the pipes to the left 
 */
function movePipe(pipe) {
    if (!gameStart || gameFailed) {
        return;
    }
    pipe.x -= pipe.speed;
    const minX = random(-1000, -200);
    // Once the pipe is outside the screen reset its parameters
    if (pipe.x <= minX) {
        pipe.ready = false;
        resetPipe(pipe);
    }
}

/**
 * Reset pipe parameters
 */
function resetPipe(pipe) {
    // Find the index of the specifc pipe being reset
    let index = pipes.indexOf(pipe);
    // Set the new x position of the pipe based on its index and some random variables
    let newX = pipe.width * index + width + pipeDist + random(200, 500);
    // Checks if the new x position of the pipe is valid
    let validPosition = false;


    // Keep trying x positions until we find one with enough space
    while (!validPosition) {
        // Adds the pipeDist variable to the new x position until the gap is big enough for the position to be valid
        newX += pipeDist;
        // Optimiscally make the position valid 
        validPosition = true;

        // Check distance from all other pipes
        for (let otherPipe of pipes) {
            if (otherPipe !== pipe) { // Don't compare with itself
                let distance = abs(newX - otherPipe.x);
                if (distance < pipe.width + pipeDist) {
                    validPosition = false;
                    break; // Immediately exit the loop if the pipe's position is too close
                }
            }
        }
    }

    pipe.x = newX;
    pipe.color = "#5dd41dff";
    pipe.speed = 3;
    pipe.width = 80;
    pipe.topPipe.y = 0;
    pipe.topPipe.height = random(50, height - pipeGap - 50);
    pipe.bottomPipe.y = undefined;
    pipe.bottomPipe.height = undefined;
}

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
    if (!gameFailed) {
        bird.velocity = bird.lift;
    }

}