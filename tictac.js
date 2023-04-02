const choiceButtons = document.querySelectorAll(".btn-box");
const playButtons = document.querySelectorAll(".play-btn");
const home = document.querySelector("#home");
const board = document.querySelector("#board");
const xScoreText = document.querySelector("#x-score-text");
const oScoreText = document.querySelector("#o-score-text");
const xScoreElement = document.querySelector("#x-score");
const oScoreElement = document.querySelector("#o-score");
const tieScoreElement = document.querySelector("#tie-score")
const turnInfoImage = document.querySelector(".turn-box img");
const modal  = document.querySelector("#modal");
const modalTie  = document.querySelector("#modal-tie");
const modalRestart  = document.querySelector("#modal-restart");
const modalInfoText = document.querySelector(".result-info-text");
const modalIcon =document.querySelector(".modal-box img");
const modalResultText = document.querySelector(".result-text");

let player1 = "x";
let mode ="cpu";
let turn ="x";
let freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let xScore = 0;
let tieScore = 0;
let oScore = 0;
let winnerCombinitions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const activateChoice = (icon) => {
    if (icon === "x") {
        choiceButtons[0].classList.add("active");
        choiceButtons[1].classList.remove("active");
        player1 = "x";
    }
    else {
        choiceButtons[1].classList.add("active");
        choiceButtons[0].classList.remove("active");
        player1 = "o";
    }
    
};

const checkXwin = () => {
    return winnerCombinitions.find(combination => 
    combination.every(button => xArray.includes(button))
    );
};

const checkOwin = () => {
    return winnerCombinitions.find(combination => 
    combination.every(button => oArray.includes(button))
    );
};


const onWinX = () => {
    modal.style.display = "flex";
    modalIcon.src = "./icon-x.svg";
    modalResultText.style.color = "#31C3BD";
    xScore++;
    xScoreElement.textContent = xScore;
    if (player1 === "x") {
        modalInfoText.textContent = "you won!";
    } else {
        modalInfoText.textContent = "OH NO, YOU LOST...";
    }
};


const onWinO = () => {
    modal.style.display = "flex";
    modalIcon.src = "./icon-o.svg";
    modalResultText.style.color = "#F2B137";
    oScore++;
    oScoreElement.textContent = oScore;
    if (player1 !== "x") {
        modalInfoText.textContent = "you won!";
    } else {
        modalInfoText.textContent = "OH NO, YOU LOST...";
    }
};

const winningStyle = (array) => {
    playButtons[array[0]].firstElementChild.src = "./icon-x-win.svg";
    playButtons[array[1]].firstElementChild.src = "./icon-x-win.svg";
    playButtons[array[2]].firstElementChild.src = "./icon-x-win.svg";
    if(turn === "x") {
        playButtons[array[0]].style.background = "#65E9E4";
        playButtons[array[1]].style.background = "#65E9E4";
        playButtons[array[2]].style.background = "#65E9E4";
        playButtons[array[0]].firstElementChild.src = "./icon-x-win.svg";
        playButtons[array[1]].firstElementChild.src = "./icon-x-win.svg";
        playButtons[array[2]].firstElementChild.src = "./icon-x-win.svg";
    } else {
        playButtons[array[0]].style.background = "#F2B137";
        playButtons[array[1]].style.background = "#F2B137";
        playButtons[array[2]].style.background = "#F2B137";
        playButtons[array[0]].firstElementChild.src = "./icon-o-win.svg";
        playButtons[array[1]].firstElementChild.src = "./icon-o-win.svg";
        playButtons[array[2]].firstElementChild.src = "./icon-o-win.svg";
    }
};

const onHoverEffects = () => {
    for (let index = 0; index < freeButtons.length; index++) {
        const playButtonIndex = freeButtons[index];
        if(turn === "x") {
        playButtons[playButtonIndex].classList.add("xHover");
        playButtons[playButtonIndex].classList.remove("oHover");
        } else {
         playButtons[playButtonIndex].classList.add("oHover");
         playButtons[playButtonIndex].classList.remove("xHover");
        }
    }
}

const createClickedFunction = () => {
    for (let index = 0; index < playButtons.length; index++) {
        playButtons[index].style.background = "#1F3641";
        playButtons[index].innerHTML = "";
        playButtons[index].onclick = (event) => {
        event.target.classList.remove("xHover");
        event.target.classList.remove("oHover");
        const spliceIndex = freeButtons.indexOf(index);
        freeButtons.splice(spliceIndex, 1);

        const icon = document.createElement("img");
        icon.classList.add("play-icon");
        if(turn === "x") {
            icon.src = "./icon-x.svg";
            event.target.append(icon);
            xArray.push(index);
            const win = checkXwin();
            if (win) {
                onWinX();
                winningStyle(win);
                return; 
            }
            if(xArray.length === 5) {
                modalTie.style.display = "flex";
                tieScore++;
                tieScoreElement.textContent = tieScore;
            }
            turn = "o";
            turnInfoImage.src = "./icon-o-gray.svg";
        } else  {
            icon.src = "./icon-o.svg";
            event.target.append(icon);
            oArray.push(index);
            const win = checkOwin();
            if (win) {
                onWinO();
                winningStyle(win);
                return; 
            }
            turn = "x";
            turnInfoImage.src = "./icon-x-gray.svg";
        }
         onHoverEffects();


        event.target.onclick = null;
       };
    }
};

const startGame = (modeParam) => {
    home.style.display = "none";
    board.style.display = "flex";
    document.body.style.alignItems = "flex-start";
    mode = modeParam;
    onHoverEffects();
    createClickedFunction();
    if (modeParam === "player") {
        if (player1 === "x") {
            xScoreText.textContent = "x (p1)";
            oScoreText.textContent = "o (p2)";
        } else {
            xScoreText.textContent = "x (p2)";
            oScoreText.textContent = "o (p1)";
        }
    } else {
        if (player1 === "x") {
            xScoreText.textContent = "x (you)";
            oScoreText.textContent = "o (cpu)";
        } else {
            xScoreText.textContent = "x (cpu)";
            oScoreText.textContent = "o (you)";
        }
    }
};

const quit = () => {
reset();
 xScore = 0;
 tieScore = 0;
 oScore = 0;
 board.style.display = "none";
 home.style.display = "flex";
 oScoreElement.textContent = 0;
 xScoreElement.textContent = 0;
 tieScoreElement.textContent = 0;
};

const reset = () => {
player1 = "x";
mode ="cpu";
turn ="x";
freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
xArray = [];
oArray = [];
xScore = 0;
modal.style.display = "none";
modalTie.style.display = "none";
};

const clerBoard = () => {

};

const nextRound = () => {
reset();
startGame(mode);
};

const openRestartModal = () => {
    modalRestart.style.display = "flex";
};

const closeModal = () => {

};

const restartFo = () => {
    xScore = 0;
    tieScore = 0;
    oScore = 0;
    oScoreElement.textContent = 0;
    xScoreElement.textContent = 0;
    tieScoreElement.textContent = 0;
    reset();
    startGame(mode);
    modalRestart.style.display = "none";
};
