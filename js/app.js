'use strict'; //(from MDN: https://www.w3schools.com/js/js_strict.asp)
let gameStart = false;
const modal = document.getElementById('myModal');
const modal_content = document.querySelector('gameRules');
const btn = document.getElementById("myBtn");

const win_modal = document.getElementById('winModal'); //Declare Modal score settings

window.onload = restartGame();
if (gameStart === true) {
    modal.style.display = "none";
} else {
    modal.style.display = "block";
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

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 500) { this.x = -100; } // Enemies move horizontally (= ONLY change x-value)
        // Check if player collides with enemy
        checkCollision(this);
        if (player.y === this.y) {
            if (player.x > this.x - 75 && player.x < this.x + 75)
                player.resetPosition();
            //lives.count = 0;
            lives = hearts - 1; // Decrease Live 
            points.innerHTML = counter; // 
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

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


    /* Player handleInput() method for ARROYKEYS */
    handleInput(keyCode) {
        switch (keyCode) {
            case 'left':
                if (this.x - 101 < 0) {
                    this.x = 0;
                } else {
                    this.x -= 101;
                }
                console.log('left');
                break;
            case 'right':
                if (this.x + 101 > 404) {
                    this.x = 404;
                } else {
                    this.x += 101;
                }
                console.log('right');
                break;
            case 'down':
                if (this.y + 85 > 404) {
                    this.y = 404;
                } else {
                    this.y += 83;
                }
                console.log('down');
                break;
            case 'up':
                if (this.y - 85 < 0) { // Player reaches water
                    resetPlayer(); // Player goes back to start
                    counter = counter + 1; // Increase Score 
                    points.innerHTML = counter; // Update score points in HTML
                } else {
                    this.y -= 83;
                }
                console.log('up');
                break;
        }
        console.log('player.handleInput');
    }

    // Draw player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
let counter = 0;
const points = document.getElementById('points');
let player = new Player(202, 404); //Define player (x-)position: (0, 0 is top left corner) & (505 / 2 - 50.5 = 202) 
let lives = 3;
const hearts = document.getElementById('hearts');

// Place all enemy objects in an array called allEnemies
const newEnemy = new Enemy(-100, 227.5, 50); //Define enemy (y-) position: to create enemies
const newEnemy1 = new Enemy(-100, 145, 50);
const newEnemy2 = new Enemy(-100, 61, 50);
let allEnemies = [newEnemy, newEnemy1, newEnemy2];

// Place the player object in a variable called player
//let player = { player: "player" };

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

function checkCollision(oneEnemy) {
    if (player.x < oneEnemy.x + 80 &&
        player.x + 60 > oneEnemy.x &&
        player.y < oneEnemy.y + 80 &&
        40 + player.y > oneEnemy.y) {
        resetPlayer();
        counter = 0; // Player reaches water (without bug collision)= 1 point.
        console.log(points);
        points.innerHTML = counter;
        //removeLive(); // TO ADD: delete 1 live
        //lives = i-1;//
        //console.log(hearts);
    }
};

const choosePlayer = (selection) => {
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

function showLives() { // Generate html to display hearts-lives
    let lives = document.getElementById("lives");
    let heartHtml = ['<img src="images/Heart.png">'];
    lives.innerHTML = heartHtml;

    for (let i = 0; i < 3; i++) {
        stars[i].style.visibility = (i < rating) ? "show" : "collapse";
    }
}

function restartGame() {
    btn.addEventListener("click", function(e) {
        lives = 3;
        counter = 0;
        gameStart = true;
        modal.style.display = "none";
    })
};

function resetPlayer() {
    setTimeout(function() {
        player.x = 202;
        player.y = 404;
    }, 100);
}