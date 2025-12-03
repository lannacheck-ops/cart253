/**
 * Contains the birdBoss variables and draws and moves the bird
 */

// Boss variables
let birdBoss = {
    color: "#08be3cff",
    x: cnv.width + cnv.height / 4,
    y: cnv.height / 2,
    size: cnv.height * 1.2,
    velocity: 0,
    eye: {
        color: 255,
        width: cnv.height - cnv.height / 1.3,
        height: cnv.height - cnv.height / 1.5,
        y: undefined,
        iris: {
            color: 0,
            x: undefined,
            y: cnv.height / 2 - ((cnv.height * 1.2) / 6),
            size: cnv.height / 6
        }
    },
    mouth: {
        color: "#ff4d47ff",
        width: cnv.height - cnv.height / 1.3,
        height: cnv.height - cnv.height / 1.1,
        y: cnv.height / 2 + ((cnv.height / 2) / 3)
    },
    laser: {
        colorAlpha: 255,
        alphaDecrease: 10,
        x1: undefined,
        x2: undefined,
        y: undefined,
        size: 10,
        sizeIncrease: 5,
        sizeMax: 30,
        sizeMin: 10,
        xDecrease: 10,
        timer: 0,
        shot: false
    },
    state: undefined

};

/**
 * Draws birdBoss
 */
function drawBirdBoss() {
    // Body
    push();
    noStroke();
    fill(birdBoss.color);
    circle(birdBoss.x, birdBoss.y, birdBoss.size);
    pop();

    // Eye
    // Set the y position
    birdBoss.eye.y = birdBoss.y - birdBoss.size / 6
    push();
    noStroke();
    fill(birdBoss.eye.color);
    ellipse(birdBoss.x - birdBoss.size / 3, birdBoss.eye.y, birdBoss.eye.width, birdBoss.eye.height);
    pop();

    // Iris
    push();
    stroke(birdBoss.eye.iris.color);
    strokeWeight(birdBoss.eye.iris.size);
    point(birdBoss.x - birdBoss.size / 2.7, birdBoss.eye.iris.y);
    pop();

    // Mouth
    push();
    noStroke();
    fill(birdBoss.mouth.color);
    ellipse(birdBoss.x - birdBoss.size / 3, birdBoss.mouth.y, birdBoss.mouth.width, birdBoss.mouth.height);
    pop();
    // Laser
    if (birdBoss.state === "laser") {
        push();
        stroke(255, 77, 71, birdBoss.laser.colorAlpha);
        strokeWeight(birdBoss.laser.size);
        line(birdBoss.x - birdBoss.size / 2.7, birdBoss.laser.y, birdBoss.laser.x2, birdBoss.laser.y);
        pop();
    }
}

/**
 * Moves and animates the laser
 */
function moveLaser() {
    // Reset the laser values on the lockOn state
    if (birdBoss.state === "lockOn") {
        birdBoss.laser.shot = false;
        bird.escape = false;
        birdBoss.laser.x2 = birdBoss.x - birdBoss.size / 2.7;
        birdBoss.laser.timer = 0;
        birdBoss.laser.size = birdBoss.laser.sizeMin;
        birdBoss.laser.colorAlpha = 255;
    }
    // Move and animate the laser 
    if (birdBoss.state === "laser") {
        if (birdBoss.laser.timer < 2)// Every 2 frames {
            if (birdBoss.laser.x2 >= -10) {
                // Play the laser sfx
                if (!laserSfx.isPlaying())
                    laserSfx.play();
                // Make the laser longer every 2 frames until it reaches the left side of the canvas
                birdBoss.laser.x2 -= birdBoss.laser.xDecrease;
            }
        // Make the laser bigger every 2 frames until it has reached its max size
        if (birdBoss.laser.size < birdBoss.laser.sizeMax) {
            birdBoss.laser.size += birdBoss.laser.sizeIncrease;
        }
        // Make the laser more transparent every 2 frames
        if (birdBoss.laser.x2 <= -10 && birdBoss.laser.colorAlpha >= 0.2) {
            birdBoss.laser.colorAlpha -= birdBoss.laser.alphaDecrease;
        }
        // Set the boss state back to lockOn when the transparency is below or equal to 0.2
        if (birdBoss.laser.colorAlpha <= 0.2) {
            birdBoss.state = "lockOn";
        }
        // Add 1 to the timer
        birdBoss.laser.timer += 1;
    }
    // Reset the timer once it reaches 2 frames
    if (birdBoss.laser.timer >= 2) {
        birdBoss.laser.timer = 0;
    }
}
