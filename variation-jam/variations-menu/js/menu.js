/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuOption = [
    {
        menuName: "Flappy Bird",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "red-variation"
    },
    {
        menuName: "Flappy Bird Post",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "green-variation"
    },
    {
        menuName: "Flappy Bird Boss",
        x: undefined,
        y: undefined,
        size: 32,
        overlap: false,
        state: "blue-variation"
    }
];

/**
 * Display the main menu
 */
function menuDraw() {
    background(0);
    for (let option of menuOption) {
        menuOptionDraw(option);
        checkOptionOverlap(option);
    };


}
/**
 * Display main menu text
 */
function menuOptionDraw(option) {
    option.y = (menuOption.indexOf(option) * 50) + height / 2.4;
    option.x = width / 2;
    push();
    fill(255);
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
        fill(255, 80);
        noStroke();
        rect(0, option.y - option.size / 1.2, width, option.size * 1.5);
        pop();
    }
    else {
        option.overlap = false;
    }
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
        }
    }
}