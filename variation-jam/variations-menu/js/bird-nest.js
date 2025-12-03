/**
 * Containsthe the birdBNest variables and draws and moves the birdNest
 */

// Bird nest array
let birdNest = [];
let birdNestMax = undefined;

/**
 * Create new bird nest
 */
function createBirdNest(i) {
    let newBirdNest = {
        color: "#a66917",
        x: i * 50 + cnv.width + 100,
        y: undefined,
        width: 80,
        height: 35,
        speed: 4,
        delivered: false,
        bird: {
            color: "#fff024ff",
            x: undefined,
            y: undefined,
            size: 45,
            wing: {
                y: undefined,
                leftX: undefined,
                rightX: undefined,
                width: 23,
                height: 18,
                leftAngle: 30,
                rightAngle: -30,
                color: "#f9f9ebff"
            }
        }
    }

    return newBirdNest;
}

/**
 * Draws the bird nest
 */
function drawBirdNest(nest) {
    // Set Nest Y
    nest.y = height - nest.height / 4;
    // Bird
    // Set Bird Nest X and Y
    nest.bird.x = nest.x;
    nest.bird.y = nest.y - nest.bird.size / 2;
    push();
    noStroke();
    fill(nest.bird.color);
    circle(nest.bird.x, nest.bird.y, nest.bird.size);
    pop();

    // Nest
    push();
    noStroke();
    fill(nest.color);
    ellipse(nest.x, nest.y, nest.width, nest.height);
    pop();

    //Wings
    // Set the wing's x and y positions
    nest.bird.wing.leftX = nest.bird.x - 12;
    nest.bird.wing.rightX = nest.bird.x + 12;
    nest.bird.wing.y = nest.bird.y - 5;
    // Call the draw wings function
    drawBirdNestWings(nest.bird.wing.leftX, nest.bird.wing.y, nest.bird.wing, nest.bird.wing.leftAngle);
    drawBirdNestWings(nest.bird.wing.rightX, nest.bird.wing.y, nest.bird.wing, nest.bird.wing.rightAngle);
}

/**
 * Draws the bird's wings
 */
function drawBirdNestWings(x, y, wing, wingAngle) {
    push();
    translate(x, y);
    rotate(wingAngle);
    noStroke();
    fill(wing.color);
    ellipse(0, 0, wing.width, wing.height);
    pop();
}

/**
 * Move the bird nest to the left
 */
function moveBirdNest(nest) {
    // Only start moving when the game starts
    if (!gameStart || gameFailed) {
        return;
    }
    nest.x -= nest.speed;
    const minX = random(-1000, -200);
    // Once the nest is outside the screen reset its parameters
    if (nest.x <= minX) {
        resetBirdNest(nest);
    }
}

/**
 * Reset the bird nest variables
 */
function resetBirdNest(nest) {
    let index = pipes.indexOf(nest);
    // Bring the bird nest to the right of the screen
    nest.x = index * nest.width + width + 300;
    nest.speed += 0.1;
    nest.delivered = false;
}