const reset = document.querySelector('#reset')
const clearWins = document.querySelector('#clearwins')
const body = document.querySelector('#body')
const wins = document.querySelector("#wins")
const container = document.querySelector('#container')
const indicator = document.querySelector('#indicator')
const xClass = 'X'
const oClass = 'O'
let moves = 1
let playerX = true
const winCon = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
]
let playerOMoves = []
let playerXMoves = []

const playBox = (event) => {
    const box = event.target
    const currentClass = playerX ? xClass : oClass
    placeMark(box, currentClass)
    if (playerX === false) {
        playerOMoves.push(event.target.id)
    } else {
        playerXMoves.push(event.target.id)
    }
    printWin(moves, checkWin())
    moves ++
    playerTurn()
} 

const placeMark = (box, currentClass) => {
    box.classList.add(currentClass)
}

const playerTurn = () => {
    if ((moves % 2) === 0 && (moves !== 1)) {
        indicator.classList.remove('X')
        indicator.classList.add('O')
        playerX = false
    } else {
        indicator.classList.remove('O')
        indicator.classList.add('X')
        playerX = true
    } 
}

const checkWin = () => {
    for(i = 0; i < winCon.length; i++) {
        if(findWinCombo(playerXMoves, winCon[i]) === true) {
            return true
        } else if (findWinCombo(playerOMoves, winCon[i]) === true) {
            return false
        } 
    }
    return null
}  

const printWin = (moves, result) => {
    if (result === true | result === false | (result === null && moves === 9)) {
        if (result === true) {
            const xWin = document.createElement('div')
            xWin.classList.add('X')
            xWin.setAttribute('id', 'win')
            wins.appendChild(xWin)
            gameOverX()
        } else if (result === false) {
            const oWin = document.createElement('div')
            oWin.classList.add('O')
            oWin.setAttribute('id', 'win')
            wins.appendChild(oWin)
            gameOverO()
        } else if (moves === 9 && result === null) {
            const tWin = document.createElement('div')
            tWin.classList.add('T')
            tWin.setAttribute('id', 'win')
            wins.appendChild(tWin)
            gameOverTie()
        }
    } 
}
const findWinCombo = (array1, array2) => {
    const checkFor = (box) => {
        return array1.includes(box)
    }
    return array2.every(checkFor) 
}

const initialState = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    for (let i = 1; i < 10; i++) {
        const box = document.createElement('div')
        box.classList.add('box')
        container.appendChild(box)
        box.setAttribute('id', i)
        box.addEventListener('click', playBox)
        indicator.classList.add('X')
    }
}

const gameOverX = () => {
    container.childNodes.forEach(
        function(node) {
            node.classList.remove('O')
            node.classList.add('X')
            document.getElementById('indicator').style.backgroundColor = 'aqua'
        }
    )
    
}

const gameOverO = () => {
    container.childNodes.forEach(
        function(node) {
            node.classList.remove('X')
            node.classList.add('O')
            document.getElementById('indicator').style.backgroundColor = 'blueviolet'
        }
    )
}

const gameOverTie = () => {
    container.childNodes.forEach(
        function(node) {
            node.classList.remove('X')
            node.classList.remove('O')
            node.classList.add('T')
            document.getElementById('indicator').style.backgroundColor = 'gray'
        }
    )
}


const resetGame = () => {
    moves = 1
    playerX = true
    initialState()
    playerOMoves = []
    playerXMoves = []
    indicator.classList.remove('O')
    indicator.style.removeProperty('background-color')
}

const resetCounter = () => {
while (wins.firstChild) {
    wins.removeChild(wins.firstChild)
}
}




reset.addEventListener('click', resetGame)

clearWins.addEventListener('click', resetCounter)

document.addEventListener('DOMContentLoaded', () => {
        initialState()
})