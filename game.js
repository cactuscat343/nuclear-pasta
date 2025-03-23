const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50, y = 50, speed = 5;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 20, 20);
}

function update(event) {
    if (event.key === "ArrowRight") x += speed;
    if (event.key === "ArrowLeft") x -= speed;
    if (event.key === "ArrowUp") y -= speed;
    if (event.key === "ArrowDown") y += speed;
    draw();
}

document.addEventListener("keydown", update);
draw();
