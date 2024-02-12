const showRulesBtn = document.getElementById('rules-btn');
const closeRulesBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const bricks = [];
const countOfBricksInRow = 9;
const countOfBricksInCol = 5;

//Create Ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true,
};

//Create Paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
  visible: true,
};

// Create brick props
const brickInfo = {
  offsetX: 45,
  offsetY: 60,
  width: 70,
  height: 20,
  padding: 10,
  visible: true,
};

//Each column is a set of 5 bricks
for (let i = 0; i < countOfBricksInRow; i++) {
  bricks[i] = []; // set properties to an array
  for (let j = 0; j < countOfBricksInCol; j++) {
    const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;

    bricks[i][j] = { x, y, ...brickInfo }; // Array of the columns with the bricks inside.
  }
}

console.log(bricks);

//Draw Ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

//Draw Paddle
function drawPaddle() {
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
  ctx.closePath();
}

//Draw Score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Draw Bricks
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

//Move Paddle
function movePaddle() {
  paddle.x += paddle.dx;

  //Wall Detection
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//Move Ball
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball Bounce (Wall Collision)R&L
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // Means wherever it hits, it should just turn around on the left or right side.
  }

  // Ball Bounce (Wall Collision)T&B
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  /* ********************************** */
  // Ball Bounce (Paddle Collision) -> Case of the ball is running into paddel
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width && // -
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick Collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        //Checking to see if it hits any sides of the brick
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.width && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.height // bottom brick side check
        ) {
          // Bounce the ball & delete the brick
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    score = 0;
    showAllBricks();
  }
}

function increaseScore() {
  score++;
  if (score % (countOfBricksInRow * countOfBricksInCol) === 0) {
    showAllBricks();
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

function drawShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear The Entire Canvas

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas to make animation
function update() {
  movePaddle();
  moveBall();

  // Draw Everything
  drawShapes();

  requestAnimationFrame(update); // The method takes a callback as an argument to be invoked before the repaint.
}

update();

function keyDown(e) {
  // console.log(e.key);  =>  [ ArrowRight || ArrowLeft ]
  if (e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  } else if (e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    paddle.dx = 0; // This will stop it after one action.
  }
}

//Event Listeners
showRulesBtn.addEventListener('click', () => {
  rules.classList.add('show');
});

closeRulesBtn.addEventListener('click', () => {
  rules.classList.remove('show');
});

//Keyboard events
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
