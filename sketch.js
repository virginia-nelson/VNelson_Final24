let bullets = [];//array to store bullets in
let enemies = [];//array to store enemies in
let score = 0;
let mode;
let img1;
let img2;
let img3;
let soapX;
let soapY;

function preload(){
  img1 = loadImage("./images/soap.png");
  img2 = loadImage("./images/bubbles.png");
  img3 = loadImage("./images/germ.png");
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
}

function draw(){
  clear();
  if(mode == 0){
    background(34, 57, 6);
    fill(98,142,88);
    stroke(0);
    strokeWeight(5);
    rect(75,300,410,80,20);
    fill(255);
    strokeWeight(15);
    textSize(60);
    textFont('Courier New');
    text('Bacteria Fighter',10,250);
    fill(255);
    textSize(30);
    strokeWeight(5);
    text('Press Enter to Start',100, 350);
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
    enemy.y += 2;
    image(img3,enemy.x,enemy.y,20,20);
    // rect(enemy.x, enemy.y, 10);
    if(enemy.y > height){
      text("You Lose!",200, 300);//text "you lose" to display on the screen
      noLoop();//stop draw from happening, stop all interaction
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
  text(score, 15, 25)
}
}

function keyPressed(){
  if(keyCode === ENTER){
    mode = 1;
  }
}

function mousePressed(){
  let bullet = {//spawn a new bullet when the user clicks
    x: soapX + 40,
    y: soapY
  }
  bullets.push(bullet);//adds a new bullet to the list

  }





