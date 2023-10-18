let clicked = false;
let shouldMilesFall = false;

// Butterfly Data
let butterflyX = 50;
let butterflyY = 300;
let offsetY = 300;
let butterflyScale = 0.5;
let butterflyLeft = -255; // leftmost point on unscaled butterfly
let butterflyRight = 115; // rightmost point
let butterflyTop = -145;
let butterflyBot = 100;

// Miles Data
let milesX = 300;
let milesY = 400;
let milesR = 0;

function setup() {
  // These lines are fitting our canvas
  // where we want in the DOM
  // so that we can manipulate its style
  // easier
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas-parent");
}

function draw() {
  background(220);
  drawBackground();
  drawButterfly(butterflyX, butterflyY, butterflyScale);
  drawMiles(milesX, milesY, milesR);
  if (clicked) {
    updateButterfly();
  }
  if (shouldMilesFall) {
    updateMiles();
  }

  // helper to see mouse location
  text("(" + mouseX + ", " + mouseY + ")", mouseX + 10, mouseY - 10);
}

// Background
function drawBackground() {
  background(230, 151, 151);
  fill(153, 22, 22, 100); // rust
  noStroke();
  triangle(0, 30, 400, 300, 0, 400);

  fill(107, 0, 230, 200); // dark purple
  triangle(-50, 200, 350, -150, 450, -170);
  triangle(20, 0, 400, 250, 400, 275);
}

// Creatures
function drawButterfly(x, y, s) {
  // butterfly
  push();
  translate(x, y);
  scale(s);

  // --------- BACK WING ----------
  fill(9, 40, 153);
  beginShape();
  curveVertex(-300, -90); // guide
  curveVertex(-250, -100); // left top bump
  curveVertex(-175, -95); // valley
  curveVertex(-90, -125); // top right
  //curveVertex(-50, -55);
  curveVertex(0, 0); // origin
  curveVertex(-100, 3); // bottom
  curveVertex(-250, -100); // left again
  curveVertex(-255, -200); // guide
  endShape();

  fill(34, 150, 230, 100); // purple
  ellipse(-100, -50, 80, 80);
  ellipse(-100, -50, 100, 100);

  // --------- FRONT WING ----------
  fill(34, 150, 230); // light blue
  stroke(14, 96, 153); // darker blue green
  //strokeWeight(10);
  beginShape();
  curveVertex(-75, -145); // guide
  curveVertex(0, -140); // careful which start point
  curveVertex(75, -145); // top right bump
  curveVertex(0, 0); // bottom point
  curveVertex(-75, -145); // left top bump
  curveVertex(0, -140); // valley
  curveVertex(75, -145); // guide
  endShape();

  fill(107, 0, 230, 100); // purple
  ellipse(0, -30, 30, 55);
  ellipse(0, -40, 40, 75);

  // --------- HEAD ----------
  push();
  translate(100, -35);
  rotate(PI / 3);
  fill(107, 0, 230, 100); // purple
  noStroke();
  // head
  ellipse(0, 0, 20, 40);
  ellipse(0, 0, 30, 50);
  stroke(107, 0, 230, 100);
  strokeWeight(10);
  line(0, 60, 0, 210);
  noStroke();
  // chest
  translate(0, 60);
  ellipse(0, 0, 20, 50);
  // back
  translate(0, 150);
  ellipse(0, 0, 20, 40);
  pop();
  if (!clicked) {
    // bounding box
    rect(
      butterflyLeft,
      butterflyTop,
      butterflyRight - butterflyLeft,
      butterflyBot - butterflyTop
    );
  }
  pop();
}

function drawMiles(x, y, r) {
  push();
  translate(x, y);
  rotate(r);

  //draw head
  fill(0);
  noStroke();
  ellipse(0, -155, 60, 75);
  //eye ring
  fill(255, 0, 0);
  ellipse(-15, -160, 22, 17);
  ellipse(15, -160, 22, 17);
  //eyes
  fill(255);
  ellipse(-15, -160, 18, 13);
  ellipse(15, -160, 18, 13);

  //arms
  fill(0);
  ellipse(-40, -105, 50, 15);
  ellipse(40, -105, 50, 15);
  //hands
  ellipse(-60, -105, 15, 15);
  ellipse(60, -105, 15, 15);

  //body miles
  fill(0);
  ellipse(0, -80, 50, 75);
  //spider logo
  stroke(255, 0, 0);
  fill(255, 0, 0);
  ellipse(0, -95, 10, 15);
  //top
  line(-15, -105, 0, -100);
  line(15, -105, 0, -100);
  //top-middle
  line(-15, -100, 0, -100);
  line(15, -100, 0, -100);
  //bottom
  line(-15, -95, 0, -95);
  line(15, -95, 0, -95);
  //bottom-middle
  line(-15, -90, 0, -95);
  line(15, -90, 0, -95);

  noStroke();
  //feet
  fill(0);
  ellipse(-15, -5, 20, 10);
  ellipse(15, -5, 20, 10);
  //legs
  ellipse(-10, -30, 20, 50);
  ellipse(10, -30, 20, 50);

  // show origin
  fill(0, 255, 255);
  ellipse(0, 0, 10, 10);
  stroke(255, 255, 0);
  line(-100, 0, 100, 0);
  stroke(0, 0, 255);
  line(0, 100, 0, -100);
  pop();
}

// Update Functions
function updateButterfly() {
  sinY = 50 * sin((1 / 10) * butterflyX);
  butterflyY = sinY + offsetY;

  butterflyX += 1;
  offsetY -= 1;

  if (butterflyX >= milesX) {
    shouldMilesFall = true;
  }
}

function updateMiles() {
  milesR += PI / 40;
}
// Events
function mousePressed() {
  // We translate and then scale the canvas
  // When dealing with points, we do the opposite
  // (scale then translate).
  let leftSide = butterflyLeft * butterflyScale + butterflyX;
  let rightSide = butterflyRight * butterflyScale + butterflyX;
  let topSide = butterflyTop * butterflyScale + butterflyY;
  let botSide = butterflyBot * butterflyScale + butterflyY;
  if (
    mouseX > leftSide &&
    mouseX < rightSide &&
    mouseY > topSide &&
    mouseY < botSide
  ) {
    clicked = true;
  }
}
