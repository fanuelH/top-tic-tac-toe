const main = document.querySelector("main");

const playerOneMark = [];
const playerTwoMark = [];

let playerTurn = 0;

let gameBoard = {
  row1: { col1: "", col2: "", col3: "" },
  row2: { col1: "", col2: "", col3: "" },
  row3: { col1: "", col2: "", col3: "" },
};

const marker = ["X", "O"];

const winningCombos = [
  [gameBoard.row1.col1, gameBoard.row1.col2, gameBoard.row1.col3],
  [gameBoard.row2.col1, gameBoard.row2.col2, gameBoard.row2.col3],
  [gameBoard.row3.col1, gameBoard.row3.col2, gameBoard.row3.col3],
  [gameBoard.row1.col1, gameBoard.row2.col1, gameBoard.row3.col1],
  [gameBoard.row1.col2, gameBoard.row2.col2, gameBoard.row3.col2],
  [gameBoard.row1.col3, gameBoard.row2.col3, gameBoard.row3.col3],
  [gameBoard.row1.col1, gameBoard.row2.col2, gameBoard.row3.col3],
  [gameBoard.row1.col3, gameBoard.row2.col2, gameBoard.row3.col1],
];

main.addEventListener("click", (e) => {
  setPlayerMark(e.target);
});

function setPlayerMark(cell) {
  if (cell.innerText === "") {
    const currentMarker = marker[playerTurn];
    if (playerTurn === 0) {
      playerOneMark.push(currentMarker);
    } else {
      playerTwoMark.push(currentMarker);
    }
    cell.innerText = currentMarker;
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

playGame();
