const resetButton = document.getElementById('reset-button')
let gameSquares = []

let colors = []
for (let i = 0; i < 10; i++) {
    colors.push('square-' + i)
}

//method
GameSquare.prototype.handleEvent = (e) => {
    switch (e.type) {
        case 'click':
        //if ignores the click when already open or locked
            if (this.isOpen || this.isLocked) {
                return;
            }
            this.isOpen = true
            this.el.classList.add('flip')
    }
}
//reset
GameSquare.prototype.reset = () => {
    this.isOpen = false
    this.isLocked = false
    this.el.classList.remove('flip')
}
//lock
GameSquare.prototype.lock = () => {
    this.isLocked = true
    this.isOpen = true
}
//set Color
GameSquare.prototype.setColor = (color) => {
    this.el.children[0].children[1].classList.remove(this.color)
    this.color = color
    this.el.children[0].children[1].classList.add(color)
}

function GameSquare (el, color) {
    this.el = el
    this.isOpen = false
    this.isLocked = false
    this.el.addEventListener('click', this, false)
    this.setColor(color)
}

function setUpGame () {
    let array = document.getElementsByClassName('game-square')
    for (var i = 0; i < array.length; i++) {
        gameSquares.push(new GameSquare(array[i]), colors[0])
    }
}

setUpGame()