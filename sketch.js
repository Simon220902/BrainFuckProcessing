let x = 100;
let y = 100;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  if (keyIsPressed){

  background(0);
  fill(255);
  }
  else{
    background(255);
    fill(0);
  }
  text(key, 10, 30);
  if (y < height ){
      y++;
  }else{
      y=0;
  }
  circle(x, y, 50);
}