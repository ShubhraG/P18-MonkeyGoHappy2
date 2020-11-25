//monkey
var monkey,monkeyr;
//banana and obstacles
var banana,bananai,stone,obstaclei;
//Groups
var FoodG,ObstacleG;
//survival time
var survivaltime=0;
var score=0;
//gameStates
var Play=1;
var End=0;
var gamestate=1;
//ground
var ground,ground2;
//background
var forest,foresti;
var overi,over;
var stone;
var still;
var restarti,res;
var counter=0;

function preload(){
//loading animation for monkey  
monkeyr=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
//loading pic for banana and obstacle
  bananai = loadImage("banana.png");
  obstaclei = loadImage("obstacle.png");
//loaing background
  foresti=loadImage("forest.jpg");
  overi=loadImage("GAME OVER.png");
  still=loadAnimation("sprite_0.png");
  restarti=loadImage("restart.png");
 }
function setup() {
  createCanvas(600,400);
//creating monkey
  monkey=createSprite(100,300);
  monkey.addAnimation("running",monkeyr);
  monkey.scale=0.1;
  //monkey.velocityY=3;
//creating invisible ground  
  ground=createSprite(200,380,400,5);
  ground.velocityX=0;
  ground.visible=false;
  
//creating groups  
  FoodG=createGroup();
  ObstacleG=createGroup();
//creating background
  forest=createSprite(300,200,600,400);
  forest.addImage(foresti);
  forest.depth=-1;
  forest.scale=0.6;
 
  
 survivaltime=0;
 score=0; 
  counter=0;
  
  over=createSprite(300,150);
  over.addImage(overi);
  over.scale=0.2;
  over.visible=false;
  
  res=createSprite(300,250);
  res.addImage(restarti);
  res.scale=0.2;
  res.visible=false;
  
}


function draw(){
  background(1);
  
if(gamestate===Play){
    food();
    obstacle();
 survivaltime=Math.round(frameCount/20);
   
    forest.velocityX=-5;
//to make monkey jump
   if(keyDown("space")&&monkey.y>=250){
   monkey.velocityY=-10;
 }
monkey.velocityY=monkey.velocityY+0.8;  
//to make monkey stay on ground
    monkey.collide(ground);
   
    
//to make ground look infinity
  if(forest.x<230){
    forest.x=360;
  }
    if(FoodG.isTouching(monkey)){
      score=score+2;
      FoodG.destroyEach();
    }
  scorein();
  
  if(ObstacleG.isTouching(monkey)){ 
    if(score==0 ||monkey.scale==0.1){                           ObstacleG.destroyEach(); 
    gamestate=End; 
  }
    else if(score>10||score==10) { 
      monkey.scale=0.1; 
      ObstacleG.destroyEach();
       
    }
  }
 
  

  
  
 
}
  else if(gamestate===End){
    over.visible=true;
    res.visible=true;
    FoodG.destroyEach();
    ObstacleG.destroyEach();
    monkey.addAnimation("running",still);
    monkey.velocityY=0;
    forest.velocityX=0;
    
    if(mousePressedOver(res)){
      restart();
    }
  }
 drawSprites(); 
  stroke("white");
textSize(20);
fill("white");
text("Score:"+score,500,50);

stroke("white");
textSize(20);
fill("white");
text("Survival Time:"+survivaltime,100,50);   
    
  }


  

function food(){
 if(frameCount%80===0){
   banana=createSprite(400,(Math.round(random(150,200))));
   banana.addImage(bananai);
   banana.velocityX=-10;
   banana.lifetime=50;
   banana.scale=0.1;
   FoodG.add(banana);
  
 } 
}
function obstacle(){
if(frameCount%200===0){
  stone=createSprite(Math.round(random(310,350)),350);
  stone.addImage(obstaclei);
  stone.velocityX=-10;
  stone.lifetime=70;
  stone.scale=0.15;
  ObstacleG.add(stone);
  }
}

function restart(){
    gamestate=Play 
    res.visible=false;
   over.visible=false;
   survivaltime=0;
  score=0;
  monkey.scale=0.1;
   monkey.addAnimation("running",monkeyr);
  frameCount=0;

}
function scorein (){
  switch(score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale=0.14;
            break;
    case 30: monkey.scale=0.16;
            break;
    case 40: monkey.scale=0.18;
            break;        
      
  }
}
