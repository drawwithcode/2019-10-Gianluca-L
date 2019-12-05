var mask;
var aircraft;
var timer = 2;
var yfactor = 0;
var s = 60; // 1 second per frame
var multiplier = 0;
var sign;
var el;
var pos = 1;


function preload() {
  mask = loadModel("assets/Aircraft.obj", true); // true = maschera renderizzata (normalizzata) secondo sistema riferimento p5
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  angleMode(DEGREES);

  graphics = createGraphics(width / 1.92, height / 1.08);
  graphics.background(0, 150, 0, 50);
  graphics.fill(130, 200);
  el =graphics.ellipse(width / 2, height / 2, width / (1.92 * 2), height / (1.08 * 1.43));

}

function draw() {
  background(0);
  var direction = 1;
  if (mouseY > height/2) { // bottom of the screen
    direction = 1;
    if (mouseX > pmouseX) { // move mouse to right
      x_angle = map(mouseX, 0, width, 2160, -2160);
    } else { // move mouse to left
      x_angle = map(mouseX, width, 0, -2160, 2160);
    }
  } else if (mouseY < height/2) { // topo of the screen
    direction = -1;
    if (mouseX > pmouseX) { // move mouse to right
      x_angle = map(mouseX, 0, width, 2160, -2160);
    } else { // move mouse to left
      x_angle = map(mouseX, width, 0, -2160, 2160);
    }
  }


  camera(x_angle, 0, direction*1000*pos, 0, 0, 0, 0, 1, 0);

  ambientLight(200, 200, 200);

  if (width > height) {
    scale(width / 550);
  } else {
    scale(height / 550);
  }

  rotateY(-180);
  rotateZ(-180);
  rotateX(-20);
  var y_angle;
  var x_angle;
  // if (mouseX > width/2) {
  //   if (mouseY > height/2) {
  //     y_angle = map(mouseX, width/2, width, 0, -90);
  //   } else {
  //     y_angle = map(mouseX, width, width/2, -90, -180);
  //   }
  // } else {
  //   if (mouseY > height/2) {
  //     y_angle = map(mouseX, 0, width/2, 90, 0);
  //   } else {
  //     y_angle = map(mouseX, 0, width/2, 90, 180);
  //   }
  //
  // }
  //
  // if (mouseY < height) {
  //   x_angle = map(mouseY, 0, height/2, 45, 0);
  // }
  //
  //
  // rotateY(y_angle);
  // rotateX(x_angle);


  //console.log(yfactor);
  //translate(0, yfactor, 0);

  //normalMaterial();
  noStroke();
  texture(graphics);
  aircraft = model(mask);
  //console.log(el);

}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  pos += event.delta*0.0003;
  //uncomment to block page scrolling
  //return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
