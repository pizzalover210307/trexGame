var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart ,gameover ,trex ,ObstaclesGroup ,invisibleGround ,ground ,CloudsGroup, rand
var trexanimation,cloudimage,gameOverimage,goundimage,obstacle1,
    obstacle2,obctacle3,obstacle4,obstacle5,obstacle6,restartimage
var count=0
    
function preload() {
trexanimation=loadAnimation("trex1.png","trex3.png","trex4.png")
cloudimage=loadImage("cloud.png")


gameOverimage=loadImage("gameOver.png")
ground2image=loadImage("ground2.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
  restartimage=loadImage("restart.png")
}
function setup (){
  createCanvas(600,400)
 restart = createSprite(200,288,1,1)
   gameover= createSprite(200,260)
  restart.addImage(restartimage)
  gameover.addImage(gameOverimage)
restart.scale=0.5
gameover.scale=0.5

restart.visible=false
gameover.visible=false


//create a trex sprite
 trex = createSprite(200,380,20,50);
trex.addAnimation("trexanimation",trexanimation);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
 ground = createSprite(200,380,400,20);
ground.addImage(ground2image);
ground.x = ground.width /2;

//invisible Ground to support Trex
 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//generate some randome number here
 
//console.log(rand);

//create Obstacle and Cloud Groups
 ObstaclesGroup = new Group();
 CloudsGroup = new Group();

//set text
textSize(18);
textFont("Georgia");

//score
var count = 0;



trex.setCollider("circle",0,0,30);
}

function draw() {
  //set background to white
  background("white");
   text("Score: "+ count, 250, 100);
  

    
  
  if(gameState ===PLAY){
    //move the ground
    ground.velocityX =-(8+count/100) ;
   if (count % 100===0 && count > 0) {
     // playSound("sound://category_tap/level_select_1.mp3")
     
    }
     trex.play()
     //scoring
  count = count+Math.round(getFrameRate()/50);
  
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
   //jump when the space key is pressed
  if(keyDown("space")&& trex.y>=367.5){
   trex.velocityY = -13 ;
  // playSound("sound://category_bell/choose_background.mp3")
  
  }
 // console.log(trex.y)
  trex.velocityY = trex.velocityY + 0.8;
  
   //spawn the clouds
  spawnClouds();
  
  //spawn obstacles
  spawnObstacles();
  
   if (ObstaclesGroup.isTouching(trex)) {
    gameState = END
 //playSound("sound://category_hits/puzzle_game_magic_item_unlock_5.mp3")
  
    }
  
  }
  
  else if(gameState === END)  {
    ground.velocityX = 0;
ObstaclesGroup.setVelocityXEach(0)
    ObstaclesGroup.setLifetimeEach(-1)
  trex.pause()
  trex.velocityY=0
CloudsGroup.setVelocityXEach(0)
  CloudsGroup.setLifetimeEach(-1)
  
  restart.visible=true
gameover.visible=true
  }

  

 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
   if (mousePressedOver(restart)) {
gameState = PLAY  ; 
restart.visible=false
gameover.visible=false
ObstaclesGroup.destroyEach()
CloudsGroup.destroyEach()
count=0

  } 
  
 
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60=== 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX =-(8+count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand)
    {
    case 1:obstacle.addImage(obstacle1)
    break;
    case 2:obstacle.addImage(obstacle2)
    break;
    case 3:obstacle.addImage(obstacle3)
    break;
    case 4:obstacle.addImage(obstacle4)
    break;
    case 5:obstacle.addImage(obstacle5)
    break;
    case 6:obstacle.addImage(obstacle6)
      break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70; 
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
  
}
