let animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame

let canvas = document.createElement('canvas')
let width = 400
let height = 600
canvas.width = width
canvas.height = height
const context = canvas.getContext('2d')

window.onload = function() {
  document.body.appendChild(canvas)
  animate(step)
}

var keysDown = {}

window.addEventListener('keydown', function(event) {
  keysDown[event.keyCode] = true
})

window.addEventListener('keyup', function(event) {
  delete keysDown[event.keyCode]
})

let step = function() {
  update()
  render()
  animate(step)
}

let update = function () {
  player.update()
  computer.update(ball)
  ball.update(player.paddle, computer.paddle)
}

function Paddle (x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.x_speed = 0
  this.y_speed = 0
}

Paddle.prototype.render = function() {
  context.fillStyle = '#0000FF'
  context.fillRect(this.x, this.y, this.width, this.height)
}

function Player () {
  this.paddle = new Paddle(175, 580, 50, 10)
}


function Computer () {
  this.paddle = new Paddle(175, 20, 50, 10)
}

Player.prototype.render = function() {
  this.paddle.render()
}

Computer.prototype.render = function() {
  this.paddle.render()
}

function Ball(x, y) {
  this.x = x
  this.y = y
  this.x_speed = 0
  this.y_speed = 3
  this.radius = 5
}

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key)
    if (value == 37) { //left arrow
      console.log('left!')
      this.paddle.move(-4, 0)
    } else if (value == 39) { //derecha
      console.log('!')
      this.paddle.move(4, 0)
    } else {
      this.paddle.move(0, 0)
    }
  }
}

Computer.prototype.update = function(ball) {
  var x_pos = ball.x
  var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos)
  if(diff < 0 && diff < -4) {
    diff = -5
  } else if (diff > 0 && diff > 4) {
    diff = 5
  }
  this.paddle.move(diff, 0)
  if(this.paddle.x < 0) {
    this.paddle.x = 0
  } else if (this.paddle.x + this.paddle.width > 400) {
    this.paddle.x = 400 - this.paddle.width
  }
}

Paddle.prototype.move = function(x, y) {
  this.x += x
  this.y += y
  this.x_speed = x
  this.y_speed = y
  if(this.x < 0) {
    this.x = 0
    this.x_speed = 0
  } else if (this.x + this.width > 400) {
    this.x = 400 - this.width
    this.x_speed = 0
  }
}

Ball.prototype.render = function() {
  context.beginPath()
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false)
  context.fillStyle = '#000000'
  context.fill()
}

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed
  this.y += this.y_speed
  var top_x = this.x -5
  var top_y = this.y - 5
  var bottom_x = this.x + 5
  var bottom_y = this.y + 5

  if (this.x + 5 < 0) {
    this.x = 5
    this.x_speed = -this.x_speed
  } else if (this.x + 5 > 400)
  {
    this.x = 395
    this.x_speed = -this.x_speed
  }

  if (this.y < 0 || this.y > 600) {
    this.x_speed = 0
    this.y_speed = 3
    this.x = 200
    this.y = 300
  }

  if (top_y > 300) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      this.y_speed = -3
      this.x_speed += (paddle1.x_speed / 2)
      this.y += this.y_speed
    }
    } else {
      if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
        // hit the computer's paddle
        this.y_speed = 3
        this.x_speed += (paddle2.x_speed / 2)
        this.y += this.y_speed
    }
  }
}

let player = new Player()
let computer = new Computer()
let ball = new Ball(200, 300)

let render = function() {
  context.fillStyle = '#FF00FF'
  context.fillRect(0, 0, width, height)
  player.render()
  computer.render()
  ball.render()
}

