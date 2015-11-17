var score = [0, 0],
    cells = document.getElementsByClassName('game-cell'),
    playerChar = ['X', 'O'],
    playerName = ['You', 'CPU'],
    turn = 0;

newGame(score);

for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function () {
        listenClickCell(this);
    };
}

function highlighted(player) {
    var names = document.getElementsByClassName('score-name');
    names[+player].classList.add("active");
    names[+(!player)].classList.remove("active");
}

function listenClickCell(cell) {
    var playState;
    if (cell.innerHTML == '') {
        cell.innerHTML = playerChar[turn];
        playState = playerState(playerChar[turn]);
        if (!checkWin(playState)) {
            turn = +(!turn);
            highlighted(turn);
        } else {
            gameOver(turn);
            return true;
        }
        if (!hasEmptyCell()) {
            gameOver(false);
            return true;
        }
    }
}

function gameOver(playerWin) {
    var message, isNewGame;
    if (playerWin !== false) {
        message = playerName[playerWin] + " win!";
        score[turn] = +score[playerWin] + 2;
    } else {
        message = "Draw!";
        score[0] = +score[0] + 1;
        score[1] = +score[1] + 1;
    }
    setScore(score);
    isNewGame = confirm(message + "Do you want to continue the game?");
    if (isNewGame) {
        newGame(score);
    } else {
        newGame([0, 0]);
    }
}

function hasEmptyCell() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == '') {
            return true;
        }
    }
    return false;
}

function playerState(playChar) {
    var playerArray = [];
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == playChar) {
            playerArray.push(1);
        } else {
            playerArray.push(0);
        }
    }
    return parseInt(playerArray.join(''), 2);
}

function checkWin(playState) {
    var winArr = [292, 146, 73, 448, 56, 7, 273, 84],
        isWin = false;
    winArr.forEach(function (item, i, Arr) {
        if ((item & playState) == item) {
            isWin = true;
        }
    });
    return isWin;
}

function newGame(score) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    setScore(score);
    highlighted(0);
}

function setScore(score) {
    document.getElementById('score-user').innerHTML = score[0];
    document.getElementById('score-cpu').innerHTML = score[1];
}
