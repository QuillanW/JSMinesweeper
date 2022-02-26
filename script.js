var bombLocations = [];

function create() {
    document.getElementById('controls').style.display = 'none';
    document.getElementById('reset').style.display = 'block';

    sizeX = document.getElementById('sizeX').value;
    sizeY = document.getElementById('sizeY').value;
    bombs = document.getElementById('bombInput').value;

    let l = 0;

    for (let i = 0; i < bombs; i++) {
        newBombLocation = Math.round(Math.random() * (sizeX * sizeY))
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
        newButton.id = i;
        newButton.classList.add('spotBtn');
        newButton.addEventListener('click', checkHit);

        if (posX == sizeX) {
            posX = 0;
            posY++;
        } else {
            posX++;
        }
        newButton.style.grid = posX + '/' + posY;
        gameContainer.appendChild(newButton);
    }
}

function checkHit() {
    console.log('checking')
    clicked = event.target.id;
    clickedBtn = event.target
    clickedXY = clicked / sizeX + 1.1
    let bombsNear = 0;
    let direction = 0;
    let fraction = 1 / sizeX;
    
    for (let i = 0; i < bombLocations.length; i++) {
        bombXY = (bombLocations[i] / sizeX + 1.1).toFixed(4)
        for (let l = 0; l < 8; l++) {
            if (l == 0) {direction = -1 - fraction;} 
            else if (l == 1) {direction = -1;}
            else if (l == 2) {direction = -1 + fraction;}
            else if (l == 3) {direction = -fraction;}
            else if (l == 4) {direction = fraction;}
            else if (l == 5) {direction = 1 - fraction;}
            else if (l == 6) {direction = 1;}
            else if (l == 7) {direction = 1 + fraction;}
            
            checkPos = (parseFloat(clickedXY) + direction).toFixed(4)

            console.log(checkPos, bombXY)

            if (checkPos == bombXY) {
                bombsNear++;
                console.log('found')
            }
        }
    }

    for (let i = 0; i < bombLocations.length; i++) {
        if (clicked == bombLocations[i]) {
            console.log('BOOM');
            clickedBtn.classList.add('boom')
        } else if (clicked != bombLocations[i]) {
            clickedBtn.classList.add('safe')
            if (bombsNear == 0) {
                bombsNear = ""
            }
            clickedBtn.innerHTML = bombsNear;
        }
    }
}

function reset() {
    location.reload()
}