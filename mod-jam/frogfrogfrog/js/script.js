/**
 * Hungry Hungry Froggy
 * Lanna Check
 * 
 * A game of catching flies with your frog-tongue to avoid dying of hunger
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch different types of flies 
 * - Catch potions to gain abilities to help catch flies
 * - Don't die of hunger, keep eating flies
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
        size: 150,
        color: "#00ff00"
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        maxy: 100,
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
        color: "#ff0000"
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
        },
        colors: [0, 200],
        fill: 0
    },

    // The frog's hunger
    hunger: {
        x: 100,
        y: 40,
        max: 500,
        min: 0,
        value: 495,
        timer: 10,
        reduction: 0.3,
        frozen: false,
        frozenTimer: 0,

    },

    hungerIcon: {
        x: 50,
        y: 55,
        size: 40,
        eyes: {
            size: 17,
            leftX: 40,
            Y: 40,
            rightX: 60,
            irisSize: 10
        },
        mouth: {
            x: 42,
            y: 55,
            size: 15,
            btmRadius: 20,
            topRadius: 0
        }
    },

};

// Potion 
let potion = {
    color: "#a24bc9",
    bottle: {
        x: -50,
        y: -50,
        color: "#ffffff8f",
        size: 35,
        radius: 5
    },
    inventory: 0,
    active: false,
    timer: 7000, // 7 seconds in millisecond
    onScreen: false,
    onScreenTimer: 120, // 2 Seconds in frames per second
    activeTimer: 300 // 5 seconds in frames per second
};

// The Mouse position constrained by the canvas size
let mousePosX = undefined;
let mousePosY = undefined;

// Game Start Boolean
let gameStart = false;
let gameRules = false;

let rules = ["Press P to activate the potion", "Potions increase your tongue size for 5 seconds", "Blue flies increase your health and freeze your hunger for 2 seconds",
    "Yellow flies are poisonous, they will decrease your health",
    "Black flies increase your fullness"
]
// Game Start Boolean
let gameFailed = false;
let gameBegin = false;

// Game Menu Position and Size
const gameMenus = {
    width: 180,
    height: 80,
    roundness: 5,
    color: "#8B4611",
    textColor: "#ffffffff",
    start: {
        x: 120,
        y: 220,
        name: "START"
    },
    rules: {
        x: 340,
        y: 220,
        name: "RULES"
    },
    retry: {
        x: 220,
        y: 190,
        name: "RETRY?",
        width: 180,
        height: 80,
    },
    esc: {
        x: 520,
        y: 420,
        width: 80,
        height: 40,
        radius: 10,
        outline: 10
    },
    begin: {
        box: {
            x: 210,
            y: 150,
            size: 200
        },
        x: 250,
        y: 300,
        name: "BEGIN",
        width: 120,
        height: 40,
    }
};

let title = {
    x: 30,
    y: 80,
    wrapX: 600,
    wrapY: 180,
    strokeColor: "#ffffffff",
    color: "#00ff00"
}
// Fly array
let flies = [];
// Maximum number of flies on the screen
let fliesMax = 4;
// Tutorial fly
let tutorialFly = {
    x: 320,
    y: 150,
    D: 200,
    A: 15,
    size: 15,
    speed: 0,
    sinCount: 1,
    types: ["freeze", "poison", "regular"],
    name: 2,
    points: undefined,
    color: ["#0748DE", "#9C930E", "#000000"],
    // Wings
    wingEndX: 400,
    wingTimer: 0,
    index: 4,
    boxX: 100,
    boxY: 180,
    boxSize: 180
}


// Fonts
let fontMenus;
let fontTitle;

// Images 
let imgMouse;
let imgMouseClicked;

// An array of the mouse Images
let mouseImages = [];
let mouseImgIndex = 0;
let mouseImgTimer = 0;

/**
 *  Preload fonts and images
 */

function preload() {
    fontMenus = loadFont('/frogfrogfrog/assets/fonts/LuckiestGuy.ttf');
    fontTitle = loadFont('/frogfrogfrog/assets/fonts/BouncyBalloons.ttf')
    imgMouse = loadImage('/frogfrogfrog/assets/images/mouse.png');
    imgMouseClicked = loadImage('/frogfrogfrog/assets/images/mouseClicked.png');
}
/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    setInterval(reduceHungerMeter, frog.hunger.timer);
    setInterval(resetPotion, potion.timer);
    mouseImages = [imgMouse, imgMouseClicked];
    // Creates 3 flies in the flies array
    for (let i = 0; i < fliesMax; i++) {
        flies.push(createFly());
    }
}

/**
 * Draws different elements on the screen depending on the if the player started the game, lost the game or following the rules of the game
 */
function draw() {
    background("#87ceeb");


    // Draws the start screen of the game
    if (!gameStart && !gameRules) {
        cursor(ARROW);

        tutorialFly.index = 4;
        tutorialFly.x = 320;
        tutorialFly.name = 2;
        // Resets the fly position when the game hasn't started yet
        for (let fly of flies) {
            resetFly(fly);
        }
        potion.onScreen = false;
        potion.active = false;
        potion.inventory = 0;
        frog.iris.fill = frog.iris.colors[0];
        frog.hunger.value = 495;
        frog.hungerIcon.mouth.btmRadius = 20;
        frog.hungerIcon.mouth.topRadius = 0;
        potion.inventory = 0;
        drawMenus(gameMenus, gameMenus.start);
        drawMenus(gameMenus, gameMenus.rules);
        drawTitle();
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
        checkTongueMenuOverlap(gameMenus, gameMenus.start);
        checkTongueMenuOverlap(gameMenus, gameMenus.rules);
    }

    // Draws the rules screen of the game
    if (!gameStart && gameRules) {
        frog.body.x = width / 2;
        drawPotion();
        checkTonguePotionOverlap();
        potion.bottle.x = 300;
        potion.bottle.y = 140;
        potionActiveTimer();
        moveFlyWings(tutorialFly);
        moveFly(tutorialFly);
        drawFly(tutorialFly);
        animateMouse();
        drawTutorial();
        moveFrogEyes();
        moveFrogIris();
        adjustMousePosition();
        moveTongue();
        drawFrog();
        drawFrogEyes(frog.eyes.left.x, frog.eyes.left.y);
        drawFrogEyes(frog.eyes.right.x, frog.eyes.right.y);
        drawFrogIris(frog.iris.left.x, frog.iris.left.y);
        drawFrogIris(frog.iris.right.x, frog.iris.right.y);
        checkTongueFlyOverlap(tutorialFly);
        hungerMeter();
        frozenHungerTimer();
        checkMouseOverlap(gameMenus.esc);

    }
    // Draws the game with a text box of the goal right before the game begins
    if (!gameBegin && gameStart && !gameFailed) {
        drawGameBeginText(gameMenus, gameMenus.begin);
        for (let fly of flies) {
            moveFlyWings(fly);
            drawFly(fly);
        }
        moveTongue();
        moveFrogIris();
        drawFrog();
        drawFrogEyes(frog.eyes.left.x, frog.eyes.left.y);
        drawFrogEyes(frog.eyes.right.x, frog.eyes.right.y);
        drawFrogIris(frog.iris.left.x, frog.iris.left.y);
        drawFrogIris(frog.iris.right.x, frog.iris.right.y);
        checkMouseOverlap(gameMenus.begin);
        hungerMeter();
    }

    // Draws the game
    if (gameBegin && gameStart && !gameFailed) {
        drawPotion();
        potionOnScreenTimer();
        for (let fly of flies) {
            moveFlyWings(fly);
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
        checkTonguePotionOverlap();
        potionActiveTimer();
        hungerMeter();
        frozenHungerTimer();
    }
    // Draws the game screen when the frog dies
    if (gameStart && gameFailed) {
        for (let fly of flies) {
            drawFly(fly);
        }
        adjustMousePosition();
        drawFrog();
        drawFrogEyes(frog.eyes.left.x, frog.eyes.left.y);
        drawFrogEyes(frog.eyes.right.x, frog.eyes.right.y);
        drawFrogIris(frog.iris.left.x, frog.iris.left.y);
        drawFrogIris(frog.iris.right.x, frog.iris.right.y);
        drawMenus(gameMenus, gameMenus.retry); checkMouseOverlap(gameMenus.retry);
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    // Draw Wings
    push();
    stroke("#ffffffaa");
    strokeWeight(fly.size / 2.3);
    line(fly.x + 2, fly.y + fly.size / 4, fly.wingEndX, fly.y - 10);
    pop();
    // Draw Fly
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

function moveFlyWings(fly) {
    fly.wingTimer += 1;
    // Restores the timer to 0 after 8 frames
    if (fly.wingTimer > 8) {
        fly.wingTimer = 0
    }
    // The fly's wing moves every 4 frames
    if (fly.wingTimer === 4) {
        fly.wingEndX = fly.x + fly.size / 3
    }
    if (fly.wingTimer === 8) {
        fly.wingEndX = fly.x - fly.size / 3
    }
}
/**
 * Creates flies with random parameters
 */
function createFly() {
    let newfly = {
        x: random(-50, -10),
        y: random(100, 200), // Will be random
        D: random(120, 400),
        A: random(10, 30),
        size: random(10, 20),
        speed: random(3, 5),
        sinCount: 1,
        types: ["freeze", "poison", "regular"],
        typeRandomizer: [0, 0, 1, 1, 1, 2, 2, 2, 2, 2],
        name: round(random(0, 2)),
        points: undefined,
        color: ["#0748DE", "#9C930E", "#000000"],
        // Wings
        wingEndX: random(-50, -10),
        wingTimer: 0
    };
    return newfly;
}
/**
 * Resets the flies parameters and when on the tutorial screen change the fly type based on the previous fly's name
 */
function resetFly(fly) {
    if (gameStart) {
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
        // Wings
        fly.wingEndX = fly.x;
        fly.wingTimer = 0;
    }

    if (!gameStart) {
        fly.y = 150;
        if (fly.index === 4) {
            fly.name = 1;
            fly.index = 3;
        }
        else if (fly.index === 3) {
            fly.name = 0;
            fly.index = 2;
        }
        else if (fly.index === 2) {
            fly.index = 1;
            potion.onScreen = true;
            fly.x = -50;
            fly.wingEndX = fly.x;
        }

        if (fly.index > 1) {
            fly.x = 320;
            fly.wingEndX = fly.x;
            //fly.wingTimer = 0;
        }
    }
}


/**
 * Draws and displays the potion bottle
 */
function drawPotion() {
    if (!potion.onScreen) {
        return;
    }
    // Bottle
    push();
    noStroke();
    fill(potion.bottle.color);
    square(potion.bottle.x, potion.bottle.y, potion.bottle.size, potion.bottle.radius);
    pop();

    // Liquid
    push();
    noStroke();
    fill(potion.color);
    rect(potion.bottle.x + 1, potion.bottle.y + 17, potion.bottle.size - 2, 15, potion.bottle.radius);
    pop();

    // Tube
    push();
    noStroke();
    fill(potion.bottle.color);
    rect(potion.bottle.x + 12.5, potion.bottle.y - 10, 10, 15, 2);
    pop();
}
/** 
 * Reset the potion's position and randomize the timer 
 */
function resetPotion() {
    if (potion.active || potion.inventory === 1 || !gameStart || gameFailed || potion.onScreen || !gameBegin) {
        return;
    }
    potion.bottle.x = random(50, 550);
    potion.bottle.y = random(140, 350);
    potion.timer = random(7000, 9000);
    potion.onScreen = true;
}
/**
 * Make the potion disappear from the screen after 2 seconds 
 */
function potionOnScreenTimer() {
    console.log(potion.onScreen, potion.onScreenTimer, potion.inventory)
    if (!potion.onScreen) {
        potion.onScreenTimer = 120;
        return;
    }
    if (potion.onScreen && potion.inventory === 1) {
        potion.onScreenTimer = 120;
        return;
    }
    if (potion.onScreenTimer > 0) {
        potion.onScreenTimer -= 1;
    }
    if (potion.onScreenTimer <= 0) {
        potion.timer = random(7000, 9000);
        potion.onScreenTimer = 120;
        potion.onScreen = false;
    }
}
/**
 * Deactivates the potion's effects after 5 seconds
 */
function potionActiveTimer() {
    // Set the potion's position next to the frog when the potion is in the frog's inventory
    if (potion.inventory === 1) {
        potion.bottle.x = frog.body.x + frog.body.size / 2 + potion.bottle.size / 3;
        potion.bottle.y = 440;
    }
    // Potion timer countdown starts
    if (potion.active && potion.activeTimer > 0) {
        potion.activeTimer -= 1
    }
    // Potion deactivates when the timer runs out
    if (potion.active && potion.activeTimer <= 0) {
        potion.inventory = 0;
        potion.active = false;
        potion.onScreen = false;
        potion.activeTimer = 300; // Resets the timer to 5 seconds
        if (tutorialFly.index === 0) {
            tutorialFly.index = 4;
            tutorialFly.name = 2;
            tutorialFly.x = 320;
        }

    }
    if (potion.active) {
        // Lerps the frog's body color from purple to green based on the amount of time left for the potion's effects to stay active
        let frogColor = color(0, 255, 0);
        let potionColor = color(162, 75, 201);
        let amt = map(potion.activeTimer, 0, 300, 0, 1)
        frog.body.color = lerpColor(frogColor, potionColor, amt);
        // Sets the frog's tongue size to 40
        frog.tongue.size = 40;

    }
    // Reset the frog's parameters when the potion deactivates
    else {
        frog.body.color = "#00ff00";
        frog.tongue.size = 20;
    }
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
 * Move frog's iris' to the mouse position on the canvas
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
    if (potion.active) {
        frog.tongue.speed = 20;
        frog.tongue.maxy = 100;
    }
    else {
        frog.tongue.speed = frog.hunger.value / 24;

        // The maximum height of the frog's tongue appears lower on the screen the hungrier it gets
        frog.tongue.maxy = -0.7 * (frog.hunger.value - 495) + 100;
    }
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
    fill(frog.tongue.color);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke(frog.tongue.color);
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill(frog.body.color);
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

/**
 * Draw frog's iris
 */
function drawFrogIris(x, y) {
    push();
    noStroke();
    // Lerp the frog's eye color from black to gray depending on the frog's hunger value
    let blackFill = color(frog.iris.colors[0]);
    let grayFill = color(frog.iris.colors[1]);
    let amt = map(frog.hunger.value, 0, 495, 0, 1);
    frog.iris.fill = lerpColor(grayFill, blackFill, amt);
    fill(frog.iris.fill);
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
            frog.hunger.frozenTimer += 120 //2 seconds
            freezeHungerMeter();
        }
        frog.hunger.value = constrain(frog.hunger.value, frog.hunger.min, frog.hunger.max);
        // Reset the fly
        resetFly(fly);
        // Bring back the tongue
        frog.tongue.state = "inbound";

    }
}

/**
 * Checks if the tongue is overlapping the potion bottle
 */
function checkTonguePotionOverlap() {
    if (potion.onScreen) {
        // Get distance from tongue to the potion bottle
        const d = dist(frog.tongue.x, frog.tongue.y, potion.bottle.x + potion.bottle.size / 2, potion.bottle.y + potion.bottle.size / 2);
        // Check if it's an overlap
        const eaten = (d < frog.tongue.size / 2 + potion.bottle.size / 2);
        if (eaten) {
            // Set the potion inventory to 1
            potion.inventory = 1;
            if (tutorialFly.index === 1) {
                tutorialFly.index = 0;
            }
            // Bring back the tongue
            frog.tongue.state = "inbound";

        }
    }
}

/**
 * Checks if the tongue is overlapping the menu buttons
 */
function checkTongueMenuOverlap(globalMenu, button) {
    if (gameStart) {
        return;
    }
    // Get distance from tongue to fly
    const dMenuStartX = abs(frog.tongue.x - button.x);
    const dMenuStartY = abs(frog.tongue.y - button.y);
    // Check if it's an overlap
    const overlapX = (dMenuStartX < frog.tongue.size / 2 + globalMenu.width);
    const overlapY = (dMenuStartY < frog.tongue.size / 2 + globalMenu.height / 2);
    if (overlapX && overlapY) {
        frog.tongue.state = "inbound";
        if (button.name === "START") {
            gameStart = true;
        }
        if (button.name === "RULES") {
            gameRules = true;
        }
    }
}

/**
 * Draws the Hunger Meter
 */
function hungerMeter() {
    //Top Margin
    push();
    noStroke();
    fill("#e6f859ff");
    rect(0, 0, width, height / 5);
    pop();
    // Hunger meter background
    push();
    strokeWeight(5);
    fill("#838282ff");
    rect(frog.hunger.x, frog.hunger.y, frog.hunger.max, 30, 8);
    pop();
    // Actual Hunger meter
    push();
    noStroke();
    fill("#3bbd04ff");
    rect(frog.hunger.x + 2.5, frog.hunger.y + 2.5, frog.hunger.value, 25, 8);
    pop();
    // Hunger meter icon
    // Body
    push();
    noStroke();
    fill("#4bb71cff");
    ellipse(frog.hungerIcon.x, frog.hungerIcon.y, frog.hungerIcon.size);
    pop();
    //Eyes
    //Left Eye
    push();
    stroke("#4bb71cff");
    fill("#ffffffff");
    ellipse(frog.hungerIcon.eyes.leftX, frog.hungerIcon.eyes.Y, frog.hungerIcon.eyes.size);
    pop();
    //Right Eye
    push();
    stroke("#4bb71cff");
    fill("#ffffffff");
    ellipse(frog.hungerIcon.eyes.rightX, frog.hungerIcon.eyes.Y, frog.hungerIcon.eyes.size);
    pop();
    // Left Iris
    push();
    stroke(0)
    strokeWeight(frog.hungerIcon.eyes.irisSize)
    point(frog.hungerIcon.eyes.leftX, frog.hungerIcon.eyes.Y);
    pop();
    // Right Iris
    push();
    stroke(0)
    strokeWeight(frog.hungerIcon.eyes.irisSize)
    point(frog.hungerIcon.eyes.rightX, frog.hungerIcon.eyes.Y);
    pop();
    // Mouth
    push();
    noStroke();
    fill("#ff0000");
    square(frog.hungerIcon.mouth.x, frog.hungerIcon.mouth.y, frog.hungerIcon.mouth.size, frog.hungerIcon.mouth.topRadius, frog.hungerIcon.mouth.topRadius, frog.hungerIcon.mouth.btmRadius, frog.hungerIcon.mouth.btmRadius);
    pop();
}

/**
 * Reduces the Hunger Meter and checks if the player fails the game
 */
function reduceHungerMeter() {
    if (!gameStart || frog.hunger.frozen === true || !gameBegin) {
        return;
    }
    if (frog.hunger.value > frog.hunger.min) {
        frog.hunger.value -= frog.hunger.reduction
    };
    // When the hunger meter runs out the frog dies and the game ends
    if (frog.hunger.value <= frog.hunger.min) {
        gameFailed = true;
        frog.iris.fill = frog.iris.colors[1];
    };
    if (frog.hunger.value <= 200) {
        frog.hungerIcon.mouth.btmRadius = 0
        frog.hungerIcon.mouth.topRadius = 20
    }
    if (frog.hunger.value > 200) {
        frog.hungerIcon.mouth.btmRadius = 20
        frog.hungerIcon.mouth.topRadius = 0
    }
}

/**
 * Freezes the hunger meter (stops it from reducing)
 */
function freezeHungerMeter() {
    if (frog.hunger.frozen === false) {
        frog.hunger.frozen = true;
    }
}

/**
 * Unfreezes the hunger meter when the timer runs out
 */
function frozenHungerTimer() {
    if (frog.hunger.frozen === true) {
        frog.hunger.frozenTimer -= 1;

    };
    if (frog.hunger.frozenTimer <= 0) {
        frog.hunger.frozen = false;
        frog.hunger.frozenTimer = 0;
    }
}


/**
 * Launch the tongue on click (if it's not launched yet) and handles clicking on menu buttons
 */
function mousePressed() {
    if (!gameFailed) {
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";
        }
    }
    // When the mouse is pressed when overlapping the retry button the game restarts
    if (gameFailed) {
        if (mouseX > gameMenus.retry.x && mouseX < gameMenus.width + gameMenus.retry.x && mouseY > gameMenus.retry.y && mouseY < gameMenus.retry.y + gameMenus.height) {
            gameStart = false;
            gameFailed = false;
            frog.tongue.state = "idle"
        }
    }
    // When the mouse is pressed when overlapping the esc button the player returns to the start screen
    if (gameRules) {
        if (mouseX > gameMenus.esc.x && mouseX < gameMenus.esc.width + gameMenus.esc.x && mouseY > gameMenus.esc.y && mouseY < gameMenus.esc.y + gameMenus.esc.height) {
            gameRules = false;
            frog.tongue.state = "idle"
        }
    }

    // When the mouse is pressed when overlapping the begin button the player starts the game
    if (!gameBegin && gameStart) {
        if (mouseX > gameMenus.begin.x && mouseX < gameMenus.begin.width + gameMenus.begin.x && mouseY > gameMenus.begin.y && mouseY < gameMenus.begin.y + gameMenus.begin.height) {
            cursor(ARROW);
            gameBegin = true;
            frog.tongue.state = "idle"
        }
    }
}

/**
 * Check mouse overlap on menu buttons to change the cursor
 */
function checkMouseOverlap(button) {
    let mouseOverlap;

    if (mouseX > button.x && mouseX < button.width + button.x && mouseY > button.y && mouseY < button.y + button.height) {
        mouseOverlap = true;
    }
    else {
        mouseOverlap = false;
    }

    if (mouseOverlap) {
        cursor(HAND);
    }
    else {
        cursor(ARROW);
    }
}
/**
 * Draw and display Menu options on startscreen
 */
function drawMenus(globalMenu, button) {
    // Buttons
    push();
    noStroke();
    fill(globalMenu.color);
    rect(button.x, button.y, globalMenu.width, globalMenu.height, globalMenu.roundness);

    // Style text
    fill(globalMenu.textColor);
    textFont(fontMenus);
    textAlign(CENTER);
    textSize(45);

    // Display the text
    text(button.name, button.x + 90, button.y + 58);

    pop();
}

/**
 * Draw and display the game title
 */
function drawTitle() {
    push();
    stroke(title.strokeColor);
    strokeWeight(8);
    fill(title.color);
    textFont(fontTitle);
    textAlign(CENTER);
    textSize(45);
    textWrap(WORD);
    text("HUNGRY HUNGRY FROGGY", title.x, title.y, title.wrapX, title.wrapY);
    pop();
}

/** 
* Draw and display the Tutorial Screen
*/
function drawTutorial() {
    // Draws dialog box
    push();
    stroke(0);
    strokeWeight(4);
    fill(255);
    square(tutorialFly.boxX, tutorialFly.boxY, tutorialFly.boxSize, 10);
    pop();

    // Draws text
    push();
    fill(0);
    // Styles the text
    textFont(fontMenus);
    textAlign(CENTER);
    textSize(round(tutorialFly.boxSize / 9));
    textWrap(WORD);
    // Display the text based on the tutoria fly index
    text(rules[tutorialFly.index], tutorialFly.boxX, tutorialFly.boxY + tutorialFly.boxSize / 4.6, tutorialFly.boxSize);
    // Sets the tutorial index to the fly's name
    //tutorialFly.index = tutorialFly.name;
    pop();

    // Draws the mouse image
    push();
    image(mouseImages[mouseImgIndex], 200, 400, 60, 72);
    pop();

    // Draw exit button
    push();
    stroke("#969696ff");
    strokeWeight(6);
    fill("#ffffffff");
    rect(gameMenus.esc.x, gameMenus.esc.y, gameMenus.esc.width, gameMenus.esc.height, gameMenus.esc.radius);
    pop();

    // Display the exit text
    push();
    fill(0);
    textFont(fontMenus);
    textAlign(CENTER);
    textSize(35);


    text("ESC", gameMenus.esc.x + 40, gameMenus.esc.y + 32);
    pop();
}
/**
 * Animates the mouse image on the tutorial screen
 */
function animateMouse() {
    mouseImgTimer += 1;
    // Restores the timer to 0 after 8 frames
    if (mouseImgTimer > 40) {
        mouseImgTimer = 0
    }
    // The mouse image changes every 4 frames
    if (mouseImgTimer === 20) {
        mouseImgIndex = 1
    }
    if (mouseImgTimer === 40) {
        mouseImgIndex = 0
    }
}

/**
 * Checks for the keys that are pressed
 * "Esc" to leave the rules screen
 * "P" to activate the potion
 */
function keyPressed(event) {
    // The leaves the rules screen when "Esc" is pressed
    if (event.keyCode === 27 && gameRules) {
        gameRules = false;
    }
    // The potion activates when letter P is pressed
    if (potion.inventory === 1 && event.keyCode === 80 && !potion.active) {
        potion.active = true;
    }

}

/**
 * Draws the dialog box that explains the goal of the game right before the game starts.
 * Also draws the begin menu button
 */
function drawGameBeginText(globalMenu, button) {
    // Draws dialog box
    push();
    stroke(0);
    strokeWeight(4);
    fill(255);
    square(button.box.x, button.box.y, button.box.size, 10);
    pop();

    // Draws text
    push();
    fill(0);
    // Styles the text
    textFont(fontMenus);
    textAlign(CENTER);
    textSize(round(button.box.size / 8.5));
    textWrap(WORD);
    // Display the text
    text("Eat as many flies as you can before you die from hunger", button.box.x, button.box.y + button.box.size / 4.6, button.box.size);
    pop();


    // Start Button
    push();
    noStroke();
    fill(globalMenu.color);
    rect(button.x, button.y, button.width, button.height, globalMenu.roundness);

    //Style text
    fill(globalMenu.textColor);
    textFont(fontMenus);
    textAlign(CENTER);
    textSize(30);

    // Display the text
    text(button.name, button.x + 59, button.y + 30);

    pop();
}