let posX = 0;
let posY = 0;
let keyState = {};
let obstaclePosition = 500;
let obstacleNumber = 0;
let score = 0;
let randomHeight = 0
let randomLocation = 0
let lost = false

function createGame() {
    document.getElementById('startPage').style.display = 'none'
    document.getElementById('container').style.display = 'block'
    document.getElementById('gameControls').style.display = 'block'
    startSpeed = parseInt(document.getElementById('startSpeed').value) * 300

    score += startSpeed
    
    var player = document.createElement('div')
    var container = document.getElementById('container');
    player.id = 'player'
    player.classList.add('player')
    container.appendChild(player)

    window.addEventListener('keydown',function(e){
        keyState[e.key] = true;
    },true);
    window.addEventListener('keyup',function(e){
        keyState[e.key] = false;
    },true);

    setInterval(gameLoop, 10)
    createObstacle();
}

function createObstacle() {
    randomHeight = (Math.random() * 350) + 50
    randomLocation = (Math.random() * 450)
    var newObstacle = document.createElement('div')
    newObstacle.classList.add('obstacle')
    newObstacle.id = 'obstacle'
    newObstacle.style.height = randomHeight + 'px'
    newObstacle.style.marginTop = randomLocation + 'px'
    container.appendChild(newObstacle)
}

function gameLoop() {
    var oldPosX = posX
    var oldPosY = posY

    if (keyState['w'] == true) {posY -= 3}
    if (keyState['a'] == true) {posX -= 3}
    if (keyState['s'] == true) {posY += 3}
    if (keyState['d'] == true) {posX += 3}
    if (posX < 0 || posX > 480) {posX = oldPosX}
    if (posY < 0 || posY > 480) {posY = oldPosY}

    player.style.marginTop = posY + 'px'
    player.style.marginLeft = posX + 'px'

    testPosX = posX
    testPosY = posY

    for (let i = 0; i < 4; i++) {
        if (i == 1) {testPosX += 20} else if (i == 2) {testPosX -= 20; testPosY += 20} else if (i == 3) {testPosX += 20}
        if ((testPosX > obstaclePosition && testPosX < (obstaclePosition + 50)) && (testPosY > randomLocation && testPosY < (randomLocation + randomHeight))) {
            lost = true
        }
    }

    if (lost) {
        location.reload();
        window.alert('You lost!');
    }

    var obstacle = document.getElementById('obstacle')

    for (let i = -10; i < Math.floor(score/100); i++) {
        obstaclePosition -= 0.1
    }
    
    obstacle.style.marginLeft = obstaclePosition + 'px'

    if (obstaclePosition < -50) {
        obstaclePosition = 510
        createObstacle();
        container.removeChild(obstacle)
    }

    score += 0.2
    document.getElementById('scoreCount').innerHTML = 'Score: ' + (score.toFixed(0) - startSpeed)
}