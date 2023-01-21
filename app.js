let currentPlayer = 1;
let playerLabel = document.querySelector(".current-player");
let p1s = 2;
let p2s = 1;
let player1score = document.querySelector(".p1s");
let player2score = document.querySelector(".p2s");
let winner = document.querySelector(".winner");
let resultsBox = document.querySelector(".results")

function createBoard() {
    let board = document.querySelector(".board");
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {

            let newButton = document.createElement("button");
            newButton.setAttribute("type", "button");
            newButton.setAttribute("data-x", `${x}`);
            newButton.setAttribute("data-y", `${y}`);
            // newButton.innerHTML = `${x}, ${y}`;
            newButton.classList.add("board-space");
            newButton.addEventListener("click", boardSpaceClick);

            if (y == 4 && x == 3) {
                newButton.classList.add("cross");
            }
            else if (y == 3 && x == 4) {
                newButton.classList.add("cross");
            }
            else if (y == 3 && x == 3) {
                newButton.classList.add("ring");
            }
            else if (y == 4 && x == 4) {
                newButton.classList.add("ring");
            }

            board.append(newButton);

        }
    }
}



function updateScore() {
    let ringAm = document.getElementsByClassName("ring");
    let ringArr = Array.from(ringAm);
    player1score.innerHTML = ringArr.length;

    let crossAm = document.getElementsByClassName("cross");
    let crossArr = Array.from(crossAm);
    player2score.innerHTML = crossArr.length;

    if (ringArr.length + crossArr.length >= 64) {
        if (ringArr.length > crossArr.length) {
            winner.innerHTML = 1;
        }
        else {
            winner.innerHTML = 2;
        }
        resultsBox.classList.toggle("hidden");
    }
}

function boardSpaceClick(event) {

    let start_x = parseInt(event.target.getAttribute("data-x"));
    let start_y = parseInt(event.target.getAttribute("data-y"));

    let directions = [
        { x: 0, y: -1 }, //uppåt
        { x: 1, y: -1 }, //uppåt höger
        { x: 1, y: 0 }, // höger
        { x: 1, y: 1 }, // ner höger
        { x: 0, y: 1 }, // ner
        { x: -1, y: 1 }, // ner vänster
        { x: -1, y: 0 }, // vänster
        { x: -1, y: -1 } // vänster uppåt
    ];



    if (currentPlayer == 1 && event.target.classList.contains("ring") == false &&
        event.target.classList.contains("cross") == false) {
        event.target.classList.add("ring");
        currentPlayer = 2;
        playerLabel.innerHTML = currentPlayer;


        for (let direction = 0; direction < 8; direction++) {
            let new_x = start_x;
            let new_y = start_y;
            let tilesThatCouldFlip = [];
            let tilesShouldFlip = false;
            let done = false;
            while (done === false) {
                new_x += directions[direction].x;
                new_y += directions[direction].y;
                if (new_x < 0 || new_x > 7 || new_y < 0 || new_y > 7) {
                    done = true;
                    break;
                }
                let checkTile = document.querySelector(`[data-x='${new_x}'][data-y='${new_y}']`);
                if (checkTile === null) {
                    done = true;
                    break;
                }
                console.log(checkTile);
                if (checkTile.classList.contains("cross")) {
                    tilesThatCouldFlip.push(checkTile);
                }
                else if (checkTile.classList.contains("ring")) {
                    done = true;
                    tilesShouldFlip = true;
                    break;
                }
                else {
                    done = true;
                    break;
                }
            }
            if (tilesShouldFlip) {
                tilesThatCouldFlip.forEach((tile) => {
                    tile.classList.remove("cross");
                    tile.classList.add("ring");
                });
            }

        }

    }
    else if (currentPlayer == 2 && event.target.classList.contains("ring") == false &&
        event.target.classList.contains("cross") == false) {
        event.target.classList.add("cross");
        currentPlayer = 1;
        playerLabel.innerHTML = currentPlayer;

        for (let direction = 0; direction < 8; direction++) {
            let new_x = start_x;
            let new_y = start_y;
            let tilesThatCouldFlip = [];
            let tilesShouldFlip = false;
            let done = false;
            while (done === false) {
                new_x += directions[direction].x;
                new_y += directions[direction].y;
                if (new_x < 0 || new_x > 7 || new_y < 0 || new_y > 7) {
                    done = true;
                    break;
                }
                let checkTile = document.querySelector(`[data-x='${new_x}'][data-y='${new_y}']`);
                if (checkTile === null) {
                    done = true;
                    break;
                }
                if (checkTile.classList.contains("ring")) {
                    tilesThatCouldFlip.push(checkTile);
                }
                else if (checkTile.classList.contains("cross")) {
                    done = true;
                    tilesShouldFlip = true;
                    break;
                }
                else {
                    done = true;
                    break;
                }
            }
            if (tilesShouldFlip) {
                tilesThatCouldFlip.forEach((tile) => {
                    tile.classList.remove("ring");
                    tile.classList.add("cross");
                });
            }
        }
    }

    updateScore();
}



createBoard();