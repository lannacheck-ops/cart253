/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        maxy: 100,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    // The frog's eye
    eyes: {
        size: 35,
        left: {
            x: undefined,
            y: undefined
        },

        right: {
            x: undefined,
            y: undefined
        }
    },
    // The frog's iris
    iris: {
        size: 20,
        left: {
            x: undefined,
            y: undefined
        },
        right: {
            x: undefined,
            y: undefined
        }
    },

    // The frog's hunger
    hunger: {
        x: 70,
        y: 40,
        max: 500,
        min: 0,
        value: 495,
        timer: 10,
        reduction: 0.3,
        frozen: false,
        frozenTimer: 0
    }
};

// The Mouse position constrained by the canvas size
let mousePosX = undefined;
let mousePosY = undefined;

// Game Start Boolean
let gameStart = false;

// Game Start Boolean
let gameFailed = false;

// Game Menu Position and Size
const gameMenus = {
    width: 180,
    height: 80,
    roundness: 5,
    color: "#8B4611",
    textColor: "#ffffffff",
    start: {
        x: 120,
        y: 150,
        name: "START"
    },
    rules: {
        x: 340,
        y: 150,
        name: "RULES"
    },
    retry: {
        x: 220,
        y: 190,
        name: "RETRY?"
    }
};

// Fly array
// Has a position, size, parameters to randomize the sine movement, speed on the x axis, fly type, fly's name, its color, etc.
let flies = [
    {
        x: -30,
        y: 200, // Will be random
        D: 400,
        A: 30,
        size: 20,
        speed: 5,
        sinCount: 1,
        type: ["freeze", "poison", "regular"],
        typeRandomizer: [0, 0, 1, 1, 1, 2, 2, 2, 2, 2],
        name: 2,
        points: undefined,
        color: ["#0748DE", "#9C930E", "#000000"],
    },
    {
        x: -15,
        y: 160, // Will be random
        D: 300,
        A: 12,
        size: 15,
        speed: 4,
        sinCount: 1,
        type: ["freeze", "poison", "regular"],
        typeRandomizer: [0, 0, 1, 1, 1, 2, 2, 2, 2, 2],
        name: 2,
        points: undefined,
        color: ["#0748DE", "#9C930E", "#000000"],
    },
    {
        x: -20,
        y: 110, // Will be random
        D: 140,
        A: 10,
        size: 10,
        speed: 3,
        sinCount: 1,
        type: ["freeze", "poison", "regular"],
        typeRandomizer: [0, 0, 1, 1, 1, 2, 2, 2, 2, 2],
        name: 2,
        points: undefined,
        color: ["#0748DE", "#9C930E", "#000000"],
    }
];

let fontMenus;
// Preload fonts

function preload() {
    fontMenus = loadFont('/frogfrogfrog/assets/fonts/LuckiestGuy.ttf');
}
/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    setInterval(reduceHungerMeter, frog.hunger.timer);
}

function draw() {
    background("#87ceeb");


    if (!gameStart) {
        frog.hunger.value = 495;
        drawMenus(gameMenus, gameMenus.start);
        drawMenus(gameMenus, gameMenus.rules);
        moveFrog();
        moveFrogEyes();
        moveFrogIris();
        adjustMousePosition();
        moveTongue();
        drawFrog();
        drawFrogEyes(frog.eyes.left.x, frog.eyes.left.y);
        drawFrogEyes(frog.eyes.right.x, frog.eyes.right.y);
        drawFrogIris(frog.iris.left.x, frog.iris.left.y);
        drawFrogIris(frog.iris.right.x, frog.iris.right.y);
        checkTongueMenuOverlap();
    }

    if (gameStart && !gameFailed) {
        for (let fly of flies) {
            moveFly(fly);
            drawFly(fly);
        }
        moveFrog();
        moveFrogEyes();
        moveFrogIris();
        adjustMousePosition();
        moveTongue();
        drawFrog();
        drawFrogEyes(frog.eyes.left.x, frog.eyes.left.y);
        drawFrogEyes(frog.eyes.right.x, frog.eyes.right.y);
        drawFrogIris(frog.iris.left.x, frog.iris.left.y);
        drawFrogIris(frog.iris.right.x, frog.iris.right.y);

        for (let fly of flies) {
            checkTongueFlyOverlap(fly);
        }
        hungerMeter();
        frozenHungerTimer();
    }

    if (gameStart && gameFailed) {
        for (let fly of flies) {
            drawFly(fly);
        }
        moveFrogIris();
        adjustMousePosition();
        drawFrog();
        drawFrogEyes(frog.eyes.left.x, frog.eyes.left.y);
        drawFrogEyes(frog.eyes.right.x, frog.eyes.right.y);
        drawFrogIris(frog.iris.left.x, frog.iris.left.y);
        drawFrogIris(frog.iris.right.x, frog.iris.right.y);
        drawMenus(gameMenus, gameMenus.retry);
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    push();
    noStroke();
    if (fly.name === 2 || fly.name === 0) {
        fly.points = fly.size * 2
    }
    else if (fly.name === 1) {
        fly.points = fly.size * -2
    }
    fill(fly.color[fly.name]);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    fly.x += fly.speed;
    // Cool sine movement on the y
    fly.y = fly.A * sin(fly.sinCount * 0.05) + fly.D;
    fly.sinCount += random(0.5, 4);
    //fly.y += random(-3, 3)
    if (fly.x > width) {
        resetFly(fly);
    }
}

/**
 * Creates flies with random parameters
 */
function createFly() {
    const newfly = {
        x: random(-40, -10),
        y: random(100, 200), // Will be random
        D: random(120, 400),
        A: random(10, 30),
        size: random(10, 20),
        speed: random(3, 5),
        sinCount: 1,
        type: ["freeze", "poison", "regular"],
        name: undefined,
        color: ["#0748DE", "#9C930E", "#000000"]
    };
    return newfly;
}


/**
 * Resets the flies parameters
 */
function resetFly(fly) {
    fly.x = random(-50, -10);
    fly.y = random(100, 200); // Will be random
    fly.D = random(120, 400);
    fly.A = random(10, 30);
    fly.size = random(10, 20);
    fly.speed = random(3, 5);
    fly.sinCount = 1;
    fly.types = ["freeze", "poison", "regular"];
    fly.typeRandomizer = [0, 0, 1, 1, 1, 2, 2, 2, 2, 2];
    fly.name = random(fly.typeRandomizer);
    fly.color = ["#0748DE", "#9C930E", "#000000"];
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
    frog.body.x = constrain(frog.body.x, frog.body.size / 2, width - frog.body.size / 2);
}

/**
 * Adjust the frog's eyes' position
 */
function moveFrogEyes() {
    frog.eyes.left.x = frog.body.x - 30;
    frog.eyes.left.y = 450;
    frog.eyes.right.x = frog.body.x + 30;
    frog.eyes.right.y = 450;
}
/**
 * Move frog's iris' to the mouse position
 */
function moveFrogIris() {
    frog.iris.left.x = map(mousePosX, 0, width, frog.eyes.left.x - 8, frog.eyes.left.x + 8);
    frog.iris.left.y = map(mousePosY, 0, height, 442, 458);
    frog.iris.right.x = map(mousePosX, 0, width, frog.eyes.right.x - 8, frog.eyes.right.x + 8);
    frog.iris.right.y = map(mousePosY, 0, height, 442, 458);
}

/**
 * Constrain the mouse position variables to the canvas
 */
function adjustMousePosition() {
    mousePosX = constrain(mouseX, 0, width);
    mousePosY = constrain(mouseY, 0, height);
}
/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.speed = frog.hunger.value / 24;

    // The maximum height of the frog's tongue appears lower on the screen the hungrier it gets
    frog.tongue.maxy = -0.7 * (frog.hunger.value - 495) + 100;
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= frog.tongue.maxy) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

}

/**
 *  Draw frog eyes 
 */
function drawFrogEyes(x, y) {
    push();
    noStroke();
    fill("#ffffffff");
    ellipse(x, y, frog.eyes.size);
    pop();
}

function drawFrogIris(x, y) {
    push();
    noStroke();
    fill("#000000ff");
    ellipse(x, y, frog.iris.size);
    pop();
}
/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(fly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Add to frog's hunger meter
        //frog.hunger.value += fly.size * 2
        frog.hunger.value += fly.points;
        if (fly.name === 0) {
            frog.hunger.frozenTimer += 120 //5 seconds
            freezeHungerMeter();
        }
        frog.hunger.value = constrain(frog.hunger.value, frog.hunger.min, frog.hunger.max);
        // Reset the fly
        resetFly(fly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function checkTongueMenuOverlap() {
    if (gameStart) {
        return;
    }
    // Get distance from tongue to fly
    const dMenuStartX = abs(frog.tongue.x - gameMenus.start.x);
    const dMenuStartY = abs(frog.tongue.y - gameMenus.start.y);
    // Check if it's an overlap
    const start = (dMenuStartX < frog.tongue.size / 2 + gameMenus.width);
    const start2 = (dMenuStartY < frog.tongue.size / 2 + gameMenus.height / 2);
    console.log(start);
    if (start && start2) {
        frog.tongue.state = "inbound";
        gameStart = true;
    }
}
/**
 * Draws the Hunger Meter
 */
function hungerMeter() {
    // Hunger meter background
    push();
    strokeWeight(5);
    fill("#838282ff");
    rect(frog.hunger.x, frog.hunger.y, frog.hunger.max, 30, 8);
    pop();
    // Actual Hunger meter
    push();
    noStroke();
    fill("#4bb71cff");
    rect(frog.hunger.x + 2.5, frog.hunger.y + 2.5, frog.hunger.value, 25, 8);
    pop();
}

/**
 * Reduces the Hunger Meter
 */
function reduceHungerMeter() {
    if (!gameStart || frog.hunger.frozen === true) {
        return;
    }
    if (frog.hunger.value > frog.hunger.min) {
        frog.hunger.value -= frog.hunger.reduction
    };
    if (frog.hunger.value <= frog.hunger.min) {
        gameFailed = true;
    };
}

function freezeHungerMeter() {
    if (frog.hunger.frozen === false) {
        frog.hunger.frozen = true;
    }
}
function frozenHungerTimer() {
    console.log(frog.hunger.frozenTimer);
    if (frog.hunger.frozen === true) {
        frog.hunger.frozenTimer -= 1;

    };
    if (frog.hunger.frozenTimer <= 0) {
        frog.hunger.frozen = false;
        frog.hunger.frozenTimer = 0;
    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
    if (gameFailed) {
        const dMenuRetryX = abs(mouseX - gameMenus.retry.x);
        const dMenuRetryY = abs(mouseY - gameMenus.retry.y);
        // Check if it's an overlap
        const retry = (dMenuRetryX < gameMenus.width);
        const retry2 = (dMenuRetryY < gameMenus.height / 2);

        if (retry && retry2) {
            gameStart = false;
            gameFailed = false;
        }
    }
}

/**
 * Draw and display Menu options on startscreen
 */
function drawMenus(globalMenu, button) {
    // Start Button
    push();
    noStroke();
    fill(globalMenu.color);
    rect(button.x, button.y, globalMenu.width, globalMenu.height, globalMenu.roundness);

    //Style text
    fill(globalMenu.textColor);
    textFont(fontMenus);
    textAlign(CENTER);
    textSize(45);

    // Display the rounded number.
    text(button.name, button.x + 90, button.y + 58);

    pop();
}
