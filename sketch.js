const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
//stores all the balls
var balls = []


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, -PI / 4);
  

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();
  
  //iterating through the balls array to display all the balls
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();

 
}

function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    //creating ball
  cannonball = new CannonBall(cannon.x, cannon.y)
  //individual ball is being added to the balls array
    balls.push(cannonball)
  }
}

//displaying each ball
function showCannonBalls(ball, index) {
  ball.display();
  //if the ball crosses the canvas it will get destroyed
  if (ball.body.position.x >= width || ball.body.position.y >= height) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if (keyCode === DOWN_ARROW) {
    //last ball of the balls array will move
    balls[balls.length - 1].shoot();
  }
}


