const gameContainer = document.getElementById('container')
let gameWords = []
let wordLength = 5
let userLine = 1
let correctWord = ''
let key = ''
let currentLetter = 0
let wordInput = ''
let checkLetter = false
let score = 0

document.getElementById('wordSize').addEventListener('change', sliderChange)
function sliderChange() {
    wordLength = document.getElementById('wordSize').value
    document.getElementById('wordSizeText').innerHTML = `Word size: ${wordLength} letters`
}

document.addEventListener('keydown', function () {
    var removeLetter = (event.key == 'Backspace')
    var isLetter = /^[a-z]$/i.test(event.key)
    var finishLine = (event.key == 'Enter')

    if (isLetter) {
        if (currentLetter < wordLength) {
            currentLetter++
            wordInput += event.key
            var inputBox = document.getElementById('inputBox' + userLine)
            var newLetter = document.createElement('div')
            newLetter.id = 'letter' + userLine + currentLetter
            newLetter.classList.add('letter')
            newLetter.innerHTML = event.key
            inputBox.appendChild(newLetter)
        }
    }

    if (removeLetter) {
        if (currentLetter != 0) {
            document.getElementById('letter' + userLine + currentLetter).remove()
            wordInput = wordInput.slice(0, -1)
            currentLetter--
        }
    }

    if (finishLine && (currentLetter == wordLength)) {
        checkInput()
    }
})

function createGame() {
    document.getElementById('startPage').style.display = 'none'
    gameContainer.style.display = 'block'
    createWordList()
    createNewWordle()
}

function createWordList() {
    for (let i = 0; i < words.length; i++) {
        if (words[i].length == wordLength) {
            gameWords.unshift(words[i])
        }
    }
}

function createNewWordle() {
    if (document.getElementById('wordleGame')) {
        gameContainer.removeChild(document.getElementById('wordleGame'))
    }
    userLine = 1
    currentLetter = 0
    wordInput = ''
    checkLetter = false
    newWordle = document.createElement('div')
    newWordle.id = 'wordleGame'
    for (let i = 1; i < 7; i++) {
        var newInputBox = document.createElement('div')
        newInputBox.id = 'inputBox' + i
        newInputBox.classList.add('inputBox')
        newWordle.appendChild(newInputBox)
    }
    gameContainer.appendChild(newWordle)
    document.getElementById('inputBox' + userLine).classList.add('inputActive')
    correctWord = gameWords[Math.floor(Math.random() * gameWords.length)]
}

function checkInput() {
    if (wordInput.toLowerCase() == correctWord) {
        finishGame(true)
    } else {
        for (let i = 0; i < gameWords.length; i++) {
            if ((wordInput) == gameWords[i]) {
                document.getElementById('inputBox' + userLine).classList.remove('inputActive')
                userLine++
                if (userLine < 7) {
                    document.getElementById('inputBox' + userLine).classList.add('inputActive')
                }
                currentLetter = 0
                checkLetter = true
            }
        }

        if (userLine == 7) {
            window.alert(`Too many tries!\nThe correct word was ${correctWord}`)
            createNewWordle()
        } else {
            if (checkLetter) {
                for (let i = 0; i < wordLength; i++) {
                    var correctLetter = correctWord.slice(i, i + 1)
                    var letter = wordInput.slice(i, i + 1);
                    if (letter == correctLetter) {
                        document.getElementById('letter' + (userLine - 1) + (i + 1)).classList.add('fullCorrectLetter')
                    } else {
                        let letterCorrect = false
                        for (let l = 0; l < wordLength; l++) {
                            if (letter == correctWord.slice(l, l + 1)) {
                                document.getElementById('letter' + (userLine - 1) + (i + 1)).classList.add('correctLetter')
                                letterCorrect = true
                            }
                        }
                        if (!letterCorrect) {
                            document.getElementById('letter' + (userLine - 1) + (i + 1)).classList.add('incorrectLetter')
                        }
                    }
                }
                wordInput = ''
                checkLetter = false
            }
        }
    }
}

function finishGame(win) {
    if (win) {
        window.alert('Correct!')
        score++
        document.getElementById('scoreCounter').innerHTML = 'Score: ' + score
    }
    createNewWordle()
}