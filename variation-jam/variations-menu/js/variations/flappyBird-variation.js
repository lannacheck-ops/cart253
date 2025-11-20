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
 * This will be called every frame when the red variation is active
 */
function flappyBirdDraw() {
    background("#65c5f8ff");
    drawBird();
    moveBird();
    if (gameStart == true) {
        for (let pipe of pipes) {
            drawPipe(pipe);
            movePipe(pipe);
        }
    }

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
    let index = pipes.indexOf(pipe);
    let newX = pipe.width * index + width + pipeDist + random(200, 500);
    let validPosition = false;


    // Keep trying positions until we find one with enough space
    while (!validPosition) {
        newX += pipeDist;
        validPosition = true;

        // Check distance from all other pipes
        for (let otherPipe of pipes) {
            if (otherPipe !== pipe) { // Don't compare with itself
                let distance = abs(newX - otherPipe.x);
                if (distance < pipe.width + pipeDist) { // 50px minimum space + pipe width
                    validPosition = false;
                    break; // immediately exit the loop if on position is too close
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