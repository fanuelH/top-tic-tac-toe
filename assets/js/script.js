const playerOneMark = [];
const PlayerTwoMark = [];

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
