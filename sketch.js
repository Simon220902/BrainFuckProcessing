let x = 100;
let y = 100;

function setup() {
  createCanvas(255, 255);
}

function draw() {
  if (mouseX <= width && mouseX >= 0){
    x = mouseX;
  }else if(mouseY <= height && mouseY >= 0){
    y = mouseY;
  }
  if (mouseIsPressed){
    background(0);
    fill(255);
  }
  else{
    background(255);
    fill(0);
  }
  text(mouseY, 10, 30);
  circle(x, y, 25);
}