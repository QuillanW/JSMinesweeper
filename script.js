var bombLocations = [];

function create() {
    document.getElementById('controls').style.display = 'none';
    document.getElementById('reset').style.display = 'block';

    sizeX = document.getElementById('sizeX').value;
    sizeY = document.getElementById('sizeY').value;
    bombs = document.getElementById('bombInput').value;

    let l = 0;

    for (let i = 0; i < bombs; i++) {
        newBombLocation = Math.round(Math.random()*(sizeX * sizeY))
        for (let l = 0; l < bombLocations.length; l++) {
            if (newBombLocation == bombLocations[l]) {
                newBombLocation++;
            }
        }
        bombLocations.push(newBombLocation)
    }

    console.log(bombLocations)

    let posX = 0;
    let posY = 0;

    var gameContainer = document.getElementById('container');

    gameContainer.style.width = sizeX * 20 + "px";
    gameContainer.style.height = sizeY * 20 + "px";
    gameContainer.style.gridTemplateRows = `repeat(${sizeY}, 20px)`;
    gameContainer.style.gridTemplateColumns = `repeat(${sizeX}, 20px)`;

    for (let i = 0; i < (sizeX * sizeY); i++) {
        var newButton = document.createElement('button');
        newButton.id = 'spot' + i;
        newButton.classList.add('spotBtn');
        newButton.addEventListener('click', checkHit);
        
        if (posX == sizeX) {
            posX = 0;
            posY++;
        } else {
            posX++;
        }
        newButton.style.grid = posX + '/' + posY;
        newButton.name = (posX) + "" + posY
        gameContainer.appendChild(newButton);
    }
}

function checkHit() {
    clicked = event.target.id.replace("spot", "");
    clickedBtn = event.target

    let bombsNear = 0;

    checkPos = clicked - 1

    for (let i = 0; i < bombLocations.length; i++) {
        if (checkPos == bombLocations[i]) {
            bombsNear++;
        }
    }

    for (let i = 0; i < bombLocations.length; i++) {
        if (clicked == bombLocations[i]) {
            console.log('BOOM');
            clickedBtn.classList.add('boom')
        } else if (clicked != bombLocations[i]) {
            clickedBtn.classList.add('safe')
            clickedBtn.innerHTML = bombsNear;
        }
    }
}

function reset() {
    location.reload()
}