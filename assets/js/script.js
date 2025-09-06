const main = document.querySelector("main");
const allBox = document.querySelectorAll(".box");
const restBtn = document.querySelector("#restart-btn");
const xWrapper = document.querySelector(".x-wrapper");
const oWrapper = document.querySelector(".o-wrapper");
const displayResult = document.querySelector("#result-modal");
const gameResult = document.querySelector("#game-result");
const startBtn = document.querySelector("#start-game-btn");
const initialModal = document.querySelector("#player-name-modal");
const playerOneNameInput = document.querySelector("#player1");
const playerTwoNameInput = document.querySelector("#player2");
const playerOneName = document.querySelector(".player1-name");
const playerTwoName = document.querySelector(".player2-name");

let gameStatus = false;
let playerTurn = 0;

let gameBoard = {
  row1: { col1: "", col2: "", col3: "" },
  row2: { col1: "", col2: "", col3: "" },
  row3: { col1: "", col2: "", col3: "" },
};

const marker = ["X", "O"];

const winningCombos = [
  [
    ["row1", "col1"],
    ["row1", "col2"],
    ["row1", "col3"],
  ],
  [
    ["row2", "col1"],
    ["row2", "col2"],
    ["row2", "col3"],
  ],
  [
    ["row3", "col1"],
    ["row3", "col2"],
    ["row3", "col3"],
  ],
  [
    ["row1", "col1"],
    ["row2", "col1"],
    ["row3", "col1"],
  ],
  [
    ["row1", "col2"],
    ["row2", "col2"],
    ["row3", "col2"],
  ],
  [
    ["row1", "col3"],
    ["row2", "col3"],
    ["row3", "col3"],
  ],
  [
    ["row1", "col1"],
    ["row2", "col2"],
    ["row3", "col3"],
  ],
  [
    ["row1", "col3"],
    ["row2", "col2"],
    ["row3", "col1"],
  ],
];

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (playerOneNameInput.value !== "" && playerTwoNameInput.value !== "") {
    playerOneName.innerText = `${playerOneNameInput.value}`.toLocaleUpperCase();
    playerTwoName.innerText = `${playerTwoNameInput.value}`.toLocaleUpperCase();
    initialModal.close();
    playGame();
  } else {
    initialModal.showModal();
    throw new Error("Player Name is Required!");
  }
});

main.addEventListener("click", (e) => {
  setPlayerMark(e.target);
});

restBtn.addEventListener("click", (e) => {
  restartGame();
});

function setPlayerMark(cell) {
  if (cell.innerText === "" && gameStatus === false) {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const currentMarker = marker[playerTurn];
    gameBoard[row][col] = currentMarker;
    cell.innerText = currentMarker;
    checkWinner();
    playerTurn = 1 - playerTurn;
    colorHandler(cell);
    return currentMarker;
  }
  return;
}

function checkWinner() {
  // check for winner
  for (const line of winningCombos) {
    const [a, b, c] = line.map(([r, c]) => gameBoard[r][c]);
    if (a !== "" && a === b && b === c) {
      displayResult.show();
      gameResult.innerText = `${a} is Winner`;
      gameStatus = true;
      return a;
    }
  }

  // check for draw
  const allFilled = Object.values(gameBoard).every((row) => {
    return Object.values(row).every((cell) => cell !== "");
  });

  if (allFilled) {
    gameResult.innerText = `${marker[0]} ${marker[1]} Draw!`;
    displayResult.show();
    gameStatus = true;
    return `${marker[0]} | ${marker[1]} is Draw!`;
  }
}

function playGame() {
  xWrapper.classList.add("coloredBottomBoarder");
  checkWinner();
}

function restartGame() {
  displayResult.close();
  playerTurn = 0;
  gameStatus = false;
  xWrapper.classList.add("coloredBottomBoarder");
  oWrapper.classList.remove("coloredBottomBoarder");
  Array.from(allBox).forEach((box) => (box.innerText = ""));
  Array.from(allBox).forEach((box) =>
    box.classList.remove("coloredX", "coloredO")
  );
  for (const rowKey in gameBoard) {
    for (const colKey in gameBoard[rowKey]) {
      gameBoard[rowKey][colKey] = "";
    }
  }
  playGame();
}

function colorHandler(cell) {
  if (playerTurn === 0) {
    cell.classList.add("coloredX");
    xWrapper.classList.add("coloredBottomBoarder");
    oWrapper.classList.remove("coloredBottomBoarder");
  } else {
    cell.classList.add("coloredO");
    oWrapper.classList.add("coloredBottomBoarder");
    xWrapper.classList.remove("coloredBottomBoarder");
  }
}

initialModal.showModal();
