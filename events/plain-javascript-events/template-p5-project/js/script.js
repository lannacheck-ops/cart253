/**
 * Plain JavaScript Events
 * Lanna Check
 * 
 * Experimenting with event handling in Plain JavaScript
 */

"use strict";

const bg = {
    fill: "#000000",
    fills: {
        black: "#000000",
        white: "#ffffff"
    },
    switchKey: 32 //spacebar
};

/**
 * Creates canvas
*/
function setup() {
    createCanvas(400, 400);

    // Listen for key presses
    window.addEventListener("keydown", changeBG);
}


/**
 * Displays background
*/
function draw() {
    background(bg.fill);
}
/**
 * Switches the background from black to white
 */
function changeBG(event) {
    if (event.keyCode === bg.switchKey) {
        if (bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white
        }
        else {
            bg.fill = bg.fills.black;
        }
    }
}

// "mousedown" "mouseup" "mouseenter" "mouseleave" "dbclick" "keydown" "keyup"