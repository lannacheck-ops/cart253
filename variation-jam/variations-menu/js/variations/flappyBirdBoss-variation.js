/**
 * Contains the Flappy Bird Boss variation of the game
 */

/**
 * Sets up the Flappy Bird Boss game
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
    // Sets the boss state to lockOn the bird's position from the start
    birdBoss.state = "lockOn";
    // Add pipes to the array
    for (i = 0; i < pipeMax; i++) {
        pipes.push(createPipes(i));
    }
}

/**
 * Draws Flappy Bird Boss game
 */
function flappyBirdBossDraw() {
    background("#65c5f8ff");
    for (let pipe of pipes) {
        drawPipe(pipe);
        movePipe(pipe);
        checkPipeOverlap(pipe);
    }
    // Draws the bird boss and move its eye and mouth
    moveBossEye();
    moveBossMouth();
    drawBirdBoss();

    // Draws flappy bird
    push();
    translate(bird.x, bird.y); // Set the center(center of the canvas) of rotation to the bird's x and y
    rotate(bird.angle); // Rotate the bird
    drawBird();
    moveBird();
    pop();
    // Draws the laser 
    moveLaser();

    checkBirdCanvasOverlap();
    // Check the bird's y position to trigger the boss to shoot out a laser 
    checkBirdAndBossEyePostion();
    checkBirdAndBossMouthPostion();
    // Check if the laser overlaps the bird
    checkLaserOverlap();
    drawScore();
    drawEsc();
    drawGameDescription();
}

/**
 * Exit to menu when the esc key is pressed
 */
function flappyBirdBossKeyPressed(event) {
    if (event.keyCode === 27) {
        jumpSfx.play();
        state = "menu";
    }
}

/** 
*Map the boss' eye position to the bird's y position 
*/
function moveBossEye() {

    if (birdBoss.state == "lockOn") {
        if (bird.y <= height / 2) {
            birdBoss.eye.iris.y = map(bird.y, 0, height / 2, birdBoss.y - birdBoss.size / 4, birdBoss.y - birdBoss.size / 8);

        }
    }
}
/**
 * Map the boss' mouth position to the bird's y position 
 */
function moveBossMouth() {

    if (birdBoss.state == "lockOn") {
        if (bird.y >= height / 2) {
            birdBoss.mouth.y = map(bird.y, height / 2 + birdBoss.mouth.height / 2, height, birdBoss.y + birdBoss.y / 4, birdBoss.y + birdBoss.y / 1.3);
        }
    }
}
/**
* Check the distance between bird's y position and the boss' eye position to trigger the laser beam
*/
function checkBirdAndBossEyePostion() {
    // Check Eye position
    const eyeBirdDist = bird.y - (birdBoss.eye.iris.y - birdBoss.eye.iris.size / 2);
    //Set the boss' state to laser if the distance between the eye y and bird y is less than or equal to 5
    if (eyeBirdDist <= 7 && birdBoss.state == "lockOn") {
        birdBoss.state = "laser";
        birdBoss.laser.y = birdBoss.eye.iris.y;
    }
    else if (birdBoss.state !== "laser") {
        birdBoss.state = "lockOn";
    }

}
/**  
 * Check the distance between bird's y position and the boss' mouth position to trigger the laser beam
*/
function checkBirdAndBossMouthPostion() {
    // Check the Distance between the eye and mouth
    const mouthBirdDist = abs((birdBoss.mouth.y - birdBoss.mouth.height / 2) - bird.y);

    // Set the boss' state to laser if the distance between the mouth y and bird y is less than or equal to 5
    if (mouthBirdDist <= 5 && birdBoss.state == "lockOn") {
        birdBoss.state = "laser";
        birdBoss.laser.y = birdBoss.mouth.y;
    }
    // Keep the state on lockOn to follow the bird's position when the distance is too big
    else if (birdBoss.state !== "laser") {
        birdBoss.state = "lockOn";
    }
}

/**
 * Check if the laser overlaps the bird
 */
function checkLaserOverlap() {
    // Check the distance between the laser and the bird
    const laserBirdDist = abs((bird.y + bird.size / 2) - (birdBoss.laser.y + birdBoss.laser.size / 2));
    const laserOverlap = laserBirdDist < bird.size / 2;
    // Set game failed to true if the laser overlaps the bird
    if (birdBoss.laser.x2 <= bird.x + bird.size / 2 && birdBoss.state === "laser" && birdBoss.laser.colorAlpha >= 30) {
        if (laserOverlap) {
            if (!gameFailed) {
                gameFailed = true;
                crashSfx.play()
            }

        }
    }
    // The laser has been shot if the laser's alpha value is less than 30
    if (birdBoss.laser.colorAlpha < 30 && birdBoss.state === "laser") {
        birdBoss.laser.shot = true;
    }
    // Increase the score if the bird escapes a laser
    if (!laserOverlap && birdBoss.laser.shot && bird.escape == false && birdBoss.state === "laser") {
        score += 5;
        bird.escape = true;

    }
}
