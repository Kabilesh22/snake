const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = 400;
const rows = canvasSize / box;

let snake = [{ x: box * 5, y: box * 5 }];
let food = {
  x: Math.floor(Math.random() * rows) * box,
  y: Math.floor(Math.random() * rows) * box,
};
let score = 0;
let dx = box;
let dy = 0;
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -box;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = box;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -box;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = box;
    dy = 0;
  }
}

function draw() {
  if (gameOver) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    return endGame();
  }

  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) {
      return endGame();
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * rows) * box,
      y: Math.floor(Math.random() * rows) * box,
    };
  } else {
    snake.pop();
  }

  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e91e63";
  ctx.fillRect(food.x, food.y, box, box);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00bcd4" : "#4caf50";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function endGame() {
  gameOver = true;
  alert("Game Over! Your score was: " + score);
}

setInterval(draw, 100);
