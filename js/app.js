const reset = document.querySelector('#reset')
const container = document.querySelector('#container')
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
        playerX = false
    } else {
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
            gameOverX()
        } else if (result === false) {
            gameOverO()
        } else if (moves === 9 && result === null) {
            resetGame()
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
    }
}

const gameOverX = () => {
    container.childNodes.forEach(
        function(node) {
            node.classList.remove('O')
            node.classList.add('X')
        }
    )
}

const gameOverO = () => {
    container.childNodes.forEach(
        function(node) {
            node.classList.remove('X')
            node.classList.add('O')
        }
    )
}

const resetGame = () => {
    moves = 1
    playerX = true
    initialState()
    playerOMoves = []
    playerXMoves = []
}

reset.addEventListener('click', resetGame)

document.addEventListener('DOMContentLoaded', () => {
        initialState()
})