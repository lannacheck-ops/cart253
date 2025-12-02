let birdBoss = {
    color: "#08be3cff",
    x: cnv.width + cnv.height / 4,
    y: cnv.height / 2,
    size: cnv.height * 1.2,
    velocity: 0,
    eye: {
        color: 255,
        width: cnv.height - cnv.height / 1.3,
        height: cnv.height - cnv.height / 1.5,
        iris: {
            color: 0,
            x: undefined,
            y: undefined,
            size: cnv.height / 6
        }
    },
    mouth: {
        color: "#ff4d47ff",
        width: cnv.height - cnv.height / 1.3,
        height: cnv.height - cnv.height / 1.1
    }
};

function drawBirdBoss() {
    console.log(cnv.height / 2);
    // Body
    push();
    noStroke();
    fill(birdBoss.color);
    circle(birdBoss.x, birdBoss.y, birdBoss.size);
    pop();

    // Eye
    push();
    noStroke();
    fill(birdBoss.eye.color);
    ellipse(birdBoss.x - birdBoss.size / 3, birdBoss.y - birdBoss.size / 6, birdBoss.eye.width, birdBoss.eye.height);
    pop();

    // Iris
    push();
    stroke(birdBoss.eye.iris.color);
    strokeWeight(birdBoss.eye.iris.size);
    point(birdBoss.x - birdBoss.size / 2.7, birdBoss.y - birdBoss.size / 6)
    pop();

    // Mouth
    push();
    noStroke();
    fill(birdBoss.mouth.color);
    ellipse(birdBoss.x - birdBoss.size / 3, birdBoss.y + birdBoss.size / 6, birdBoss.mouth.width, birdBoss.mouth.height);
    pop();
}