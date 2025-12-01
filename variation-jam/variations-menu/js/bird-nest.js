let birdNest = [];
let birdNestMax = undefined;

function createBirdNest(i) {
    let newBirdNest = {
        color: "#a66917",
        x: i * 50 + width + 100,
        y: undefined,
        width: 80,
        height: 35,
        speed: 3,
        delivered: false,
        bird: {
            color: "#fff024ff",
            x: undefined,
            y: undefined,
            size: 45,
            eyes: {
                color: 255,
                width: 25,
                height: 22,
                y: undefined,
                leftX: undefined,
                rightX: undefined
            },
            iris: {
                color: 0,
                size: 10,
                y: undefined,
                leftX: undefined,
                rightX: undefined
            },
            wing: {
                y: undefined,
                leftX: undefined,
                rightX: undefined,
                width: 23,
                height: 18,
                leftAngle: 30,
                rightAngle: -30,
                color: "#f9f9ebff"
            }
        }
    }

    return newBirdNest;
}

function drawBirdNest(nest) {
    // Set Nest Y
    nest.y = height - nest.height / 4;
    // Bird
    // Set Bird Nest X and Y
    nest.bird.x = nest.x;
    nest.bird.y = nest.y - nest.bird.size / 2;
    push();
    noStroke();
    fill(nest.bird.color);
    circle(nest.bird.x, nest.bird.y, nest.bird.size);
    pop();

    // Nest
    push();
    noStroke();
    fill(nest.color);
    ellipse(nest.x, nest.y, nest.width, nest.height);
    pop();

    //Wings
    // Set the wing's x and y positions
    nest.bird.wing.leftX = nest.bird.x - 12;
    nest.bird.wing.rightX = nest.bird.x + 12;
    nest.bird.wing.y = nest.bird.y - 5;
    // Call the draw wings function
    drawBirdNestWings(nest.bird.wing.leftX, nest.bird.wing.y, nest.bird.wing, nest.bird.wing.leftAngle);
    drawBirdNestWings(nest.bird.wing.rightX, nest.bird.wing.y, nest.bird.wing, nest.bird.wing.rightAngle);

    //Eyes
    push();
    stroke(nest.bird.iris.color);
    strokeWeight(nest.bird.iris.size);
    point(nest.x, nest.bird.y - 15);
    pop();
}

function moveBirdNestWings(nest) {

}

function drawBirdNestWings(x, y, wing, wingAngle) {
    push();
    translate(x, y);
    rotate(wingAngle);
    noStroke();
    fill(wing.color);
    ellipse(0, 0, wing.width, wing.height);
    pop();
}

function moveBirdNest(nest) {
    nest.x -= nest.speed;
    const minX = random(-1000, -200);
    // Once the nest is outside the screen reset its parameters
    if (nest.x <= minX) {
        resetBirdNest(nest);
    }
}

function resetBirdNest(nest) {
    let index = pipes.indexOf(nest);

    nest.x = index * nest.width + width + 100;
    nest.speed = 3;
    nest.delivered = false;
}