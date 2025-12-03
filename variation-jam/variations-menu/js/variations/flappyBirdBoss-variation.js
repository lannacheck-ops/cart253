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
    moveBossEye();
    moveBossMouth();
    drawBirdBoss();

    push();
    translate(bird.x, bird.y); // Set the center(center of the canvas) of rotation to the bird's x and y
    rotate(bird.angle); // Rotate the bird
    drawBird();
    moveBird();
    pop();
    moveLaser();

    checkBirdCanvasOverlap();
    checkBirdAndBossEyePostion();
    checkBirdAndBossMouthPostion();
    checkLaserOverlap();
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

// check the position in comparison the eye size and shi
function moveBossEye() {

    if (birdBoss.state == "lockOn") {
        if (bird.y <= height / 2) {
            birdBoss.eye.iris.y = map(bird.y, 0, height / 2, birdBoss.y - birdBoss.size / 4, birdBoss.y - birdBoss.size / 8);

        }
    }
}
function moveBossMouth() {

    if (birdBoss.state == "lockOn") {
        if (bird.y >= height / 2) {
            birdBoss.mouth.y = map(bird.y, height / 2 + birdBoss.mouth.height / 2, height, birdBoss.y + birdBoss.y / 4, birdBoss.y + birdBoss.y / 1.3);
        }
    }
}
function checkBirdAndBossEyePostion() {
    const eyeBirdDist = bird.y - (birdBoss.eye.iris.y - birdBoss.eye.iris.size / 2);
    // Check Eye position
    if (eyeBirdDist <= 7 && birdBoss.state == "lockOn") {
        birdBoss.state = "laser";
        birdBoss.laser.y = birdBoss.eye.iris.y;
    }
    else if (birdBoss.state !== "laser") {
        birdBoss.state = "lockOn";
    }

}
function checkBirdAndBossMouthPostion() {
    const mouthBirdDist = abs((birdBoss.mouth.y - birdBoss.mouth.height / 2) - bird.y);

    // Check Eye position
    if (mouthBirdDist <= 5 && birdBoss.state == "lockOn") {
        birdBoss.state = "laser";
        birdBoss.laser.y = birdBoss.mouth.y;
    }
    else if (birdBoss.state !== "laser") {
        birdBoss.state = "lockOn";
    }
}

function checkLaserOverlap() {
    const laserBirdDist = abs((bird.y + bird.size / 2) - (birdBoss.laser.y + birdBoss.laser.size / 2));
    const laserOverlap = laserBirdDist < bird.size / 2;

    if (birdBoss.laser.x2 <= bird.x + bird.size / 2 && birdBoss.state === "laser" && birdBoss.laser.colorAlpha >= 30) {
        if (laserOverlap) {
            gameFailed = true;
        }
    }
    if (birdBoss.laser.colorAlpha < 30 && birdBoss.state === "laser") {
        birdBoss.laser.shot = true;
    }
    if (!laserOverlap && birdBoss.laser.shot && bird.escape == false && birdBoss.state === "laser") {
        score += 5;
        bird.escape = true;

    }
    console.log(birdBoss.state, bird.escape, birdBoss.laser.shot, birdBoss.laser.colorAlpha);
}
/**
 * This will be called whenever the mouse is pressed while the blue variation is active
 */
function flappyBirdBossMousePressed() {

}