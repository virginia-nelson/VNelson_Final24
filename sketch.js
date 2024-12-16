let bullets = [];//array to store bullets in
let enemies = [];//array to store enemies in
let enemies2 = [];//array to store to faster/random enemies
let score = 0;//score
let mode;//switching between play and opening page
let img1;//soap
let img2;//bubbles
let img3;//germ
let soapX;//soap x position
let soapY;//soap y position
let buttonX = 75;//button positioning on the x
let buttonY = 300;//button positioning on the y
let buttonWidth = 410;//width of button
let buttonHeight = 80;//height of button
let gameOver;//if the game ends
let playAgainButton;//play again
let lives = 3;//life count



//preloading all images
function preload(){
  img1 = loadImage("./images/soap.png");
  img2 = loadImage("./images/bubbles.png");
  img3 = loadImage("./images/germ.png");
  germ2 = loadImage("./images/germ2.png");
  father = loadImage("./images/father_hand.png");
  mom = loadImage("./images/lady_hand.png");
  daughter = loadImage("./images/daughter_hand.png");
  son = loadImage("./images/son_hand.png");
  baby = loadImage("./images/bbygirl.png");
  heart = loadImage("./images/heart.png");
  shower = loadImage("./images/shower.jpg");

}


function setup(){
  mode = 0;//mode is the starting page
  createCanvas(600,600);
  textSize(21);

  soapX = width/2;//positining the soap bottle
  soapY = height - 80;

  for(let i = 0; i < 5; i++){//spawn enemies 
    let enemy = {
      x: random(0, width),//between 0 and the width of the screen
      y: random(-800,0)//spawn above the screen or nearest to the end
    }
    enemies.push(enemy);//add enemies to the list
  }


  for(let i = 0; i <5; i++){//spawning germ 2 enemies
    let enemy = {
      x: random(0,width),
      y: random(-800,0)
    }
    enemies2.push(enemy);//adding new enemies into the enemies2 array
  }
  
  //play again button
  playAgainButton = createButton('play again');
  playAgainButton.position(600,800);
  playAgainButton.style('Impact','deeppink');
  playAgainButton.mousePressed(playAgain);
  playAgainButton.hide();
}

function draw(){
  clear();
  if(mode == 0){//if the page is the starting page...
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

    image(germ2, 380, 500, 100, 100);

    image(father,0, -80, 270, 270);
    image(mom,90, -75, 270, 270);
    image(daughter,210, 5, 170, 170);
    image(son,270, 6, 170, 170);
    image(baby,330, 10, 170, 170);
  }
  if(mode == 1){//if the game is in game mode
  background(shower);//switch background

  soapX = constrain(mouseX - 50, 0, width - 50);//updating soap position to follow the mouse, -40 because of soap image size
  soapY = constrain(400, 0, height - 100);//updating soap y position

  image(img1,soapX,soapY,100,100);//loading the soap image
  rectMode(CENTER);//centering

  for (let i = 0; i < lives; i++) {//loading the life count, visually changes each time because of this loop
    image(heart, 10 + (i * 40), 60, 50, 50);//displaying the hearts on top left
  }

  for(let bullet of bullets){//update and draw the bullets
    bullet.y -= 5;//move the bullets up the screen after firing
    image(img2,bullet.x,bullet.y,40,40);//drawing bubbles
  }



  //update and draw enemies
  for (let enemy of enemies){
    enemy.y += 3;
    image(img3,enemy.x,enemy.y,40,40);

    if(enemy.y > 480){
      lives--;
      enemies.splice(enemies.indexOf(enemy), 1);
      if (lives <= 0) {
        endGame();
      }

    }
  }

  //if red germ passes and gets close to the hands...
  for(let enemy of enemies2){
    if (!enemy.xSpeed) {
      enemy.xSpeed = random(2, 5);//random speed between 2 and 5
      enemy.xDirection = random() > 0.5 ? 1 : -1;//randomly choose a left (-1) or right (1) direction
    }
    
    enemy.x += enemy.xSpeed * enemy.xDirection;//make the enemy move back and forth horizontally in a random way

    if (enemy.x < 0 || enemy.x > width) {//make the enemy bounce off the edges of the screen
      enemy.xDirection *= -1; //reverse direction when reaching left or right edge
      enemy.x = constrain(enemy.x, 0, width); //ensure it stays within bounds
    }

    enemy.y += 4;//move the enemy down the screen
    image(germ2, enemy.x,enemy.y,60,60);

    if(enemy.y > 480){//if the enemy gets close to the family of 5
      lives--;//decrease life count
      enemies2.splice(enemies2.indexOf(enemy), 1);//get rid of enemy and delete it from the list
      if (lives <= 0) {//if the life count is at 0
        endGame();//end the game
    }
  }


  for(let enemy of enemies){//looping through the enemy list
    for(let bullet of bullets){//looping through the bullet list
      if(dist(enemy.x, enemy.y, bullet.x, bullet.y) < 30){//if the enemy and bullet come in contact..
        enemies.splice(enemies.indexOf(enemy), 1);//get rid of 1 enemy at index of enemy
        bullets.splice(bullets.indexOf(bullet),1);//get rid of bullets when the two hit

    //spawning new enemy
    let newEnemy = {
      x: random(0, width),
      y: random(-1000,0)
    }
    enemies.push(newEnemy);
    score += 1;
      }
    }
  }

  for(let enemy of enemies2){//looping through the enemy list
    for(let bullet of bullets){//looping through the bullet list
      if(dist(enemy.x, enemy.y, bullet.x, bullet.y) < 50){//if the enemy and bullet come in contact..
        enemies2.splice(enemies2.indexOf(enemy), 1);//get rid of 1 enemy at index of enemy
        bullets.splice(bullets.indexOf(bullet),1);//get rid of bullets when the two hit
    
    //spawning new enemy2 
    let newEnemy = {
      x: random(0, width),
      y: random(-1000,0)
    }
    enemies2.push(newEnemy);
    score += 1;
      }
    }
  }


  text("score: "+score, 15, 45)//displaying the score

  //images of family at bottom of play screen
  image(father,100, 455, 170, 170);
  image(mom,160, 470, 150, 150);
  image(daughter,210, 475, 140, 140);
  image(son,250, 460, 160, 160);
  image(baby,310, 480, 140, 140);
}
}
}

function endGame() {//function end game when it is called
  fill(255, 0, 0);
  text("Game Over!", 200, 300);
  noLoop();//stop the game
  text("Final Score: " + score, 175, 350);
  playAgainButton.show();s//show the play again button
}

function keyPressed(){//if the space bar is pressed
  if(keyCode === 32){
    let bullet = {//spawn a new bullet when the user clicks
      x: soapX + 30,
      y: soapY
    }
    bullets.push(bullet);//adds a new bullet to the list  
  }
}

function mousePressed(){//if the mouse is pressed
  if(mode === 0){//switch scenes from starting page to play page
    mode = 1;
    playAgainButton.hide();//hide the play button
  }
  }

function playAgain(){//resetting the game when play again is clicked
  mode = 1;
  score = 0;
  lives = 3;
  enemies =[];//resetting all arrays to start over
  enemies2 = [];
  bullets = [];

  let newEnemy = {//new enemie spawning
    x: random(0, width),
    y: random(-1000,0)
  }
  enemies.push(newEnemy);
  enemies2.push(newEnemy);

  playAgainButton.hide();//hide the play again button 
  loop();
}





