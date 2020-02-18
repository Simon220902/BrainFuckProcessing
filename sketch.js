/*let sketch = function(p) {
  p.setup = function(){
    p.createCanvas(100, 100);
    p.background(0);
  }
  p.executeDrawOpcode = function(){
    
  }
};
new p5(sketch, 'container');
*/ 

let x = 100;
let y = 100;

function setup() {
  createCanvas(255, 255);
}

function draw() {
  if (mouseX <= width && mouseX >= 0){
    x = mouseX;
  }
  if(mouseY <= height && mouseY >= 0){
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
  circle(x, y, 50);
}