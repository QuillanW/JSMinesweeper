const gameContainer = document.getElementById('container')
let gameWords = []
let wordLength = 5
let userLine = 1

document.getElementById('wordSize').addEventListener('change', sliderChange)
function sliderChange() {
    wordLength = document.getElementById('wordSize').value
    document.getElementById('wordSizeText').innerHTML = `Word size: ${wordLength} letters`
}

function createGame() {
    document.getElementById('startPage').style.display = 'none'
    gameContainer.style.display = 'block'
    createWordList()
    createNewWordle()
}

function createNewWordle() {
    if (document.getElementById('wordleGame')) {
        gameContainer.removeChild(document.getElementById('wordleGame'))
    }
    userLine = 1
    newWordle = document.createElement('div')
    newWordle.id = 'wordleGame'
    for (let i = 1; i < 7; i++) {
        var newInput = document.createElement('input')
        newInput.id = 'userInput' + i
        newInput.type = 'text'
        newInput.classList.add('inputField')
        newInput.addEventListener('change', checkInput)
        if (i != 1) {
            newInput.disabled = true
        }
        newWordle.appendChild(newInput)
    }
    gameContainer.appendChild(newWordle)
}

function createWordList() {
    for (let i = 0; i < words.length; i++) {
        if (words[i].length == wordLength) {
            gameWords.unshift(words[i])
        }
    }
}

function checkInput() {
    document.getElementById('userInput' + userLine).disabled = true
    userLine++
    if (userLine == 7) {
        createNewWordle()
    }
    document.getElementById('userInput' + userLine).disabled = false
    
}