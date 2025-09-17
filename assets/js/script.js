const marker = ["X", "O"];

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
  const reset = () => {
    board.forEach((row) => row.fill(""));
  };
  return { setMark, getBoard, reset };
})();

// using factory
const Player = (name, marker) => {
  return { name, marker };
};

// display Controller
const displayController = (() => {
  const xWrapper = document.querySelector(".x-wrapper");
  const oWrapper = document.querySelector(".o-wrapper");
  const displayResult = document.querySelector("#result-modal");
  const gameResult = document.querySelector("#game-result");
  const initialModal = document.querySelector("#player-name-modal");
  let playerTurn = 0;

  const setPlayerMark = (cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    if (gameBoard.getBoard()[row][col] === "" && !gameController.isGameOver()) {
      const currentMarker = marker[playerTurn];
      gameBoard.setMark(row, col, currentMarker);
      cell.innerText = currentMarker;
      gameController.checkWinner();
      playerTurn = 1 - playerTurn;
      switchTurnColor(cell);
      return currentMarker;
    }
    return;
  };

  const switchTurnColor = (cell) => {
    if (playerTurn === 0) {
      cell.classList.add("coloredX");
      xWrapper.classList.add("coloredBottomBorder");
      oWrapper.classList.remove("coloredBottomBorder");
    } else {
      cell.classList.add("coloredO");
      oWrapper.classList.add("coloredBottomBorder");
      xWrapper.classList.remove("coloredBottomBorder");
    }
  };
  return {
    setPlayerMark,
    switchTurnColor,
    xWrapper,
    oWrapper,
    displayResult,
    gameResult,
    initialModal,
    playerTurn,
  };
})();

// game controller
const gameController = (() => {
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

  const allBox = document.querySelectorAll(".box");
  let gameStatus = false;

  const isGameOver = () => gameStatus;
  const playGame = () => {
    displayController.xWrapper.classList.add("coloredBottomBorder");
  };

  const restartGame = () => {
    displayController.displayResult.close();
    displayController.playerTurn = 0;
    gameStatus = false;
    displayController.xWrapper.classList.add("coloredBottomBorder");
    displayController.oWrapper.classList.remove("coloredBottomBorder");
    Array.from(allBox).forEach((box) => {
      box.innerText = "";
      box.classList.remove("coloredX", "coloredO");
    });
    gameBoard.reset();
    playGame();
  };

  const checkWinner = () => {
    // check for winner
    for (const line of winningCombos) {
      const [a, b, c] = line.map(([r, c]) => gameBoard.getBoard()[r][c]);
      if (a !== "" && a === b && b === c) {
        displayController.displayResult.show();
        displayController.gameResult.innerText = `${a} wins! 🎉`;
        gameStatus = true;
        return a;
      }
    }

    // check for draw
    const allFilled = gameBoard
      .getBoard()
      .every((row) => row.every((cell) => cell !== ""));

    if (allFilled) {
      displayController.gameResult.innerText = "It’s a draw!";
      displayController.displayResult.show();
      gameStatus = true;
      return "It’s a draw!";
    }
  };
  return { playGame, restartGame, checkWinner, isGameOver };
})();

// event listeners
const main = document.querySelector("main");
const restBtn = document.querySelector("#restart-btn");
const startBtn = document.querySelector("#start-game-btn");
const playerOneNameInput = document.querySelector("#player1");
const playerTwoNameInput = document.querySelector("#player2");
const playerOneName = document.querySelector(".player1-name");
const playerTwoName = document.querySelector(".player2-name");

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!playerOneNameInput.value.trim() || !playerTwoNameInput.value.trim()) {
    alert("Both Player names are required!");
    return;
  }
  playerOneName.innerText = `${playerOneNameInput.value}`.toUpperCase();
  playerTwoName.innerText = `${playerTwoNameInput.value}`.toUpperCase();
  displayController.initialModal.close();
  gameController.playGame();
});

main.addEventListener("click", (e) => {
  if (!e.target.classList.contains("box") || gameController.isGameOver())
    return;
  displayController.setPlayerMark(e.target);
});

restBtn.addEventListener("click", (e) => {
  gameController.restartGame();
});

displayController.initialModal.showModal();
