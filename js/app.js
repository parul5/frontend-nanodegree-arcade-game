function Character() {};

Character.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	ctx.fillText(score, 10, 580);
}
// Enemies our player must avoid
var Enemy = function (pos) {
	Character.call(this);
	this.x = -100;

	// Setting the enemies on different lanes accordingly
	switch (pos) {
		case 0:
			this.y = 50;
			break;
		case 1:
			this.y = 140;
			break;
		case 2:
			this.y = 220;
			break;
		default:
	}

	// Randomly selecting speed of enemies
	this.speed = Math.floor(Math.random() * 300 + 200);

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.checkCollision();

	if (this.x <= 505) {
		this.x += this.speed * dt;
	} else {
		this.x = -100;
		this.speed = Math.floor(Math.random() * 300 + 200);
	}
};



// Enemy.prototype.render = function () {
// 	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

Enemy.prototype.checkCollision = function () {
	var charRectangle = {
		x: player.x,
		y: player.y,
		width: 50,
		height: 50
	};

	var ob = {
		width: 65,
		height: 50
	};

	if (charRectangle.x < this.x + ob.width &&
		charRectangle.x + charRectangle.width > this.x &&
		charRectangle.y < this.y + ob.height &&
		charRectangle.height + charRectangle.y > this.y) {
		player.x = TILE_WIDTH * 2;
		player.y = TILE_HEIGHT * 5 - 15;
		score = 0;
	}
};

var TILE_WIDTH = 101,
	TILE_HEIGHT = 83,
	score = 0;

// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
	Character.call(this);
	this.x = TILE_WIDTH * 2;
	this.y = TILE_HEIGHT * 5 - 15;
	this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Character.prototype);
Player.prototyppe = Player;

// Updating Player location according to inputs

Player.prototype.update = function (direction) {

	if (direction === 'up') {
		if (this.y < TILE_WIDTH) {
			score++;
			this.y = TILE_HEIGHT * 5 - 15;
		} else {
			this.y -= TILE_HEIGHT;
		}
	}
	if (direction === 'down') {
		if (this.y < TILE_HEIGHT * 4) {
			this.y += TILE_HEIGHT;
		}
	}
	if (direction === 'right') {
		if (this.x < TILE_WIDTH * 4) {
			this.x += TILE_WIDTH;
		}
	}
	if (direction === 'left') {
		if (this.x !== 0) {
			this.x -= TILE_WIDTH;
		}
	}

	ctx.font = "30px Arial";
};

// Player.prototype.render = function () {
// 	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// 	ctx.fillText(this.score, 10, 580);
// };


Player.prototype.handleInput = function (key) {
	if (key === 'left' || key === 'up' || key === 'right' || key === 'down') {
		this.update(key);
	}
};


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
	allEnemies.push(new Enemy(i));
}

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
