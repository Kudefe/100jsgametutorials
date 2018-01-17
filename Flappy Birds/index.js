;(window.onload = function () {

let cvs = document.getElementById('canvas')
let context = cvs.getContext('2d')
cvs.style.border = '1px solid'

//load images

let bird = new Image ()
let bg = new Image ()
let fg = new Image ()
let pipeNorth = new Image ()
let pipeSouth = new Image ()

bird.src = './img/bird.png'
bg.src = './img/bg.png'
fg.src = './img/fg.png'
pipeNorth.src = './img/pipeNorth.png'
pipeSouth.src = './img/pipeSouth.png'

const gap = 90
let constant

//bird position
let bx = 10
let by = 150

const gravity = 1.5

let score = 0

//audio files
const fly = new Audio()
const scor = new Audio()

fly.src = './sounds/fly.mp3'
scor.src = './sounds/score.mp3'

//key down
document.addEventListener('keydown', moveUp)

function moveUp () {
    by -= 25
    fly.play()
}

//pipe coordenates
let pipe = []

pipe[0] = {
    x: cvs.width,
    y: 0
}

// draw images

function draw () {

    context.drawImage(bg, 0, 0)

    for (let i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap
        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y)
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant)

        pipe[i].x--

        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
            })
        }
        if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant) || by + bird.height >=  cvs.height - fg.height){
            location.reload() // reload the page
        }
        if (pipe[i].x === 5) {
            score++
            scor.play()
        }
    }

    context.drawImage(fg, 0, cvs.height - fg.height)
    context.drawImage(bird, bx, by)

    //bird gravity 
    by += gravity

    context.fillStyle='#000'
    context.font='20px sans-serif'
    context.fillText('Score : ' + score, 10, cvs.height - 20)
    
    
    

    requestAnimationFrame(draw)
    
}

draw();

})()
