let pipes = [];
let pipeSpawnTimer = 1000;
let pipeGap = undefined;
let pipeMax = undefined;
let pipeDist = 200;
let pipeSpeed = undefined;
/**
 * Create pipes
 */
function createPipes(i) {
    let pipe = {
        // Calculates the initial x of the pipes based on their creation index "i"
        x: pipeDist * i * 1.5 + width + pipeDist,
        color: "#5dd41dff",
        speed: pipeSpeed,
        width: 80,
        topPipe: {
            y: 0,
            height: random(50, height - pipeGap - 50)
        },
        bottomPipe: {
            y: undefined,
            height: undefined
        },
        pastPipe: false
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
    pipe.speed = pipeSpeed;
    pipe.width = 80;
    pipe.topPipe.y = 0;
    pipe.topPipe.height = random(50, height - pipeGap - 50);
    pipe.bottomPipe.y = undefined;
    pipe.bottomPipe.height = undefined;
    pipe.pastPipe = false;
}