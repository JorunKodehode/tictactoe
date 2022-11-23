// Creates the variables for the player and combination for winning
const playerXclass = "x";
const playerYclass = "y";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Picking up the id and classes from HTML
const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");
let isPlayerOturn = false;

startGame();

restartButton.addEventListener("click", startGame);

// Creates the first player to be X
function startGame() {
  isPlayerOturn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(playerXclass);
    cell.classList.remove(playerOclass);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

// MouseClick
function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayerOturn ? playerOclass : playerXclass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `It's draw!`;
  } else {
    winningMessageTextElement.innerText = `Player with ${
      isPlayerOturn ? "O's" : "X's"
    } wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contain(playerXclass) ||
      cell.classList.contains(playerOclass)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayerOturn = !isPlayerOturn;
}

function setBoardHoverClass() {
  boardElement.classList.remove(playerXclass);
  boardElement.classList.remove(playerOclass);
  if (isPlayerOturn) {
    boardElement.classList.add(playerOclass);
  } else {
    boardElement.classList.add(playerXclass);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
