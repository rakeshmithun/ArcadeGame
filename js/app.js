'use strict'; //(from MDN: https://www.w3schools.com/js/js_strict.asp)
let gameStart = false;
const modal = document.getElementById('myModal');
const modal_content = document.querySelector('gameRules');
const btn = document.getElementById("myBtn");
const win_modal = document.getElementById('winModal');

let config = {
    player: {
        initial_X: 202,
        initial_Y: 404
    }
}

/* **************ENEMY SECTION*********** */
// setting up an enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor((Math.random() * 200) + 100);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 500) { this.x = -100; } // Enemies move horizontally (= ONLY change x-value)
        // Check if player collides with enemy
        checkCollision(this);
        if (player.y === this.y) {
            if (player.x > this.x - 75 && player.x < this.x + 75)
                player.resetPlayer();
            lives = hearts - 1; // Decrease Life 
            points.innerHTML = counter; // 
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/* **************PLAYER SECTION*********** */
// setting up the player using super class
class Player extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.lives = 3;
        this.sprite = 'images/char-horn-girl.png';
    }

    // This class requires an update()
    update() {}

    /* Player handleInput() method for ARROYKEYS */
    handleInput(keyCode) {
        switch (keyCode) {
            case 'left':
                if (this.x - 101 < 0) {
                    this.x = 0;
                } else {
                    this.x -= 101;
                }
                break;
            case 'right':
                if (this.x + 101 > 404) {
                    this.x = 404;
                } else {
                    this.x += 101;
                }
                break;
            case 'down':
                if (this.y + 85 > 404) {
                    this.y = 404;
                } else {
                    this.y += 83;
                }
                break;
            case 'up':
                if (this.y - 85 < 0) { // Player reaches water
                    this.resetPlayer(); // Player goes back to start
                    counter = counter + 1; // Increase Score 
                    points.innerHTML = counter; // Update score points in HTML
                } else {
                    this.y -= 83;
                }
                break;
        }
    }

    // Draw player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //moved resetPlayer into the player class
    resetPlayer(player) {
        setTimeout(() => {
            this.x = config.player.initial_X;
            this.y = config.player.initial_Y;
        }, 100);
    }
}

// Instantiate the objects.
let counter = 0;
const points = document.getElementById('points');
let player = new Player(202, 404);
let lives = document.querySelectorAll(".heart")

// Place all enemy objects in an array called allEnemies
const newEnemy = new Enemy(-100, 227.5, 50); //Define enemy (y-) position: to create enemies
const newEnemy1 = new Enemy(-100, 145, 50);
const newEnemy2 = new Enemy(-100, 61, 50);
let allEnemies = [newEnemy, newEnemy1, newEnemy2];

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Check collision functions
function checkCollision(oneEnemy) {
    if (player.x < oneEnemy.x + 80 &&
        player.x + 60 > oneEnemy.x &&
        player.y < oneEnemy.y + 80 &&
        40 + player.y > oneEnemy.y) {
        player.resetPlayer();
        counter = 0; // Player reaches water (without bug collision)= 1 point.
        points.innerHTML = counter;
        //removeLive(); // TO ADD: delete 1 life
        //lives = i - 1; //
    }
};

//player selection function
function choosePlayer(selection) {
    switch (selection) {
        case "cat":
            player.sprite = 'images/char-cat-girl.png';
            break;
        case "boy":
            player.sprite = 'images/char-boy.png';
            break;
        case "horn":
            player.sprite = 'images/char-horn-girl.png';
            break;
        case "pink":
            player.sprite = 'images/char-pink-girl.png';
            break;
        case "princess":
            player.sprite = 'images/char-princess-girl.png';
            break;
    }
}

//TODO: decrease life based on game play
// function removeLives() {
//     for (var i = 0; i < 3; i++) {
//         lives[i].style.visibility = (i < rating) ? "show" : "collapse";
//     }
// }

//event listener for start button and restart icon
document.querySelector(".restart").addEventListener("click", initGame, true);
document.getElementById("myBtn").addEventListener("click", startGame, true);

//start game function
function startGame() {
    statReset();
    gameStart = true;
    modal.style.display = "none";
};

//initialise game function
function initGame() {
    statReset();
    gameStart = false;
    modal.style.display = "block";
};

//stat reset function
function statReset() {
    lives = 3;
    counter = 0;
    points.innerHTML = counter;
    player.resetPlayer();
}

window.onload = initGame();