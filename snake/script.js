let direction = '';
let pressedKey = '';
let headLocation = 10.50

function createGame() {
    document.getElementById('startPage').style.display = 'none'
    let startGameInterval = 1000 - ((document.getElementById('startInterval').value - 1) * 100)
    if (startGameInterval < 100) {
        window.alert('Invalid game speed')
        location.reload()
    }
    setInterval(gameTick, startGameInterval)
    console.log(startGameInterval)
    document.addEventListener('keydown', function(e) {
        pressedKey = e.key
    });

    var container = document.getElementById('container')
    container.style.display = 'grid';

    for (let i = 1; i <= 400; i++) {
        var newSpot = document.createElement('div');
        newSpot.id = (i / 20).toFixed(2);
        newSpot.classList.add('spot');
        container.appendChild(newSpot);

        var posX = 0;
        var posY = 0;

        if (posX > 20) {
            posY++;
            posX = 0;
        } else {
            posX++;
        }

        newSpot.style.grid = posX + '/' + posY;
    }
    document.getElementById(headLocation.toFixed(2)).classList.add('head')
}

function gameTick() {
    document.getElementById(headLocation.toFixed(2)).classList.remove('head')
    if (pressedKey == 'a' && direction == 'd') {
        pressedKey = 'd';
    } else if (pressedKey == 'd' && direction == 'a') {
        pressedKey = 'a';
    } else if (pressedKey == 'w' && direction == 's') {
        pressedKey = 's';
    } else if (pressedKey == 's' && direction == 'w') {
        pressedKey = 'w';
    }

    var oldHeadlocation = headLocation
    
    if (pressedKey == 'w' && direction != 's') {
        headLocation--;
    } else if (pressedKey == 'a' && direction != 'd') {
        headLocation = headLocation - 0.05;
    } else if (pressedKey == 's' && direction != 'w') {
        headLocation++;
    } else if (pressedKey == 'd' && direction != 'a') {
        headLocation = headLocation + 0.05;
    }

    if (headLocation >= 20 || headLocation < 0 || (Math.floor(headLocation) < Math.floor(oldHeadlocation) && direction == 'a') || (Math.floor(headLocation -0.05) > Math.floor(oldHeadlocation) && direction == 'd')) {
        gameEnd(false)
    }

    direction = pressedKey;
    document.getElementById(headLocation.toFixed(2)).classList.add('head')
}

function gameEnd(win) {
    if (win == false) {
        window.alert('You lost!')
        location.reload()
    }
}