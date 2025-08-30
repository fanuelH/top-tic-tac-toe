const main = document.querySelector("main");
const allBox = document.querySelectorAll(".box");
const restBtn = document.querySelector("button");

let playerOneMark = [];
let playerTwoMark = [];

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

main.addEventListener("click", (e) => {
  setPlayerMark(e.target);
});

restBtn.addEventListener("click", (e) => {
  restartGame();
});

function setPlayerMark(cell) {
  if (cell.innerText === "") {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const currentMarker = marker[playerTurn];
    if (playerTurn === 0) {
      playerOneMark.push(currentMarker);
    } else {
      playerTwoMark.push(currentMarker);
    }
    gameBoard[row][col] = currentMarker;
    cell.innerText = currentMarker;
    checkWinner();
    playerTurn = 1 - playerTurn;
    return currentMarker;
  }
  return;
}

function checkWinner() {
  // check for winner
  for (const line of winningCombos) {
    if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
      console.log(`${line[0]} is Winner!`);
      return line[0];
    }
  }

  // check for draw
  const allFilled = Object.values(gameBoard).every((row) => {
    return Object.values(row).every((cell) => cell !== "");
  });

  if (allFilled) {
    console.log(`${marker[0]} | ${marker[1]} is Draw!`);
    return `${marker[0]} | ${marker[1]} is Draw!`;
  }
}

function playGame() {
  console.log("Game Started...");
  checkWinner();
}

function restartGame() {
  playerTurn = 0;
  playerOneMark = [];
  playerTwoMark = [];
  Array.from(allBox).forEach((box) => (box.innerText = ""));
  for (const rowKey in gameBoard) {
    for (const colKey in gameBoard[rowKey]) {
      gameBoard[rowKey][colKey] = "";
    }
  }
}

playGame();
