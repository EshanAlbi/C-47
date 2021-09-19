var PLAY=1
var END=0
var gameState=PLAY

var pinkOpponentGroup,yellowOpponentGroup,redOpponentGroup
var obstacle1Group,obstacle2Group,obstacle3Group

var road,racer,opponentPink,opponentYellow,opponentRed
var roadImage,racerImage1,racerImage2,opponentPink1Image, opponentPink2Image,opponentYellow1Image,opponentYellow2Image,opponentRed1Image,opponentRed2Image

var obstacle1,obstacle2,obstacle3
var obstacle1Image,obstacle2Image,obstacle3Image

var enemy1, enemy2, enemy1Img, enemy2Img;
var  coin, coinImg;

var score = 0;

var distance=0

var edges;

var gameOver,restart
var gameOverImage

var bellSound

function preload(){
  
  roadImage=loadImage("images/Road.png")

  gameOverImage= loadImage("images/gameOver.png")
  
  racerImage1=loadImage("images/PlayerCar2.png")
  // racerImage2=loadAnimation("images/mainPlayer3.png");
  
  opponentPink1Image=loadAnimation("images/opponent1.png","images/opponent2.png");
  opponentPink2Image=loadAnimation("images/opponent3.png")
  
  opponentYellow1Image=loadAnimation("images/opponent4.png","images/opponent5.png")
  opponentYellow2Image=loadAnimation("images/opponent6.png")
  
  opponentRed1Image=loadAnimation("images/opponent7.png","images/opponent8.png")
  opponentRed2Image=loadAnimation("images/opponent9.png")
  
  obstacle1Image=loadAnimation("images/obstacle1.png")
  obstacle2Image=loadAnimation("images/obstacle2.png")
  obstacle3Image=loadAnimation("images/obstacle3.png")

  enemy1Img = loadImage("images/Enemy1.png");
  enemy2Img = loadImage("images/Enemy2.png");

  coinImg = loadImage("images/pickup_gold.png")
  
  bellSound= loadSound("sounds/bell.mp3");
}

function setup(){
  
  createCanvas(displayWidth - 20, displayHeight - 30);
  
  pinkOpponentGroup=new Group()
  yellowOpponentGroup=new Group()
  redOpponentGroup=new Group()
  obstacle1Group=new Group()
  obstacle2Group=new Group()
  obstacle3Group=new Group()
  enemy1Group = new Group()
  enemy2Group = new Group()
  goldGroup =new Group()
  
  
  road=createSprite(200,500)
  road.addImage(roadImage)
  road.velocityX=-7
  road.x=road.width /2;
  road.velocityX = -(6 + 3*distance/100);
  

  racer=createSprite(130,100);
  racer.addImage("racer",racerImage1)
  racer.scale=0.4
  
  gameOver=createSprite(displayWidth/2, displayHeight/2)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.6
  gameOver.visible=false

  // camera.position.x = displayWidth/2;
  // camera.position.y = displayHeight/2;
  

}

function draw(){


  
  background("grey")
  racer.setCollider("rectangle",0,0,595,235)
  racer.debug = true;
  
  drawSprites()

  
    
  textSize(18)
  fill("skyBlue")
  text("Distance: "+distance,430,50);

  text("score:"+score,600,50)
  
  if(gameState===PLAY){
   
  distance=distance+Math.round(getFrameRate()/50)
  road.velocityX=-(6+2*distance/150)
  

  if(road.x<0){
  road.x=width/2
  } 
    
  if(keyDown(UP_ARROW)){
    racer.y = racer.y - 4;
  }

  if(keyDown(DOWN_ARROW)){
    racer.y = racer.y + 4;
  }
  
  
  
  
  edges=createEdgeSprites()
  racer.collide(edges[3])
  racer.collide(edges[2])
  
  if(pinkOpponentGroup.isTouching(racer)){
    
  gameState=END
  // racer.changeAnimation("racer",racerImage2);    
opponentPink.addAnimation("opponentPink",opponentPink2Image)
  opponentPink.velocityY=0
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)
  enemy1Group.setVelocityXEach(0)
  enemy2Group.setVelocityXEach(0)
  goldGroup.setVelocityXEach(0)
  }
    
  if(yellowOpponentGroup.isTouching(racer)){
    
  gameState=END
  // racer.changeAnimation("racer",racerImage2);    
opponentYellow.addAnimation("opponentYellow",opponentYellow2Image)
  opponentYellow.velocityY=0
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)
  enemy1Group.setVelocityXEach(0)
  enemy2Group.setVelocityXEach(0)
  goldGroup.setVelocityXEach(0)
  }
    
  if(redOpponentGroup.isTouching(racer)){
    
  gameState=END
  // racer.changeAnimation("racer",racerImage2);    
opponentRed.addAnimation("opponentRed",opponentRed2Image)
  opponentRed.velocityX=0
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)
  enemy1Group.setVelocityXEach(0)
  enemy2Group.setVelocityXEach(0)
  goldGroup.setVelocityXEach(0)
  }
    
  if(racer.isTouching(obstacle1Group)){
  
  gameState=END
  // racer.addAnimation("racer",racerImage2)
  obstacle1.velocityX=0
  }
    
  if(racer.isTouching(obstacle2Group)){
  
  gameState=END
  // racer.addAnimation("racer",racerImage2)
  obstacle2.velocityX=0
  }
  
  if(racer.isTouching(obstacle3Group)){
  
  gameState=END
  // racer.addAnimation("racer",racerImage2)
  obstacle3.velocityX=0 
  }
  if(racer.isTouching(enemy1Group)){
    gameState=END
    enemy1.velocityX=0;
  }
  if(racer.isTouching(enemy2Group)){
    gameState=END
    enemy2.velocityX=0;
  }
  if(racer.isTouching(goldGroup)){
    
    score = score + 1;
    coin.destroyEach()
  }
  
  
  var select_opponentCycles=Math.round(random(1,3))
  
  if(World.frameCount%100==0){
  if(select_opponentCycles==1){
  pinkCyclists();
  }else if (select_opponentCycles==2){
  yellowCyclists();
  }else{
  redCyclists();
  }
  }
  var enemyCar =Math.round(random(1,3))
  
  if(World.frameCount%100==0){
  if(enemyCar==1){
  spawnEnemyCar1();
  }else(enemyCar==2)
  spawnEnemyCar2();{
  // }else{
  // redCyclists();
  }
}

var goldCoin = Math.round(random(1,3))
  
  if(World.frameCount%50==0){
  if(goldCoin==1){
  spawnGold();
  
  
  // }else{
  // redCyclists();
  }
}
  
    
  var select_obstcles=Math.round(random(1,3))  

  
  if(World.frameCount%150==0){
  if(select_obstcles==1){
  spawnObstcle1()
  }else if (select_obstcles==2){
  spawnObstcle2()
  }else{
  spawnObstcle3()
  }
  }
    
  }else if(gameState===END){
  textSize(18)
  fill("skyBlue")
  text("Total Distance: "+distance,387,50);   
  textSize(20);
  text("PRESS SPACE TO RESTART THE GAME",700,100);
    
  // racer.addAnimation("racer",racerImage2)
  racer.velocityX=0;
    
road.velocityX=0
    
  gameOver.visible=true
      
  if(keyDown("SPACE")){
  reset()
  }  
  
  pinkOpponentGroup.setLifetimeEach(-1)
  yellowOpponentGroup.setLifetimeEach(-1)
  redOpponentGroup.setLifetimeEach(-1)

  pinkOpponentGroup.setVelocityXEach(0)
  yellowOpponentGroup.setVelocityXEach(0)
  redOpponentGroup.setVelocityXEach(0)

  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)

  obstacle1Group.setLifetimeEach(-1)
  obstacle2Group.setLifetimeEach(-1)
  obstacle3Group.setLifetimeEach(-1)
  }
}

function pinkCyclists(){
  
  opponentPink=createSprite(600,Math.round(random(50,500),10,10));
  opponentPink.addAnimation("opponentPink",opponentPink1Image)
    
  opponentPink.velocityX=-(6+2*distance/150)
     
  opponentPink.scale=0.07

  opponentPink.setLifetime=150
  
  pinkOpponentGroup.add(opponentPink)
}

function yellowCyclists(){
  
  opponentYellow=createSprite(600,Math.round(random(50,700),10,10));  opponentYellow.addAnimation("opponentYellow",opponentYellow1Image)
  
  opponentYellow.velocityX=-(6+2*distance/150)
  
  opponentYellow.scale =0.07
  
  opponentYellow.setLifetime=120
  
  yellowOpponentGroup.add(opponentYellow)
}

function redCyclists(){

  opponentRed=createSprite(600,Math.round(random(50,300),10,10));
  
  opponentRed.addAnimation("OpponentRed",opponentRed1Image);
  
  opponentRed.velocityX=-(6+2*distance/150) 
  
  opponentRed.scale=0.07
  
  opponentRed.setLifetime=100
  
  redOpponentGroup.add(opponentRed)
}

function spawnObstcle1(){
  obstacle1=createSprite(600,Math.round(random(50,650),10,10))
  obstacle1.addAnimation("obstacle1",obstacle1Image)
  obstacle1.velocityX=-(4+2*distance/120)
  obstacle1.scale=0.1
  obstacle1.setLifetime=150
  obstacle1Group.add(obstacle1)
}

function spawnObstcle2(){
  obstacle2=createSprite(600,Math.round(random(50,700),10,10))
  obstacle2.addAnimation("obstacle2",obstacle2Image)
  obstacle2.velocityX=-(4+2*distance/120)
  obstacle2.scale=0.1
  obstacle2.setLifetime=150
  obstacle2Group.add(obstacle2)
}

function spawnObstcle3(){
  obstacle3=createSprite(600,Math.round(random(50,700),10,10))
  obstacle3.addAnimation("distance",obstacle3Image)
  obstacle3.velocityX=-(4+2*distance/120)
  obstacle3.scale=0.04
  obstacle3.setLifetime=150
  obstacle3Group.add(obstacle3)
}

function spawnEnemyCar1(){
  enemy1 =createSprite(600,Math.round(random(50,700),10,10))
  enemy1.addImage("enemy1",enemy1Img)
  enemy1.velocityX=-(4+2*distance/130)
  enemy1.scale=0.5
  enemy1.setLifetime=150
  enemy1Group.add(enemy1);
}
function spawnEnemyCar2(){
  enemy2 =createSprite(600,Math.round(random(50,1000),10,10))
  enemy2.addImage("enemy2",enemy2Img)
  enemy2.velocityX=-(4+2*distance/130)
  enemy2.scale=0.5
  enemy2.setLifetime=150
  enemy2Group.add(enemy2);
}

function spawnGold(){
  coin = createSprite(600,Math.round(random(50,1000),10,10))
  coin.addImage("coin", coinImg)
  coin.velocityX=-(4+2*distance/130)
  coin.scale = 0.1
  coin.setLifetime = 150
  goldGroup.add(coin)
}



function reset(){
  
  gameState=PLAY

  racer.addAnimation("racer",racerImage1)
  
  gameOver.visible=false

  pinkOpponentGroup.destroyEach()
  yellowOpponentGroup.destroyEach()
  redOpponentGroup.destroyEach()

  obstacle1Group.destroyEach()
  obstacle2Group.destroyEach()
  obstacle3Group.destroyEach()

  enemy1Group.destroyEach()
  enemy2Group.destroyEach()

  goldGroup.destroyEach()

  
  score = 0;

  distance=0
}


