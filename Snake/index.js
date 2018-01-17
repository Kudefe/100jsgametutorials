/* ;(window.onload = () => { */
  const cvs = document.getElementById('canvas')
  const ctx = cvs.getContext('2d')
  cvs.style.border = '1px solid'

  //the unit
  const box = 32

  //load images
  const ground = new Image()
  ground.src = './img/ground.png'

  const foodImg = new Image()
  foodImg.src = './img/food.png'

  //audio
  const dead = new Audio()
  const eat = new Audio()
  const up = new Audio()
  const left = new Audio()
  const right = new Audio()
  const down = new Audio()

  dead.src = './audio/dead.mp3'
  eat.src = './audio/eat.mp3'
  up.src = './audio/up.mp3'
  down.src = './audio/down.mp3'
  right.src = './audio/right.mp3'
  left.src = './audio/left.mp3'

  //snake
  let snake = []
  snake[0] = {
    x: 9 * box,
    y: 10 * box
  }

  //food
  let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
  }

//score
let score = 0

//control snake
let d

document.addEventListener('keydown', direction)

function direction (e) {
  if (e.keyCode === 37 && d != 'RIGHT') {
    left.play()
    d = 'LEFT'
  } else if (e.keyCode === 38 && d != 'DOWN') {
    up.play()
    d = 'UP'
  } else if (e.keyCode === 39 && d != 'LEFT') {
    right.play()
    d = 'RIGHT'
  } else if (e.keyCode === 40 && d != 'UP') {
    down.play()
    d = 'DOWN'
  }
}

//collision
function collision (head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
}

//draw function
function draw () {

  ctx.drawImage(ground, 0, 0)

  //loop over snake
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? 'green' : 'white'
    ctx.fillRect(snake[i].x, snake[i].y, box, box)

    ctx.strokeStyle = 'red'
    ctx.strokeRect(snake[i].x, snake[i].y, box, box)
  }

  ctx.drawImage(foodImg, food.x, food.y)

  //old snake position
  let snakeX = snake[0].x
  let snakeY = snake[0].y


  //wich direction
  if ( d === 'LEFT') snakeX -= box
  if ( d === 'RIGHT') snakeX += box
  if ( d === 'UP') snakeY -= box
  if ( d === 'DOWN') snakeY += box

  //increment if eat
  if (snakeX === food.x && snakeY === food.y) {
    eat.play()
    score++
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    //remove the tail
    snake.pop()
  }

    //add new head
    let newHead = {
      x: snakeX,
      y: snakeY
    }

  //game over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3* box || snakeY > 17 * box || collision(newHead, snake)) {
    dead.play()
    clearInterval(game)
  }


  snake.unshift(newHead)

  //score
  ctx.fillStyle = 'white'
  ctx.font = '45px Changa one'
  ctx.fillText(score, 2 * box, 1.6 * box)


}

//call func every 100 ms
let game = setInterval(draw, 100)

/* })() */