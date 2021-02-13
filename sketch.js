const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var interval = 80
var bgImg, dieSound, shootSound, levelupSound
var ground, canvas
var enemy1, enemy2, enemy3, enemy4
var bulletGroup, enemyGroup1, enemyGroup2, enemyGroup3, enemyGroup4
var player, score = 0
var enemyImg1, enemyImg2, enemyImg3, enemyImg4, bulletImg, playerImg, explosionAni
var gameState = "play"
var restart, gameOver, explosion
function preload(){
  bgImg = loadImage("images/nightSky.png")
  enemyImg1 = loadImage("images/alien.png")
  enemyImg2 = loadImage("images/alien2.png")
  enemyImg3 = loadImage("images/alien3.png")
  enemyImg4 = loadImage("images/alien4.png")
  bulletImg = loadImage("images/bomb.png")
  playerImg = loadImage("images/ship.png")
  dieSound = loadSound("sounds/die.wav")
  shootSound = loadSound("sounds/shoot.wav")
  levelupSound = loadSound("sounds/levelup.wav")
  explosionAni = loadAnimation("images/explosion1.png", "images/explosion2.png", 
  "images/explosion3.png", "images/explosion4.png", "images/explosion5.png", "images/explosion6.png",
   "images/explosion7.png", "images/explosion8.png", "images/explosion9.png", "images/explosion10.png", 
   "images/explosion11.png", "images/explosion12.png", "images/explosion13.png", "images/explosion14.png", 
   "images/explosion15.png", "images/explosion16.png", "images/explosion17.png", "images/explosion18.png", 
   "images/explosion19.png", "images/explosion20.png", "images/explosion21.png", "images/explosion22.png", 
   "images/explosion23.png", "images/explosion24.png", "images/explosion25.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create()
  world = engine.world;

  ground = createSprite(0, 0, width, height)
  ground.addImage("bgImg", bgImg)
  ground.scale = 8
  ground.x = ground.width/2
  ground.y = ground.height/2
  player = new Player(width/2, height/2)
  edges = createEdgeSprites()
  bulletGroup = new Group()
  enemyGroup1 = new Group()
  enemyGroup2 = new Group()
  enemyGroup3 = new Group()
  enemyGroup4 = new Group()
}

function draw() {
  background(255,255,255);  
  if(gameState === "play"){
    player.sprite.collide(edges[3])
    ground.velocityY = 2
    if(ground.y > displayHeight - 30){
      ground.y = ground.height/2
    }
    var rand = Math.round(random(1, 4))
    interval = Math.round(interval - score/75)
    if(interval >= 0){
      if(frameCount % interval === 0){
        switch(rand){
          case 1: createEnemy1(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg1)
                  
                  break;
          case 2: createEnemy2(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg2)
                  break;
          case 3: createEnemy3(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg3)
                  break;
          case 4: createEnemy4(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg4)
                  break;
        }
      } 
    } else if(interval < 0){
      if(frameCount % (0 - interval) === 0){
        switch(rand){
          case 1: createEnemy1(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg1)
                  
                  break;
          case 2: createEnemy2(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg2)
                  break;
          case 3: createEnemy3(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg3)
                  break;
          case 4: createEnemy4(Math.round(random(100, width - 100)), 0, 10, 10, enemyImg4)
                  break;
        }
      }
    }
    if(keyDown(LEFT_ARROW)){
      player.move(-10, 0)
    }
    if(keyDown(RIGHT_ARROW)){
      player.move(10, 0)
    
    }
    if(keyDown(DOWN_ARROW)){
      player.move(0, 10)
    
    }
    if(keyDown(UP_ARROW)){
      player.move(0, -10)
    
    }
    if(player.sprite.isTouching(enemyGroup1) || player.sprite.isTouching(enemyGroup2)
     || player.sprite.isTouching(enemyGroup3) || player.sprite.isTouching(enemyGroup4) || edges[3].isTouching(enemyGroup1) || edges[3].isTouching(enemyGroup2) || edges[3].isTouching(enemyGroup3) || edges[3].isTouching(enemyGroup4)){
      //explosionFunc()
      dieSound.play()
      gameState = "end"
    }
    if(bulletGroup.isTouching(enemyGroup1)){
      score++
      bulletGroup.destroyEach()
      enemyGroup1.destroyEach()
    }
    if(bulletGroup.isTouching(enemyGroup2)){
      score++
      bulletGroup.destroyEach()
      enemyGroup2.destroyEach()
    }
    if(bulletGroup.isTouching(enemyGroup3)){
      score++
      bulletGroup.destroyEach()
      enemyGroup3.destroyEach()
    }
    if(bulletGroup.isTouching(enemyGroup4)){
      score++
      bulletGroup.destroyEach()
      enemyGroup4.destroyEach()
    }
  } else if(gameState === "end"){
    ground.velocityY = 0
    enemyGroup1.setVelocityYEach(0)
    enemyGroup2.setVelocityYEach(0)
    enemyGroup3.setVelocityYEach(0)
    enemyGroup4.setVelocityYEach(0)
    bulletGroup.setVelocityYEach(0)
    enemyGroup1.setLifetimeEach(-1)
    enemyGroup2.setLifetimeEach(-1)
    enemyGroup3.setLifetimeEach(-1)
    enemyGroup4.setLifetimeEach(-1)
    bulletGroup.setLifetimeEach(-1)
  }
  drawSprites()
  fill("white")
  textSize(35)
  text("Score: " + score, width-250, 100)
  if(gameState === "end"){
    push()
    textAlign(CENTER)
    text("Game Over", width/2, height/2 - 10)
    text("Press Space To Play Again", width/2, height/2 + 30)
    pop()
  }
}
function keyPressed(){
  if(gameState === "play"){
    spawnBullets()
  }
  if(keyCode === 32 && gameState === "end"){
    gameState = "play"
    score = 0
    enemyGroup1.destroyEach()
    enemyGroup2.destroyEach()
    enemyGroup3.destroyEach()
    enemyGroup4.destroyEach()
    bulletGroup.destroyEach()
    levelupSound.play()
    player.sprite.x = width/2
    player.sprite.y = height/2
  }
}
/*function explosionFunc(){
  explosion = createSprite(player.sprite.x, player.sprite.y, 10, 10)
  explosion.addAnimation(explosionAni)
}*/