// Planet texture
var planet, moon;
// model
var aircraft;

var pos = 1;
var moodColor = [];
moodColor.lenght = 3;
var moodColorC = [];
var moveCam = false;
var x_pos = 0;
var y_pos = 0;
var z_pos = 0;
var x_aircraft = 0;
var y_aircraft = 0;
var z_aircraft = 0;
var scaleAircraft = 0;
var getRidOfPlanets = 0;

function preload() {
  planet = loadImage("assets/makemake.jpg");
  moon = loadImage("assets/eris.jpg");
  aircraft = loadModel("assets/Aircraft.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  angleMode(DEGREES);

  moodColor = color(random() * 255, random() * 255, random() * 255, 50);

  // graphics that covers the 3D aircraft
  graphics = createGraphics(width / 1.92, height / 1.08);
  graphics.background(moodColor);
  graphics.fill(130, 200);
  graphics.ellipse(width / 2, height / 2, width / (1.92 * 2), height / (1.08 * 1.43));

  anomaly_text = createDiv('ANOMALY DETECTED <br> click to inspect');
  anomaly_text.style('position: absolute; top: 4%; right: 5%; width: 10vw; height: 10vh; color: white; text-align: center; font-family: Verdana; font-size: 0.7vw');

  instructions_text = createDiv('Move the MOUSE and the MOUSE WHEEL to control the camera <br> CLICK anywhere to change the colors');
  instructions_text.style('position: absolute; top: 2.5%; left: 50%; transform: translateX(-50%); width: 25vw; height: 10vh; color: white; text-align: center; font-family: Verdana; font-size: 0.7vw');
  instructions_text.hide();

  scaleAircraft = width / 0.048;
}

function draw() {
  background(0);
  // when the user clicks on the canvas there is a transition of the camera from the view of the planets to a position close to an aircraft 3D model
  if (moveCam == true) {
    getRidOfPlanets -= 1; // while the camera is moving, the planets move towards the left to free the view
    if (x_pos < width / 3.84) {
      x_pos += width / 1920;
    }
    if ((2875 + z_pos) > 100) {
      z_pos -= width / 1920;
    }
    if (x_aircraft < width / 0.91) {
      x_aircraft += width / 310; // 6.2
    }
    if (y_aircraft > -width / 1.42) {
      y_aircraft -= width / 480;
    }
  }
  // camera and lights at the beginning, using the size of the aircraft model to identify the different states (aircraft very small at the beginning)
  if (scaleAircraft <= width / 0.048 && scaleAircraft > width / 7.5) {

    ambientLight(10, 10, 10);
    directionalLight(255, 255, 255, 0, 1, -0.7);

    camera(0 + x_pos, 0 + y_pos, 2875 + z_pos, 0 + x_aircraft, 0 + y_aircraft, 0 + z_aircraft, 0, 1, 0);

  } else if (scaleAircraft < width / 7.5) { // when the aircraft reaches a size below this value, a new camera (controlled with the mouse) and a new light (color is changed on mouse click) are created
    var direction = 1; // variable that controls the direction of the Z axis
    if (mouseY < height / 2) { // top of the screen
      direction = 1;
      if (mouseX > pmouseX) { // move mouse to right
        x_angle = map(mouseX, 0, width, 200, 4000); // 200, 4000
      } else { // move mouse to left
        x_angle = map(mouseX, width, 0, 4000, 200); // 4000, 200
      }
    } else if (mouseY > height / 2) { // bottom of the screen
      direction = -1;
      if (mouseX > pmouseX) { // move mouse to right
        x_angle = map(mouseX, 0, width, 200, 4000);
      } else { // move mouse to left
        x_angle = map(mouseX, width, 0, 4000, 200);
      }
    }
    ambientLight(moodColor); // 200, 200, 200
    graphics.fill(moodColor, 200);

    // parameter "pos" controls the zoom with the mouse wheel
    camera(x_angle, y_aircraft, 2300 * direction * pos, x_aircraft, y_aircraft, 0, 0, 1, 0);

    instructions_text.show();

  }

  ////////////////////////// Aircraft
  push();
  translate(width / 0.91, -width / 1.42, 0); // 2100, 1350

  if (moveCam == true) {
    if (scaleAircraft >= width / 7.68) { // 250
      scaleAircraft -= width / 19.2; // 100
    }
  }
  if (width > height) {
    scale(width / scaleAircraft); // 550
  } else {
    scale(height / scaleAircraft); // 550
  }

  noStroke();

  rotateZ(180);
  rotateX(-20);

  texture(graphics);
  model(aircraft);

  pop();

  if (scaleAircraft <= width / 0.048 && scaleAircraft > width / 7.5) {

    ///////////////////////// Planet
    push()
    translate(-width / 9.6 + getRidOfPlanets, width / 38.4, 2000);
    rotateY(45 + frameCount * 0.02);
    texture(planet);
    sphere(width / 5, 60, 60);
    pop();
    //////////////////////// Moon
    push()
    rotateY(135 + frameCount * 0.1);
    translate(-width / 9.6 - getRidOfPlanets * 10, 50, 4000);
    rotateY(-frameCount * 0.1);
    texture(moon); // texture = material
    sphere(width / 5, 150, 150);
    pop();
    // anomaly detected effect
    push();
    noFill();
    stroke(200, 150);
    strokeWeight(4);
    ellipse(width / 0.91, -width / 1.42, 20 + 100 * cos(frameCount * 2));
    pop();
  }
}

function mouseClicked() {
  moodColor = color(random() * 255, random() * 255, random() * 255);
  moveCam = true;

  anomaly_text.remove();
}

function mouseWheel(event) {
  print(event.delta);
  pos += event.delta * 0.0003;
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
