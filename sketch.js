// Planet
var planet, moon;
var aircraft;
//var texture_0, texture_1, texture_2;
var timer = 2;
var yfactor = 0;
var s = 60; // 1 second per frame
var multiplier = 0;
var sign;
var el;
var pos = 1;
var moodColor = [];
moodColor.lenght = 3;
var moodColorC = [];
var s = 0;
var moveCam = false;
var x_pos = 0;
var y_pos = 0;
var z_pos = 0;
var x_aircraft = 0;
var y_aircraft = 0;
var z_aircraft = 0;
var scaleAircraft = 40000;
var getRidOfPlanets = 0;

const FOLDER = 'assets/',
  EXT = '.jpg',
  INDEX_START = 0,
  INDEX_END = 4,
  INDEX_TOTAL = 0 + INDEX_END - INDEX_START,
  textures = Array(INDEX_TOTAL);




function preload() {
  planet = loadImage("assets/makemake.jpg");
  moon = loadImage("assets/eris.jpg");
  aircraft = loadModel("assets/Aircraft.obj", true); // true = maschera renderizzata (normalizzata) secondo sistema riferimento p5
  // texture_0 = loadImage("assets/texture_0.jpg");
  // texture_1 = loadImage("assets/texture_1.jpg");
  // texture_2 = loadImage("assets/texture_2.jpg");
  for (var i = 0; i < INDEX_TOTAL; ++i) {
    textures[i] = loadImage(FOLDER + (i + INDEX_START) + EXT);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  angleMode(DEGREES);
  moodColor = color(random() * 255, random() * 255, random() * 255, 50);
  //moodColorC = color(random() * 255, random() * 255, random() * 255, 20);
  graphics = createGraphics(width / 1.92, height / 1.08);
  //graphics.background(0, 150, 0, 50);
  graphics.background(moodColor);
  graphics.fill(130, 200);
  graphics.ellipse(width / 2, height / 2, width / (1.92 * 2), height / (1.08 * 1.43));
  //textureWrap(REPEAT);
}

function draw() {
  background(0);

  // var direction = 1;
  // if (mouseY > height/2) { // bottom of the screen
  //   direction = 1;
  //   if (mouseX > pmouseX) { // move mouse to right
  //     x_angle = map(mouseX, 0, width, 2160, -2160);
  //   } else { // move mouse to left
  //     x_angle = map(mouseX, width, 0, -2160, 2160);
  //   }
  // } else if (mouseY < height/2) { // topo of the screen
  //   direction = -1;
  //   if (mouseX > pmouseX) { // move mouse to right
  //     x_angle = map(mouseX, 0, width, 2160, -2160);
  //   } else { // move mouse to left
  //     x_angle = map(mouseX, width, 0, -2160, 2160);
  //   }
  // }
  //
  // //orbitControl();
  // camera(x_angle, 0, direction*1000*pos, 0, 0, 0, 0, 1, 0);
  //
  //
  // ambientLight(moodColor); // 200, 200, 200
  // graphics.fill(moodColor, 200);
  //
  //
  //
  //

   noStroke();
  //
  //


  if (moveCam == true) {
    getRidOfPlanets-= 1;
    if (x_pos < width/3.84) {
      x_pos += width/1920;
    }
    // if (y_pos > -1200) {
    //   y_pos -= 1;
    // }
    if ((2875 + z_pos) > 100) {
      z_pos -= width/1920;
    }
    if (x_aircraft < width/0.91) {
      x_aircraft+= width/310; // 6.2
    }
    if (y_aircraft > -width/1.42) {
      y_aircraft -= width/480;
    }
    if (z_aircraft > 0) {
      //z_aircraft-= 2.32;
    }
  }

  if (scaleAircraft <= 40000 && scaleAircraft >  width/7.5) {

    ambientLight(10, 10, 10);
    directionalLight(255, 255, 255, 0, 1, -0.7);

    camera(0 + x_pos, 0 + y_pos, 2875 + z_pos, 0 + x_aircraft, 0 + y_aircraft, 0 + z_aircraft, 0, 1, 0); // z 875, z 2875
    console.log(x_pos, y_pos, z_pos);

  } else if (scaleAircraft <  width/7.5) {
     var direction = 1;
     //rotateX(90);
    if (mouseY < height/2) { // top of the screen
      direction = 1;
      //rotateX(-35);
      if (mouseX > pmouseX) { // move mouse to right
        x_angle = map(mouseX, 0, width, 200, 4000);
      } else { // move mouse to left
        x_angle = map(mouseX, width, 0, 4000, 200);
      }
    } else if (mouseY > height/2) { // bottom of the screen
      direction = -1;

      //rotateZ(180);
      if (mouseX > pmouseX) { // move mouse to right
        x_angle = map(mouseX, 0, width, 200, 4000);
      } else { // move mouse to left
        x_angle = map(mouseX, width, 0, 4000, 200);
      }
    }

    //orbitControl();
    camera(x_angle, y_aircraft, 2000*direction*pos, x_aircraft, y_aircraft, 0, 0, 1, 0);


    ambientLight(moodColor); // 200, 200, 200
    graphics.fill(moodColor, 200);
  }
  ////////////////////////// Aircraft
  push();
  translate(width/0.91, -width/1.42, 0); // 2100, 1350

  if (moveCam == true) {
    if (scaleAircraft >= width/7.68){  // 250
       scaleAircraft-= width/19.2; // 100
    }
  }
  if (width > height) {
    scale(width / scaleAircraft);  // 550
  } else {
    scale(height / scaleAircraft);  // 550
  }


  //rotateY(0);
  rotateZ(180);
  rotateX(-20);

 texture(graphics);
 //specularMaterial(moodColorC);
 // specularMaterial(150);
 // shininess(100);
 //emissiveMaterial(255, 255, 255);
 //ambientMaterial(70, 130, 230);



 //texture(textures[2]);
 model(aircraft);
 pop();

  if (scaleAircraft <= 40000 && scaleAircraft >  width/7.5) {

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
  translate(-800 - getRidOfPlanets*10, 50, 2475);
  rotateY(-frameCount * 0.1);
  texture(moon); // texture = material
  sphere(width / 16, 150, 150);
  pop();
  }



}

function mouseClicked() {
  moodColor = color(random() * 255, random() * 255, random() * 255);
  //moodColorC = color(random() * 255, random() * 255, random() * 255, 20);
  console.log(moodColor);
}

function mouseWheel(event) {
  print(event.delta);

      pos += event.delta * 0.0003;


  //uncomment to block page scrolling
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  moveCam = true;

}


// var y_angle;
// var x_angle;
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
