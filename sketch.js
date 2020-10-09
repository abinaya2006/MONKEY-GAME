var monkey, monkey_running, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, scoreimg, foodscore = 0
var back, backimg, invisibleground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var time,timeimg,survivaltime=0;
var gameover,gameoverimg;
var restart,restartimg

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png",  "sprite_5.png", "sprite_6.png", "sprite_7.png","sprite_8.png")

  monkey_collided=loadAnimation("sprite_4.png" );
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  //load image for background
  backimg = loadImage("jungle.jpg");

  //load image for score
  scoreimg = loadImage("scorebanana.png")
  
  //load image for time
  timeimg=loadImage("stopwatch.png")

  //load image for gameover
  gameoverimg=loadImage("gameOver.png")
  
  //load image for restart
  restartimg=loadImage("restart.png")
}



function setup() {
  createCanvas(500, 400);

  //createSprite for backgrond
  back = createSprite(200, 200, 1000, 40)
  back.addImage("bac", backimg)
  back.scale = 3.8;

  //createSprite for monkey
  monkey = createSprite(60, 350);
  monkey.addAnimation("mo", monkey_running);
  monkey.addAnimation("monke",monkey_collided)
 monkey.scale = 0.2

  //createSprite for invisible ground
  invisibleGround = createSprite(200, 410, 600, 10);
  invisibleGround.visible = false;

  score = createSprite(420, 50)
  score.addImage("sc", scoreimg)
  score.scale = 0.3;
  
  time=createSprite(30,50);
  time.addImage("tim",timeimg);
  time.scale=0.4;
  
  gameover=createSprite(240,180)
  gameover.addImage("gam",gameoverimg)
 gameover.visible=false;
  gameover.scale=1
  
  restart=createSprite(245,215)
  restart.addImage("res",restartimg)
  restart.scale=0.5
  restart.visible=false

  FoodGroup = new Group()
  obstacleGroup = new Group()


  monkey.setCollider("rectangle",0,0,10,monkey.height)
   //trex.setCollider("circle",0,0,45)
 // monkey.debug=true
}


function draw() {
  background("white");


  if (gameState === PLAY) {
    back.velocityX = -4

    if (back.x < 10) {
      back.x = 200
    }

    createfood()
    createobstacle()

    if (keyDown("space") && monkey.y >= 340) {
      monkey.velocityY = -18
    }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach()
      foodscore = foodscore + 1
    }
    
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END

    }
    
    //add gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.8

  //monkey colide with invisible ground
  monkey.collide(invisibleGround);
    survivaltime = survivaltime + Math.round(getFrameRate() /60);
    //console.log(getFrameRate())
}
  
  else if(gameState==END){
          
      back.velocityX=0
    monkey.velocityY=0
    
       monkey.changeAnimation("monke",monkey_collided);
    gameover.visible=true;
    
    restart.visible=true
   
    
    obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
    
    
  if(mousePressedOver(restart)){
    reset();
     
  
  }
    
  
  }
  drawSprites();

  fill("red")
  textSize(40)
  text(foodscore, 450, 60);
  
   text(survivaltime, 60, 70)
  
  
  
}

function createfood() {
  if (frameCount % 200 === 0) {
    banana = createSprite(400, 250)
    banana.addImage("ba", bananaImage)
    banana.scale = 0.1
    banana.velocityX = -6
    banana.y = Math.round(random(200, 300));
    FoodGroup.add(banana)
    banana.lifetime = 300
  }

}

function createobstacle() {

  if (frameCount % 150 === 0) {
    obstacle = createSprite(500, 370)
    obstacle.addImage("ob", obstaceImage)
    obstacle.scale = 0.2
 obstacle.velocityX=-4
    obstacleGroup.add(obstacle)
  }

}

function reset(){
   
    survivaltime=0;

  monkey.changeAnimation("mo", monkey_running)
  gameover.visible=false;
  restart.visible=false;
  
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.collide(invisibleGround);
  
  gameState=PLAY
  
}