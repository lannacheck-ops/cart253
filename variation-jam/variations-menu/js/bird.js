let bird = {
    x: 100,
    y: 200,
    radius: 20,
    velocity: 0,
    gravity: 0.6,
    lift: -10
};
birdInitialX = 100;
birdInitialY = 200;
function moveBird() {
    if (!gameStart) {
        return;
    }
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
}

function drawBird() {
    push();
    noStroke();
    fill(255, 255, 0);
    circle(bird.x, bird.y, bird.radius * 2);
    pop();
}