;(window.onload = function () {

    const cvs = document.getElementById('canvas')
let context = cvs.getContext('2d')
cvs.style.border = '1px solid'

//load images

let bird = new Image ()
let bg = new Image ()
let fg = new Image ()
let pipeNorth = new Image ()
let pipeSouth = new Image ()

bird.src = './bird.png'
bg.src = './bg.png'
fg.src = './fg.png'
pipeNorth.src = './pipen.png'
pipeSouth.src = './pipes.png'

// draw images

function draw () {
    context.drawImage(bg, 0, 0, 288, 512)    
}

draw();
})()
