const canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '1px solid'

//score
let score = 0

//canvas height and width
let ch = canvas.height
let cw = canvas.width

//ball starting position
let x = cw/2
let y = ch-30

let dx = 2
let dy = -2

//ball radius
const ballRadius = 10

//paddle 
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (cw - paddleWidth) / 2

//controllers
let rightPressed = false
let leftPressed = false

//bricks 
let bricks = []
let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30

for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
    }
}


document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler (e) {
    if (e.keyCode === 39) {
        rightPressed = true
    } else if (e.keyCode === 37) {
        leftPressed = true 
    }
}

function keyUpHandler (e) {
    if (e.keyCode === 39) {
        rightPressed = false
    } else if (e.keyCode === 37) {
        leftPressed = false
    }
}

//collision detection
function collisionDetection () {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r]

            //calculations
            if (b.status === 1) {
                if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy
                    b.status = 0
                }                
            }
        }
    }
}

//draw bricks
function drawBricks () {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = "#0095DD"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

//draw ball function to clear draw()
function drawBall () {

    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()

}

//draw the paddle
function drawPaddle () {
    ctx.beginPath()
    ctx.rect(paddleX, ch - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
}

//score function
function drawScore () {
    ctx.font = '16px Arial'
    ctx.fillStyle = '#0095DD'
    ctx.fillText('Score: ' + score, 8, 20)
}

//game- Drawing loop
function draw() {
    ctx.clearRect(0, 0, cw, ch) //clear canvas every time draw is called
    drawBall() //create the ball
    drawPaddle()
    drawBricks()
    collisionDetection()
    drawScore()
    x += dx
    y += dy

    //bounce from walls and game over on floor
    if(x + dx > cw - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
    
    if (y + dy < ballRadius) {
        dy = -dy
    //if the ball touch the floor is game over
    } else if (y + dy > ch - ballRadius) {
       if (x > paddleX && x < paddleX + paddleWidth) {
           dy = -dy
       } else {
           alert('Game Over')
           document.location.reload()
       }
    }

    //press keys
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7
    }
}

setInterval(draw, 10)