var PLAY=1;
var END=0;
var gameState=PLAY;
var background1,backImage;
var car,carImage;
var coin,coinImage,coinG;
var score=0;
var game,gameI;
var obstacle,obstacleImage,obstacleG;

function preload(){
  backImage=loadImage("track.jpg");
  carImage=loadImage("d.png.png");
  coinImage=loadImage("c.png");
  gameI=loadImage("d2.png")
  obstacleImage=loadImage("o.png");
}

function setup() {
  createCanvas(500,500);
  background1=createSprite(250,250);
  background1.addImage(backImage);
  background1.scale=1;
  car=createSprite(250,400,10,10);
  car.addImage(carImage);
  car.scale=0.1;
  game=createSprite(250,250);
    game.addImage(gameI);
    game.scale=0.7;
    game.visible=false;
  coinG= new Group();
  obstacleG= new Group();
}

function draw() {
  background("green");
  if(gameState===PLAY){
  background1.velocityY= (6 + 3* score/7);
  coins();
  obstacles();
 
  if(car.isTouching(coinG)){
    score=score+1;
    coinG.destroyEach();
  }
   if ( background1.y > 1500){
       background1.y=200;
    }
  
  
if(keyDown(LEFT_ARROW)){
 car.x=car.x-4;
}
if(keyDown(UP_ARROW)){
  car.y=car.y-4;
 }
if(keyDown(RIGHT_ARROW)){
  car.x=car.x+4;
 }
 if(keyDown(DOWN_ARROW)){
  car.y=car.y+4;
 }
 if(car.isTouching(obstacleG)){
   gameState=END;
 }
 }
  if(gameState===END){
    background(255);
    background1.visible=false;
    game.visible=true;
    coinG.destroyEach();
    car.destroy();
    obstacleG.destroyEach();
  }
 
  drawSprites();
  fill(153,255,0);
  textSize(20)
  text("Score: "+score,390,30)
 
  
}
function coins(){
  if(frameCount%120===0){
  coin=createSprite(Math.round(random(30,400)),0,10,10);
  coin.addImage(coinImage);
  coin.scale=0.08;
  coin.velocityY=4;
  car.depth=coin.depth;
  car.depth++
  coinG.add(coin);
  }

}
function obstacles(){
  if(frameCount%100===0){
  obstacle=createSprite(Math.round(random(23,420)),0,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityY=5;
  obstacleG.add(obstacle);
  }
}