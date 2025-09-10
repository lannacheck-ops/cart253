/**
 * Bear Drawing Practice
 * Lanna Check
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/** 
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
createCanvas(640, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
  background("#f6ee76ff");

  push();
  noStroke();
  fill("#705332ff");
  ellipse(320, 320, 400);
  ellipse(220, 160, 140);
  ellipse(420, 160, 140);
  pop();

  push();
  stroke(0);
  strokeWeight(40);
  point(250, 300);
  point(390, 300);
  pop();

  push();
  stroke(255);
  strokeWeight(10);
  point(250, 290);
  point(390, 290);
  pop();
}