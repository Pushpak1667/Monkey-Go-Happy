var PLAY = 1;
var END = 2;
var gameState = PLAY;
var monkey , monkey_running , monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score,score1;
var ground,groundImage,sky,skyImage;
var gameOver,restart,gameoverImg,restartImg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
monkey_collided = loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage = loadImage("ground_1.png");
  skyImage = loadImage("sky_1.png");
  gameoverImg = loadImage("gameover_1.jpg");
  restartImg = loadImage("restart.png")
}



function setup() {
  createCanvas(600,500);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  sky = createSprite(300,150);
  sky.addImage(skyImage);
  // sky.scale = 0.5
  sky.x = sky.width /2;
  sky.velocityX = -6;
  
  ground = createSprite(600,500,900,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
 
  
  monkey = createSprite(150,370);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  gameOver = createSprite(250,100);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.2;
  
  restart = createSprite(250,210);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  
  monkey.setCollider("rectangle",0,0,150,350);
  monkey.debug = true;
  
  score = 0;
  score1 = 0
}


function draw() {
// background("white");
  
  if(gameState === PLAY){
    score1 =score1 + Math.round(getFrameRate()/60.5)
  
if(ground.x < 300){
  ground.x = ground.width/2
}
 if (sky.x < 0){
   sky.x = sky.width/2;
 }
    sky.velocityX = -(6+3*score1/50)
 
  if (keyDown("space") && monkey.y >= 250) {
   monkey.velocityY = -17;   
      }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 5; 
    }
    
 if(monkey.isTouching(obstacleGroup)){
   gameState = END;
  monkey.addAnimation("collided",monkey_collided);
 }
    bananas();
  obstacles();
    
  gameOver.visible = false;
  restart.visible = false;
    
  }
  if(gameState === END){
    ground.velocityX = 0;
    sky.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
monkey.changeAnimation("collided",monkey_collided)
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    bananaGroup.destroyEach();
    obstacleGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    restart.visible = true;
       
    if(mousePressedOver(restart)){
      reset();
    }
    }
  


  drawSprites();
  
    fill("black")
    textSize(20); 
    text("Score: " + score,400,100);set
    text("Survival Time: " + score1,400,50);
  
}
function bananas(){
if(frameCount % 100 === 0){
   banana = createSprite(650,150,50,50);
  banana.addImage(bananaImage);
  banana.scale = 0.15;
  banana.velocityX = -6;
  banana.lifetime = 160;
  banana.y = Math.round(random(120,200));
  
  bananaGroup.add(banana);
  
}
}
function obstacles(){
  if(frameCount %300 === 0){
    obstacle = createSprite(650,370,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.32;
    obstacle.lifetime = 160;
    obstacle.velocityX = -(6 + score1 / 50);
    
    obstacleGroup.add(obstacle);
  }
  
}
function reset(){
  gameState = PLAY;
  score = 0;
  score1 = 0;
  
   gameOver.visible = false;
  restart.visible = false;
  
    obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running)
}



