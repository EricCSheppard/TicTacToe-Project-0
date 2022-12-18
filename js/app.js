// console.log('hi')

// turn counter - odd turns and even turns to keep track of X or O

// finds the reset button
const reset = document.querySelector('#reset')
const container = document.querySelector('#container')

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

        // box.addEventListener('click', playBox)
    }
}

// runs the reset function when reset button is clicked
reset.addEventListener('click', initialState)


// loads the initial state once page is loaded
document.addEventListener('DOMContentLoaded', () => {
        initialState()
})