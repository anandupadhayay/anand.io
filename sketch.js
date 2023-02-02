let img;
let img_1;

function preload() {
  img_1 = loadImage('bison.png');
  img = loadImage('img_1.png');
}

// V A R I A B L E S

var bubble = [];
var mySize;
var noiseMax;  

let phase = 0;
let zoff = 0;
let angle = 30;

    // S E T U P 

function setup() {
  createCanvas(windowWidth,windowHeight);
  //background(0);
  for (var i = 0; i<20; i++) {
    bubble[i] = new Bubble();

  }
}

    // D R A W

function draw() {
  
  background(220);
  sandstorm.display();

  for (var i = 0; i< bubble.length; i++) {
  grid.display();
    
  bubble[i].display();
  bubble[i].move();
    
  // I M A G E S. -- -- --  IMG AND IMG_1
    
  image(img, random(windowWidth), random(windowHeight),200, 100);
    
  image(img_1,200,300,mouseX,mouseY+random(+10,-10));

    
    
  push();
  //frameRate(100);
  fill(255,0,255); 
  stroke(255,0,255);
  strokeWeight(4)
    
  //  d r a w i n g " + " P O I N T
    
  rect(mouseX+20,mouseY,20,60);
  rect(mouseX,mouseY+20,60,20);
      //rect(mouseX+80,mouseY,60,20);
      //rect(mouseX,mouseY+80,20,60);

  pop();

  }
}
    
    // G R I D

var grid = {
  
  v : 15,
  f : 11,
  
  display : function () {
    
    for (var x = 0; x < windowWidth; x += windowWidth / this.v) {
		for (var y = 0; y < windowHeight; y += windowHeight / this.f) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, windowHeight);
			line(0, y, windowWidth, y);
}
  }
  }
}

      // F L O A T I N G  C I R C L E S

function Bubble() {
  
  this.x = random(0, windowWidth);
  this.y = random(0,windowHeight);
  
  this.display = function(){
  //stroke(2);
  //strokeWeight(2);
  fill(255,255,0);
  ellipse(this.x, this.y, 50,50);
  }
  
  this.move = function() {
  
  this.x = this.x + random(-1,1);
  this.y = this.y + random(-1,1);   
  }
}

  // S A N D S T O R M

var sandstorm = {
  
  display : function() {
    
  mySize = min(windowWidth, windowHeight);
  noiseMax = random(2000);
   
  // dotted wave
    
  push();
  translate(windowWidth / 2, windowHeight / 4);   // to shake the epicenter of sandstorm
  noFill();
  for (var i = 0; i < 100; i += 2) {

    beginShape();
    for (var a = 0; a < TWO_PI; a += 0.01) {
      let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + phase / 2), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff, zoff), 0, 1, 0, mySize / 1.5 - i * 3.0);
      let r1 = map(noise(xoff, yoff, zoff), 0, 1, 0, mySize / 1.5 - i * 3.0);
      let x = r * cos(a);
      let y = r1 * sin(a);

      //strokeWeight(random(3));
      //point(x+random(5,-5), y+random(150,-5));
      //point(x*random(0,mouseX),y*random(mouseY,0));
      point(x+mouseX/2,y+mouseY/3);


    }
    //endShape(CLOSE);
    phase += 4;
    }
  pop();
  }
}

    //S A V E - Y O U R - D R A W I N G 

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
}
