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

const marker = ["X", "O"];

let gameStatus = false;
let playerTurn = 0;

// using IIFE(module)
const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const setMark = (row, col, mark) => {
    board[row][col] = mark;
  };

  const getBoard = () => board;

  return { setMark, getBoard };
})();

// using factory
const Player = (name, marker) => {
  return { name, marker };
};

const winningCombos = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!playerOneNameInput.value.trim() && !playerTwoNameInput.value.trim()) {
    alert("Both Player names are required!");
    return;
  }
  playerOneName.innerText = `${playerOneNameInput.value}`.toLocaleUpperCase();
  playerTwoName.innerText = `${playerTwoNameInput.value}`.toLocaleUpperCase();
  initialModal.close();
  playGame();
});

main.addEventListener("click", (e) => {
  if (!e.target.classList.contains("box")) return;
  setPlayerMark(e.target);
});

restBtn.addEventListener("click", (e) => {
  restartGame();
});

function setPlayerMark(cell) {
  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);
  if (gameBoard.getBoard()[row][col] === "" && !gameStatus) {
    const currentMarker = marker[playerTurn];
    gameBoard.setMark(row, col, currentMarker);
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
    const [a, b, c] = line.map(([r, c]) => gameBoard.getBoard()[r][c]);
    if (a !== "" && a === b && b === c) {
      displayResult.show();
      gameResult.innerText = `${a} wins! 🎉`;
      gameStatus = true;
      return a;
    }
  }

  // check for draw
  const allFilled = gameBoard
    .getBoard()
    .every((row) => row.every((cell) => cell !== ""));

  if (allFilled) {
    gameResult.innerText = "It’s a draw!";
    displayResult.show();
    gameStatus = true;
    return "It’s a draw!";
  }
}

function playGame() {
  xWrapper.classList.add("coloredBottomBoarder");
}

function restartGame() {
  displayResult.close();
  playerTurn = 0;
  gameStatus = false;
  xWrapper.classList.add("coloredBottomBoarder");
  oWrapper.classList.remove("coloredBottomBoarder");
  Array.from(allBox).forEach((box) => {
    box.innerText = "";
    box.classList.remove("coloredX", "coloredO");
  });
  gameBoard.getBoard().forEach((row) => row.fill(""));
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
