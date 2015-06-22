// Enemies our player must avoid
var Enemy = function(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.x = x;
	this.y = y;
	this.v = v;
	this.w = 101;
	this.h = 83;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	var rectWidth = 101;
	var rectHeight = 50;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if(this.x > 505) {
		this.x = -100;
		var lane = Math.floor(Math.random() * 3);
		var loc = [60, 140, 220];	
		this.y = loc[lane];
	}
	this.x = this.x + this.v * dt;
	
	//Handles collision with the Player
	//when two entities occupy the same space, for instance when your character should die
	//
	if (this.x < player.x + player.w &&
	   this.x + this.w > player.x &&
	   this.y < player.y + player.h &&
	   this.h + this.y > player.y) {
		// collision detected!
		player.reset();
	}

}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.x = 200; 
	this.y = 375;
	this.dx = 100;
	this.dy = 80;
	this.w = 101;
	this.h = 83;
	this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys) {
		switch(allowedKeys) {
			case "right":
				this.x += this.dx;
				break;
			case "left":
				this.x -= this.dx;
				break;
			case "up":
				this.y -= this.dy;
				break;
			case "down":
				this.y += this.dy;
				break;				
			default:
				console.log("Undefined allowedKeys");
		}
	
		if(this.y < 0) { // reached water
			player.reset();
		}
		if(this.x < 0) {
			this.x = 0;
		}
		if(this.x > 400) {
			this.x = 400;
		}
		if(this.y > 400) {
			this.y = 375;
		}
}	

Player.prototype.reset = function() {
	this.x = 200; 
	this.y = 375;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyOne = new Enemy(0,60,60);
var enemyTwo = new Enemy(0,140,30);
var enemyThree = new Enemy(0,220,120);
allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
