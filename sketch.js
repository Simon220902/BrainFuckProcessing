let x = 100;
let y = 100;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  if (y < height ){
      y++;
  }else{
      y=0;
  }
  circle(x, y, 50);
}