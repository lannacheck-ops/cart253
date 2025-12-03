/**
 * Contains the code to draw the game descriptions before each variation starts
 */

// Description variable
let description = {
    // Description box
    box: {
        x: undefined,
        y: undefined,
        size: 200
    },
    // Description text based on the variation state
    txt: {
        flappy: "Avoid the green pipes to earn points !",
        post: "Deliver letters to other birds! Don't crash into them tho.",
        boss: "Avoid getting lasered by the boss bird",
        continue: "Click to continue"
    }
}

/**
 * Draws the description text box
 */
function drawGameDescription() {
    description.box.x = width / 2 - description.box.size / 2
    description.box.y = height / 2 - description.box.size / 2
    if (!gameStart) {
        push();
        stroke(0);
        strokeWeight(3);
        fill(bird.color);
        rect(description.box.x, description.box.y, description.box.size, description.box.size, instructions.box.corner);
        pop();

        push();
        fill(0);
        stroke("#91ff55ff");
        strokeWeight(2);
        textFont(pixelFont);
        textSize(instructions.size);
        textWrap(WORD);
        textAlign(CENTER, CENTER);
        text(description.txt.continue, description.box.x + 5, description.box.y + instructions.size * 6, description.box.size - 10);
        pop();

        switch (state) {
            case "flappyBird-variation":
                push();
                fill(0);
                textFont(pixelFont);
                textSize(instructions.size);
                textWrap(WORD);
                textAlign(CENTER, CENTER);
                text(description.txt.flappy, description.box.x + 5, description.box.y + instructions.size * 2.5, description.box.size - 10);
                pop();
                break;
            case "flappyBirdPost-variation":
                push();
                fill(0);
                textFont(pixelFont);
                textSize(instructions.size);
                textWrap(WORD);
                textAlign(CENTER, CENTER);
                text(description.txt.post, description.box.x + 5, description.box.y + instructions.size * 2.4, description.box.size - 10);
                pop();
                break;
            case "flappyBirdBoss-variation":
                push();
                fill(0);
                textFont(pixelFont);
                textSize(instructions.size);
                textWrap(WORD);
                textAlign(CENTER, CENTER);
                text(description.txt.boss, description.box.x + 5, description.box.y + instructions.size * 2.5, description.box.size - 10);
                pop();
                break;
        }
    }
}
