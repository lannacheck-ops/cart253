/**
 * Cute Bear Drawing Practice
 * Lanna Check
 * 
 * Just a cute bear staring at the viewer :)
 */

"use strict";

/** 
 * Creates a canvas
*/
function setup() {
createCanvas(640, 640);
}


/**
 * Draws the face of a cute bear
*/
function draw() {
    // a yellow background
  background("#f6ee76ff");

  push();
  noStroke();
  fill("#705332ff");
  //The head of a brown bear
  ellipse(320, 320, 400);
  //The left ear of the bear
  ellipse(220, 160, 140);
  //The right ear of the bear
  ellipse(420, 160, 140);
  pop();

//The eyes
  push();
  stroke(0);
  strokeWeight(40);
  //left eye
  point(250, 300);
  //right eye
  point(390, 300);
  pop();

//Eye shine
  push();
  stroke(255);
  strokeWeight(10);
  //left eye shine
  point(250, 290);
  //right eye shine
  point(390, 290);
  pop();

  //The nose
  push();
  noStroke();
  fill(0);
  triangle(300, 350, 340, 350, 320, 370);
  pop();

//The mouth or lips
  push();
  stroke(0);
  strokeWeight(8);
  //left lip
  line(318, 368, 290, 400);
  //right lip
  line(321, 368, 349, 400);
  pop();
}