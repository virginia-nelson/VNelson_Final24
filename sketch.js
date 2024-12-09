let bullets = [];//array to store bullets in
let enemies = [];//array to store enemies in
let score = 0;
let mode;
let img1;
let img2;
let img3;
let soapX;
let soapY;
let buttonX = 75;
let buttonY = 300;
let buttonWidth = 410;
let buttonHeight = 80;
let gameOver;
let playAgainButton;


function preload(){
  img1 = loadImage("./images/soap.png");
  img2 = loadImage("./images/bubbles.png");
  img3 = loadImage("./images/germ.png");
  father = loadImage("./images/father_hand.png");
  mom = loadImage("./images/lady_hand.png");
  daughter = loadImage("./images/daughter_hand.png");
  son = loadImage("./images/son_hand.png");
  baby = loadImage("./images/bbygirl.png");
}


function setup(){
  mode = 0;
  createCanvas(600,600);
  textSize(21);

  soapX = width/2;
  soapY = height - 80;

  for(let i = 0; i < 5; i++){//spawn enemies 
    let enemy = {
      x: random(0, width),//between 0 and the width of the screen
      y: random(-800,0)//spawn above the screen or nearest to the end
    }
    enemies.push(enemy);//add enemies to the list
  }

  playAgainButton = createButton('play again');
  playAgainButton.position(215,380);
  playAgainButton.style('Impact','deeppink');
  playAgainButton.mousePressed(playAgain);
  playAgainButton.hide();
}

function draw(){
  clear();
  if(mode == 0){
    background(157, 193, 140);

    //pulsing effect animation
    let pulse = cos(frameCount * 0.1) * 5;

    // Hover effect on the button
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      fill(255);  // Highlight the button with yellow when hovered
    } else {
      fill(98, 142, 88);;  // Default button color (white)
    }

    // Draw the button with the updated fill color
    stroke(0);
    strokeWeight(5);
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 20);

    //title of game
    fill(255);
    fill(98, 142, 88);
    strokeWeight(15);
    textSize(80 + pulse);
    textFont('Impact');
    text('Bacteria Fighter',30,250);

    //enter text on button
    fill(255);
    textSize(30);
    strokeWeight(5);
    text('click here to start',170, 350);

    //draw images and icons on the starting page
    image(img3,500,500,120,120);
    image(img3,450,450,70,70);
    image(img2,70,480,70,70);
    image(img1,0,500,100,100);

    image(father,0, -80, 270, 270);
    image(mom,90, -75, 270, 270);
    image(daughter,210, 5, 170, 170);
    image(son,270, 6, 170, 170);
    image(baby,330, 10, 170, 170);
  }
  if(mode == 1){
  background(51);

  soapX = mouseX - 50;//updating soap position to follow the mouse, -40 because of soap image size
  soapY = 400;//updating soap y position

  image(img1,soapX,soapY,100,100);
  rectMode(CENTER);
  for(let bullet of bullets){//update and draw the bullets
    bullet.y -= 5;//move the bullets up the screen after firing
    image(img2,bullet.x,bullet.y,40,40);
  }
  //update and draw enemies
  for (let enemy of enemies){
    enemy.y += 3;
    image(img3,enemy.x,enemy.y,40,40);

    if(enemy.y > 480){
      fill(255, 0, 0);
      text("You Lose!",200, 300);//text "you lose" to display on the screen
      noLoop();//stop draw from happening, stop all interaction
      text("final score: " + score, 175, 350);

      playAgainButton.show();

    }
  }

  for(let enemy of enemies){//looping through the enemy list
    for(let bullet of bullets){//looping through the bullet list
      if(dist(enemy.x, enemy.y, bullet.x, bullet.y) < 30){//if the enemy and bullet come in contact..
        enemies.splice(enemies.indexOf(enemy), 1);//get rid of 1 enemy at index of enemy
        bullets.splice(bullets.indexOf(bullet),1);//get rid of bullets when the two hit

    let newEnemy = {
      x: random(0, width),
      y: random(-1000,0)
    }
    enemies.push(newEnemy);
    score += 1;
      }
    }
  }
  text("score: "+score, 15, 45)


  image(father,100, 455, 170, 170);
  image(mom,160, 470, 150, 150);
  image(daughter,210, 475, 140, 140);
  image(son,250, 460, 160, 160);
  image(baby,310, 480, 140, 140);
}
}

function keyPressed(){
  if(keyCode === 32){
    let bullet = {//spawn a new bullet when the user clicks
      x: soapX + 30,
      y: soapY
    }
    bullets.push(bullet);//adds a new bullet to the list  
  }
}

function mousePressed(){
  if(mode === 0){
    mode = 1;
    playAgainButton.hide();
  }
  }

function playAgain(){
  mode = 1;
  score = 0;
  enemies =[];
  bullets = [];

  let newEnemy = {
    x: random(0, width),
    y: random(-1000,0)
  }
  enemies.push(newEnemy);

  playAgainButton.hide();
  loop();
}





