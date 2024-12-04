let bullets = [];//array to store bullets in
let enemies = [];//array to store enemies in
let score = 0;
function setup(){
  createCanvas(400,400);
  for(let i = 0; i < 10; i++){//spawn enemies 
    let enemy = {
      x: random(0, width),//between 0 and the width of the screen
      y: random(-800,0)//spawn above the screen or nearest to the end
    }
    enemies.push(enemy);//add enemies to the list
  }
}

function draw(){
  background(51);
  rectMode(CENTER);
  circle(mouseX,height-50,25);//drawing the player (a circle)
  for(let bullet of bullets){//update and draw the bullets
    bullet.y -= 10;//move the bullets down the screen
    circle(bullet.x,bullet.y,10);
  }
  //update and draw enemies
  for (let enemy of enemies){
    enemy.y += 2;
    rect(enemy.x, enemy.y, 10);
    if(enemy.y > height){
      text("You Lose!",width/2, height/2);//text "you lose" to display on the screen
      noLoop();//stop draw from happening, stop all interaction
    }
  }

  for(let enemy of enemies){//looping through the enemy list
    for(let bullet of bullets){//looping through the bullet list
      if(dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10){//if the enemy and bullet come in contact..
        enemies.splice(enemies.indexOf(enemy), 1);//get rid of 1 enemy at index of enemy
        bullets.splice(bullets.indexOf(bullet),1);//get rid of bullets when the two hit

    let newEnemy = {
      x: random(0, width),
      y: random(-800,0)
    }
    enemies.push(newEnemy);
    score += 1;
      }
    }
  }
  text(score, 15, 25)
}

function mousePressed(){
  let bullet = {//spawn a new bullet when the user clicks
    x: mouseX,
    y: height - 50
  }
  bullets.push(bullet);//adds a new bullet to the list
}




