let bird = {
    angle: 0,
    color: "#fff024ff",
    x: 100,
    y: 200,
    size: 20,
    velocity: 0,
    gravity: 0.6,
    lift: -10,
    eye: {
        color: 255,
        width: 15,
        height: 18,
        iris: {
            color: 0,
            x: undefined,
            y: undefined,
            size: 10
        }
    },
    wing: {
        color: "#f9f9ebff",
        width: 23,
        height: 18
    },
    escape: false
};
birdInitialX = 100;
birdInitialY = 200;
function moveBird() {
    if (!gameStart || gameFailed) {
        return;
    }
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    bird.angle += 1;
    bird.angle = constrain(bird.angle, -30, 90);
}

function drawBird() {
    // Body
    push();
    noStroke();
    fill(bird.color);
    circle(0, 0, bird.size * 2);
    pop();

    // Eye
    push();
    noStroke();
    fill(bird.eye.color);
    ellipse(bird.size / 1.5, -bird.size / 4, bird.eye.width, bird.eye.height);
    pop();

    // Iris
    push();
    stroke(bird.eye.iris.color);
    strokeWeight(bird.eye.iris.size);
    point(bird.size / 1.3, -bird.size / 4)
    pop();

    // Wing
    push();
    // Roates the bird wing up
    translate(-bird.size / 2, 0);
    rotate(10 + bird.angle);
    noStroke();
    fill(bird.wing.color);
    ellipse(0, 0, bird.wing.width, bird.wing.height);
    pop();
}