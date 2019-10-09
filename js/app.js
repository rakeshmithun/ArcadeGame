'use strict'; //(from MDN: https://www.w3schools.com/js/js_strict.asp)

/* **************ENEMY SECTION*********** */
// setting up an enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
};

let allEnemies = [];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* **************PLAYER SECTION*********** */
// setting up the player class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lives = 3;
        this.sprite = 'images/char-horn-girl.png';
    }


    // This class requires an update()
    update() {
            showLives(this.lives);
        }
        //render() and
        // a handleInput() method.
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Place the player object in a variable called player
let player = { player: "player" };

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