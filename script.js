const cells = document.querySelectorAll("#board .cell");
const gameMessage = document.getElementById("game-message");

let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(player) {
  return winningCombos.some((combo) =>
    combo.every((index) => board[index] === player)
  );
}

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function computerMove() {
  const emptyIndices = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((idx) => idx !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
}

function handleClick(e) {
  if (gameOver) return;

  const index = parseInt(e.target.dataset.index);
  if (board[index] !== "") return;

  board[index] = "X";
  e.target.textContent = "X";

  if (checkWin("X")) {
    gameOver = true;
    gameMessage.textContent = "Congrats! You won! 🎉";
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    gameMessage.textContent = "It's a draw! 🤝";
    return;
  }

  computerMove();

  if (checkWin("O")) {
    gameOver = true;
    gameMessage.textContent = "You lost! Try again. 🥺";
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    gameMessage.textContent = "It's a draw! 🤝";
    return;
  }
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
