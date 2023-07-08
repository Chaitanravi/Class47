var bg, bgimg;
var shooterimg, shootingimg, player;
var zombie, zombieimg;
var zombieGroup;
var bullet;
var bulletGroup;
var heart1, heart2, heart3;
var heart1img, heart2img, heart3img;
function preload(){
  bgimg = loadImage("assets/bg.jpeg");
  shooterimg = loadImage("assets/shooter_2.png");
  shootingimg = loadImage("assets/shooter_3.png");
  zombieimg = loadImage("assets/zombie.png");
  heart1img = loadImage("assets/heart_1.png");
  heart2img = loadImage("assets/heart_2.png");
  heart3img = loadImage("assets/heart_3.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  //creating background sprite
  bg = createSprite(displayWidth/2, displayHeight/2, 20, 20);
  bg.addImage(bgimg);
  bg.scale = 1.4;
  //creating player
  player = createSprite(displayWidth-1500, displayHeight-500, 50, 50);
  player.addImage(shooterimg);
  player.scale = 0.5;
  player.debug = false;
  //changing radius
  player.setCollider("rectangle",0,0,300,300);
  //declaring zombies group
  zombieGroup = new Group()
  //zombieGroup = createGroup();
  //creating bullet GROUP
  bulletGroup = new Group()
  //creating sprite
  heart1 = createSprite(1400, 50, 50, 40);
  heart1.addImage(heart1img);
  heart1.scale = 0.5;
  heart1.visible = false;
  heart2 = createSprite(1450, 50, 50, 40);
  heart2.addImage(heart2img);
  heart2.scale = 0.5;
  heart2.visible = false;
  heart3 = createSprite(1500, 50, 50, 40);
  heart3.addImage(heart3img);
  heart3.scale = 0.5;
  heart3.visible = true;

}
function draw(){
  background("black");
  //to move player
  if(keyDown("UP_ARROW") && player.y > 120){
    player.y -= 20;
  }
  if(keyDown("DOWN_ARROW") && player.y < 800){
    player.y += 20;
  }
  if(keyWentDown("SPACE")){
    player.addImage(shootingimg);
    //creating bullet
    bullet = createSprite(player.x, player.y - 30, 30, 10);
    bulletGroup.add(bullet);
    bullet.velocityX = 20;
  }
  if(keyWentUp("SPACE")){
    player.addImage(shooterimg);
  }
  if(keyDown("RIGHT_ARROW") && player.x < 1600){
    player.x += 20;
  }
  if(keyDown("LEFT_ARROW") && player.x > 50){
    player.x -= 20;
  }
  //calling function
  spawnZombies();

  //checking collision between zombie and player
  if(zombieGroup.isTouching(player)){
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
      }
    }
  }
  //checking collision between zombie and bullet
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
      }
    }
  }
  drawSprites();
}
function spawnZombies(){
  if(frameCount%50 == 0){
    zombie = createSprite(random(700,1300), random(100,600), 50, 50);
    zombie.addImage("zombiei",zombieimg);
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.lifetime = 400
    zombieGroup.add(zombie);
    zombie.setCollider("rectangle",0,0,400,400);
    zombie.debug = false;
  }
}