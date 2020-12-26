var ball, ballImage
var hoop, hoopImage1, hoopImage2
var player, playerImage1, playerImage2
var edges
var basket
var score = 0
function preload(){
  ballImage = loadImage("ball.png");
  hoopImage1 = loadImage("hoop1.png")
  hoopImage2 = loadImage("hoop2.png")
  playerImage1 = loadImage("player1.png");
  playerImage2 = loadImage("player2.png");
}

function setup(){
  createCanvas(400,400)
  
  //The player sprite and image
  player = createSprite(350,300,20,170)
  player.addImage("player2",playerImage2)
   player.addImage("player1",playerImage1)
  
  player.debug = true
  player.setCollider("rectangle",0,0,60,150)
  
  //ball sprite and image
  ball = createSprite(350,230,20,10)
  ball.addImage("ball",ballImage)
  ball.scale = 0.6
  
  ball.debug = true
  ball.setCollider("rectangle",0,0,30,10)
  
  //hoop image and sprite
  hoop = createSprite(60,200,20,20)
  hoop.addImage("hoop1",hoopImage1)
  hoop.addImage("hoop2",hoopImage2)
  hoop.scale = 0.5
  hoop.velocityY = -2
  
hoop.debug = true
  hoop.setCollider("rectangle",-117,-40,20,160)
  
  //basket sprite
  basket = createSprite(50,160,35,35)
  basket.debug = true
  basket.visible = false
  
  
}

function draw(){
  background(200)
  
  //creating the edges to make the hoop bounce off the edges
  edges = createEdgeSprites();
  hoop.bounceOff(edges[3])
  hoop.bounceOff(edges[2])
  
  //to throw the ball and change the player image
  if(keyDown("space")){
    ball.velocityY = -10
    ball. velocityX = -10
    player.changeImage("player1",playerImage1)
  }
  //changing the player image back
  if(keyWentUp("space")){
    
   
    player.changeImage("player2",playerImage2)
  }
  //giving the gravity to the ball
  ball.velocityY += 0.5
  
  //to make the ball bounce off the hoop
  ball.bounceOff(hoop)
  
  //to stop the ball from falling
  ball.collide(player)
  
  //to make the basket move with the hoop
  basket.y = hoop.y
  //to increase the score and to make the ball fall down the basket
  if(ball.collide(basket)){
    hoop.changeImage("hoop2",hoopImage2)
    ball.velocityY = 2
    score=score + 1
  //  ball.velocityX = 0.5
  }
  //change the hoop image to show collision with the hoop and ball
  else{
    hoop.changeImage("hoop1",hoopImage1)
  }
  //call in the reset function
  resetBall();
  
  //display the score 
  text("Score : " + score,330, 40)
  
  //display instructions
  text("Press Space to shoot the ball and up arrow to return",120,20)
  drawSprites();
}
//to put the ball back in its original position
function resetBall(){
  if(keyDown(UP_ARROW)){
    ball.x = 350
    ball.y = 230
    ball.velocityY = 0
    ball.velocityX = 0
  }
}