const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Player setup
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: "blue",
    speed: 5,
    bullets: []
};

// Alien setup
const aliens = [];
const rows = 3;
const cols = 8;
const alienWidth = 40;
const alienHeight = 30;
const alienPadding = 20;

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        aliens.push({
            x: c * (alienWidth + alienPadding) + 50,
            y: r * (alienHeight + alienPadding) + 30,
            width: alienWidth,
            height: alienHeight,
            color: "red",
            alive: true
        });
    }
}

// Input handling
const keys = {};
document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        player.bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y, width: 5, height: 10, speed: 7 });
    }
});

// Game loop
function update() {
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;
    
    player.bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) player.bullets.splice(index, 1);
    });
    
    aliens.forEach((alien) => {
        player.bullets.forEach((bullet, bIndex) => {
            if (alien.alive && bullet.x < alien.x + alien.width && bullet.x + bullet.width > alien.x && bullet.y < alien.y + alien.height && bullet.y + bullet.height > alien.y) {
                alien.alive = false;
                player.bullets.splice(bIndex, 1);
            }
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    player.bullets.forEach(bullet => {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    aliens.forEach(alien => {
        if (alien.alive) {
            ctx.fillStyle = alien.color;
            ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
        }
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
