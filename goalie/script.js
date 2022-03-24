const gameContainer = document.getElementById('container')

function createGame() {
    document.getElementById('startPage').style.display = 'none'
    document.getElementById('gameControls').style.display = 'block'
    gameContainer.style.display = 'block'

    var newGoal = document.createElement('img')
    newGoal.id = 'goal'
    newGoal.src = 'goal.png'
    gameContainer.appendChild(newGoal)

    var newPlayer = document.createElement('img')
    newPlayer.id = 'player'
    newPlayer.src = ''
}