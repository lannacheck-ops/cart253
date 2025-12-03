/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuOption = [
    {
        menuName: "Tutorial",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "tutorial",
        color: 0
    },
    {
        menuName: "Flappy Bird",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "flappyBird-variation",
        color: 255
    },
    {
        menuName: "Flappy Bird Post",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "flappyBirdPost-variation",
        color: 255
    },
    {
        menuName: "Flappy Bird Boss",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "flappyBirdBoss-variation",
        color: 255
    }

];

let menuTitle = {
    x: 250,
    y: 100,
    size: 50,
    color: "#fff024ff",
    color2: "#ff2e2eff",
    wrapper: 200,
    name: "Flappy Bird",
    name2: "EXTRAS!"
}

/**
 * Display the main menu
 */
function menuDraw() {
    // Sets the max amount of bird in the array
    pipeMax = 3;
    // Reset the score
    score = 0;
    pipeGap = 140;
    pipeSpeed = 3;
    background("#65c5f8ff");
    if (pipes.length <= 0) {
        for (i = 0; i < pipeMax; i++) {
            pipes.push(createPipes(i));
        }
    }
    for (let pipe of pipes) {
        drawPipe(pipe);
        movePipe(pipe);
    }
    for (let option of menuOption) {
        checkOptionOverlap(option);
        menuOptionDraw(option);

    };
    drawTitle();
    moveTitle();

}
/**
 * Display main menu text
 */
function menuOptionDraw(option) {
    option.y = (menuOption.indexOf(option) * 50) + height / 1.8;
    option.x = width / 2;
    push();
    fill(option.color);
    textFont(pixelFont);
    textSize(option.size);
    textAlign(CENTER, CENTER);
    text(option.menuName, option.x, option.y);
    pop();
}

/**
 * Check mouse overlap over the menu text and display a transparent box around the text if there is an overlap
 */
function checkOptionOverlap(option) {
    const d = abs(option.y - mouseY);
    if (d < option.size - 10 && mouseX > 0 && mouseX < width) {
        option.overlap = true;
        push();
        fill(0, 80);
        noStroke();
        rect(0, option.y - option.size / 1.8, width, option.size * 1.5);
        pop();
    }
    else {
        option.overlap = false;
    }
}

function drawTitle() {
    push();
    fill(255, 150);
    noStroke();
    rect(0, menuTitle.y - menuTitle.size / 1.6, width, menuTitle.size * 3);
    pop();
    push();
    fill(menuTitle.color);
    stroke(0);
    strokeWeight(5);
    textFont(pixelFont);
    textSize(menuTitle.size);
    textAlign(CENTER, CENTER);
    text(menuTitle.name, menuTitle.x, menuTitle.y);
    fill(menuTitle.color2);
    text(menuTitle.name2, menuTitle.x, menuTitle.y + 70);
    pop();
}

function moveTitle() {

}
/**
 * Listen to the keyboard
 */
// function menuKeyPressed(event) {
//     switch (event.keyCode) {
//         case 82:
//             state = "red-variation";
//             redSetup();
//             break;

//         case 71:
//             state = "green-variation";
//             greenSetup();
//             break;

//         case 66:
//             state = "blue-variation";
//             blueSetup();
//             break;
//     }
// }

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    for (let option of menuOption) {
        if (option.overlap === true) {
            state = option.state;
            jumpSfx.play();
        }
    }
    switch (state) {
        case "flappyBird-variation":
            flappyBirdSetup();
            break
        case "flappyBirdPost-variation":
            flappyBirdPostSetup();
            break;
        case "flappyBirdBoss-variation":
            flappyBirdBossSetup();
            break;
        case "tutorial":
            tutorialSetup();
            break;
    }
}