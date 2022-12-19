// A user should be able to click on different squares to make a move.
// Every click will alternate between marking an X and O
// Upon marking of an individual cell, use JavaScript to add an X or O to the cell, according to whose turn it is.
// A cell should not be able to be replayed once marked.
// You should not be able to click remaining empty cells after the game is over.
// Add a reset button that will clear the contents of the board.
// Display a message to indicate which turn is about to be played.
// Detect draw conditions (ties/cat's game)
// Detect winner: Stop game and declare the winner if one player ends up getting three in a row.
// Hint: Determine a set of winning combinations. Check those combinations on the board contents after every move.
//
// turn counter - odd turns and even turns to keep track of X or O

// finds the reset button
const reset = document.querySelector('#reset')
const container = document.querySelector('#container')

const xClass = 'x'
const oClass = 'o'
const WinCon = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
] 
let moves = 1
let playerO = false



const playBox = (event) => {
    const box = event.target
    const currentClass = playerO ? oClass : xClass
    placeMark(box, currentClass)
    moves ++
    playerTurn()
    console.log('Number of moves:', moves)
    console.log(playerO)

} 

const placeMark = (box, currentClass) => {
    box.classList.add(currentClass)
}

const playerTurn = () => {
    if ((moves % 2) === 0 && moves !== 1) {
        playerO = true
    } else {
        playerO = false
    } 
}

// make game board and squares within
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

const resetGame = () => {
    console.log('pressed reset button')
    moves = 0
    playerO = false
    initialState()
}

// runs the reset function when reset button is clicked
reset.addEventListener('click', resetGame)


// loads the initial state once page is loaded
document.addEventListener('DOMContentLoaded', () => {
        initialState()
})