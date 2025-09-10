/**
 * Fearful look into the Past
 * Lanna Check
 * 
 * An art piece that represents the anxiety that a character 
 * faces as they look back into their past.
 */

"use strict";
/**
 * Creates the canvas of my piece
 */
function setup() {
createCanvas(640,480);
}


/**
 * Draws the character's face as their eye looks to the back
*/
function draw() {
    //yellowish background represents the face of the character
    background(227, 180, 100);
    //the dark area of the character's eye
    fill(0);
    rect(200, 200, 100, 80);
    //the white area of the character's eye
    fill(255);
    rect(200, 210, 65, 60);
    //the character's eyebrow
    strokeWeight(10)
    line(300, 100, 198, 130);
    
    
}